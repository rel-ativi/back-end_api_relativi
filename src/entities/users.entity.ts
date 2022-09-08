import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Profile } from "./profiles.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128 })
  name: string;

  @Column({ unique: true, length: 48 })
  email: string;

  @Column({ length: 128 })
  @Exclude()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_adm: boolean;

  @Column({ default: false })
  is_pro_user: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, { eager: true })
  @JoinColumn()
  profile: Profile;
}
