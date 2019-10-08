import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

import { BaseModel } from '@models/BaseModel';

@Entity()
export class User extends BaseModel {
  // TODO Add missing columns (documents: Array<Document>, organizations: Array<Organization>, following: Array<User>, followers: Array<User>)
  @PrimaryGeneratedColumn('uuid')
  user_id!: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  firstName!: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  lastName!: string;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 15,
  })
  username!: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  profile_location!: string;

  @Column({ nullable: true })
  profile_website!: string;
}
