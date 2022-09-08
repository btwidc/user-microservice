import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { UserService } from '../../user/user.service';

@Processor('user')
export class UserConsumer {
  constructor(private readonly userService: UserService) {}

  @Process('updateUsers')
  async handleUpdateUsers(job: Job) {
    const newUsers = job.data.users;
    return await this.userService.addNewUsers(newUsers);
  }
}
