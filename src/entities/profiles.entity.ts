import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Activity } from "./activities.entity";
import { Address } from "./addresses.entity";
import { BankInfo } from "./bank_info.entity";
import { PaymentInfo } from "./payment_info.entity";
import { ActivityHistory } from "./user_activity_history.entity";
import { Certification } from "./user_certifications.entity";
import { UserSchedule } from "./user_schedule.entity";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 512, nullable: true })
  bio: string;

  @Column({ length: 24, nullable: true })
  phone: string;

  @OneToOne(() => Address, (address) => address.address_of, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  address: Address;

  @OneToOne(() => BankInfo, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  bank_info: BankInfo;

  @OneToOne(() => PaymentInfo, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  payment_info: PaymentInfo;

  @OneToMany(() => Activity, (activities) => activities.created_by, {
    eager: true,
    nullable: true,
  })
  activities: Activity[];

  @OneToMany(() => Address, (addresses) => addresses.created_by, {
    eager: true,
    nullable: true,
  })
  addresses: Address[];

  @OneToMany(() => Certification, (certifications) => certifications.profile, {
    eager: true,
    nullable: true,
  })
  certifications: Certification[];

  @OneToMany(() => UserSchedule, (schedule) => schedule.profile, {
    eager: true,
    nullable: true,
  })
  scheduled_activities: UserSchedule[];

  @OneToMany(() => ActivityHistory, (schedule) => schedule.profile, {
    eager: true,
  })
  activity_history: ActivityHistory[];

  @ManyToMany(() => Activity, {
    eager: true,
    nullable: true,
  })
  @JoinTable()
  favorite_activities: Activity[];
}
