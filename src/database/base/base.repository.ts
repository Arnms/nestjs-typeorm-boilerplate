import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { Base } from './base.entity';

@Injectable()
export class BaseRepository<T extends Base> extends Repository<T> {
  constructor(readonly repository: Repository<T>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  getQueryBuilder() {
    return this.repository.createQueryBuilder();
  }

  getById(id: number) {
    return this.findOneBy({ id } as FindOptionsWhere<T>);
  }

  getByIds(ids: number[]) {
    return this.find({
      id: In(ids),
    } as FindManyOptions<T>);
  }
}
