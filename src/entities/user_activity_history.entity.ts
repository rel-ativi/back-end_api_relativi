import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Activity } from "./activities.entity";
import { Profile } from "./profiles.entity";

@Entity("user_activity_history")
export class ActivityHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Activity)
  activity: Activity;

  @ManyToOne(() => Profile, { eager: true })
  profile: Profile;
}
