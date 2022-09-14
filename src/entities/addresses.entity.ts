import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Activity } from "./activities.entity";
import { City } from "./cities.entity";
import { Country } from "./countries.entity";
import { District } from "./districts.entity";
import { Profile } from "./profiles.entity";
import { State } from "./states.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 64 })
  street: string;

  @Column({ length: 16 })
  number: string;

  @Column({ length: 8 })
  zip_code: string;

  @ManyToOne(() => Profile)
  @Exclude()
  created_by: Profile;

  @ManyToOne(() => District, { eager: true, onDelete: "SET NULL" })
  district: District;

  @ManyToOne(() => City, { eager: true, onDelete: "SET NULL" })
  city: City;

  @ManyToOne(() => State, { eager: true, onDelete: "SET NULL" })
  state: State;

  @ManyToOne(() => Country, { eager: true, onDelete: "SET NULL" })
  country: Country;

  @OneToOne(() => Activity || Profile, (entity) => entity.address)
  address_of: Activity | Profile;
}
