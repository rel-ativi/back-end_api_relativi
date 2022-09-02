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

import { Activity } from "../activities";
import { Address } from "../adresses";
import { BankInfo } from "../bank_info";
import { PaymentInfo } from "../payment_info";
import { ActivityHistory } from "../user_activity_history";
import { Certification } from "../user_certifications";
import { UserSchedule } from "../user_schedule";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 512 })
  bio: string;

  @Column({ length: 24 })
  phone: string;

  @OneToOne(() => Address, (address) => address.address_of, { eager: true })
  @JoinColumn()
  address: Address;

  @OneToOne(() => BankInfo, { eager: true })
  @JoinColumn()
  bank_info: BankInfo;

  @OneToOne(() => PaymentInfo, { eager: true })
  @JoinColumn()
  payment_info_id: PaymentInfo;

  @OneToMany(() => Certification, (certifications) => certifications.profile)
  certifications: Certification[];

  @OneToMany(() => UserSchedule, (schedule) => schedule.profile)
  scheduled_activities: UserSchedule[];

  @OneToMany(() => ActivityHistory, (schedule) => schedule.profile)
  activity_history: ActivityHistory[];

  @ManyToMany(() => Activity, { eager: true })
  @JoinTable()
  favorite_activities: Activity[];
}
