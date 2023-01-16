import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { FindOneOptions } from 'typeorm';

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

  findOne(options: FindOneOptions) {
    return this.userRepository.findOne(options);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
