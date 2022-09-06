import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Day } from "./days.entity";

@Entity("activity_schedule")
export class ActivitySchedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToMany(() => Day, { eager: true })
  @JoinTable()
  days: Day[];
}
