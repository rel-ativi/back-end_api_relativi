import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Activity } from "../activities";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 60 })
  name: string;

  @OneToMany(() => Activity, (activities) => activities.category)
  activities: Activity[];
}
