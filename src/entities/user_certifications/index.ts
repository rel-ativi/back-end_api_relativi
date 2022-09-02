import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Profile } from "../profiles";

@Entity("user_certifications")
export class Certification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 128 })
  emmited_by: string;

  @Column({ type: "date" })
  emission_date: string;

  @Column({ type: "date", nullable: true })
  expiration_date?: string;

  @ManyToOne(() => Profile, { eager: true })
  profile: Profile;
}
