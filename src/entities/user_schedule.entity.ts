import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Activity } from "./activities.entity";
import { Profile } from "./profiles.entity";

@Entity("user_schedule")
export class UserSchedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Activity, { eager: true })
  activity: Activity;

  @ManyToOne(() => Profile)
  @Exclude()
  profile: Profile;
}
