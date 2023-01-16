import { Controller, Get, Inject, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @Get('/')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
