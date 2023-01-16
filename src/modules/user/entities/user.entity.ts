import { Base } from 'src/database/base/base.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User extends Base {
  @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { nullable: false, name: 'provider', length: 20 })
  provider: string;

  @Column('varchar', { nullable: false, name: 'email', length: 100 })
  email: string;

  @Column('text', { nullable: false, name: 'password' })
  password: string;

  @Column('varchar', { nullable: false, name: 'name', length: 100 })
  name: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;
}
