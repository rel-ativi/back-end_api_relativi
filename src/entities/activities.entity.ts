import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { ActivitySchedule } from "./activity_schedule.entity";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";
import { Profile } from "./profiles.entity";
import { ActivityHistory } from "./user_activity_history.entity";
import { UserSchedule } from "./user_schedule.entity";

@Entity("activities")
export class Activity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128 })
  name: string;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  price: number;

  @Column({ type: "integer", default: 1 })
  min_users: number;

  @Column({ type: "integer" })
  max_users: number;

  @Column({ length: 4 })
  duration: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  recurrent: boolean;

  @Column({ type: "date" })
  starting_date: string;

  @Column({ nullable: true })
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Profile)
  @Exclude()
  created_by: Profile;

  @ManyToOne(() => Category, { eager: true })
  category: Category;

  @OneToOne(() => Address, (address) => address.address_of, {
    eager: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  address: Address;

  @OneToOne(() => ActivitySchedule, { eager: true, onDelete: "SET NULL" })
  @JoinColumn()
  activity_schedule: ActivitySchedule;

  @OneToMany(() => UserSchedule, (schedule) => schedule.activity)
  scheduled_users: UserSchedule[];

  @OneToMany(() => ActivityHistory, (schedule) => schedule.activity)
  users_history: ActivityHistory[];
}
