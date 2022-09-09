import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { UserService } from '../../user/user.service';

@Injectable()
export class UserProducerService {
  constructor(
    @InjectQueue('user')
    private userQueue: Queue,
    private readonly userService: UserService,
  ) {}

  async jobAddNewUsers() {
    const newUsers = await this.userService.getNewUsers();
    const newUsersData = newUsers.data;

    await newUsersData.forEach((user) => {
      delete user.id;
    });
    await this.userQueue.add(
      'updateUsers',
      { users: newUsersData },
      {
        repeat: { every: 1000 * 60 * 60 },
      },
    );
  }

  async clearUnnecessaryJobs() {
    await this.userQueue.clean(0, 'delayed');
    await this.userQueue.clean(0, 'wait');
    await this.userQueue.clean(0, 'active');
    await this.userQueue.clean(0, 'completed');
    await this.userQueue.clean(0, 'failed');

    const multi = this.userQueue.multi();
    await multi.del(this.userQueue.toKey('repeat'));
    await multi.exec();
  }
}
