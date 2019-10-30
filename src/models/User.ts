import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";

import { BaseModel } from "@models/BaseModel";

@Entity()
export class User extends BaseModel {
  @PrimaryGeneratedColumn("uuid")
  user_id!: string;

  @Column({
    type: "varchar",
    length: 15
  })
  first_name!: string;

  @Column({
    type: "varchar",
    length: 20
  })
  last_name!: string;

  @Column({
    nullable: false,
    type: "varchar",
    length: 15
  })
  username!: string;

  @Column({
    unique: true,
    nullable: false
  })
  email!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  profile_location!: string;

  @Column({ nullable: true })
  profile_website!: string;
}
