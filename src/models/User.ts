import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
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

  // @Column()
  // profile_image!: string(url),

  // @Column()
  // following: Array<User>,

  // follower: Array<User>,
  // Bottom two should prolly be urls - David
  // @Column()
  // profile_website!: url;

  @Column()
  profile_location!: string;

  // documents: Array<Document>,

  // organizations: Array<Organizations>
}
