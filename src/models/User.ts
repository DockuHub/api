import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    unique: true,
  })
  username!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  description!: string;

  @Column()
  profile_location!: string;
}
