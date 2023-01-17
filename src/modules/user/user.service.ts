import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { EntityManager, FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  findOneWithTransaction(options: FindOneOptions, manager?: EntityManager) {
    return this.userRepository.getById(2, manager);
  }

  findOne(options: FindOneOptions) {
    return this.userRepository.findOne(options);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
