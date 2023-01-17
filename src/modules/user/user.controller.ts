import {
  Controller,
  Get,
  Inject,
  UseInterceptors,
  forwardRef,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { TransactionManager } from 'src/common/decorator/transaction.decorator';
import { EntityManager } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @Get('/')
  @UseInterceptors(TransactionInterceptor)
  async findAll(@TransactionManager() manager: EntityManager): Promise<User> {
    return await this.userService.findOneWithTransaction({}, manager);
  }
}
