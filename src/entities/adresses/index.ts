import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Activity } from "../activities";
import { City } from "../cities";
import { Country } from "../countries";
import { District } from "../districts";
import { Profile } from "../profiles";
import { State } from "../states";

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

  @ManyToOne(() => District, { eager: true })
  district: District;

  @ManyToOne(() => City, { eager: true })
  city: City;

  @ManyToOne(() => State, { eager: true })
  state: State;

  @ManyToOne(() => Country, { eager: true })
  country: Country;

  @OneToOne(() => Activity || Profile, (entity) => entity.address)
  address_of: Activity | Profile;
}
