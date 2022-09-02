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

import { ActivitySchedule } from "../activity_schdule";
import { Address } from "../adresses";
import { Category } from "../categories";
import { ActivityHistory } from "../user_activity_history";
import { UserSchedule } from "../user_schedule";

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

  @Column({ type: "decimal", precision: 2, scale: 2 })
  duration: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  recurrent: boolean;

  @Column({ type: "date" })
  starting_date: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, { eager: true })
  category: Category;

  @OneToOne(() => Address, (address) => address.address_of, { eager: true })
  @JoinColumn()
  address: Address;

  @OneToOne(() => ActivitySchedule, { eager: true })
  @JoinColumn()
  activity_schedule: ActivitySchedule;

  @OneToMany(() => UserSchedule, (schedule) => schedule.activity)
  scheduled_users: UserSchedule[];

  @OneToMany(() => ActivityHistory, (schedule) => schedule.activity)
  users_history: ActivityHistory[];
}
