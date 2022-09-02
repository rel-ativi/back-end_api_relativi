import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Address } from "../adresses";

@Entity("countries")
export class Country {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 32 })
  name: string;

  @OneToMany(() => Address, (addresses) => addresses.country)
  addresses: Address[];
}
