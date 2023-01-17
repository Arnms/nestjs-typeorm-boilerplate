import { Injectable } from '@nestjs/common';
import {
  EntityManager,
  FindManyOptions,
  FindOptionsWhere,
  In,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Base } from './base.entity';

@Injectable()
export class BaseRepository<T extends Base> extends Repository<T> {
  constructor(readonly repository: Repository<T>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  getQueryBuilder(): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder();
  }

  getQueryManager(): EntityManager {
    return this.manager;
  }

  getById(id: number, manager?: EntityManager): Promise<T> {
    return manager
      ? manager.findOneBy(this.repository.target, { id } as FindOptionsWhere<T>)
      : this.findOneBy({ id } as FindOptionsWhere<T>);
  }

  getByIds(ids: number[]): Promise<T[]> {
    return this.find({
      id: In(ids),
    } as FindManyOptions<T>);
  }
}
