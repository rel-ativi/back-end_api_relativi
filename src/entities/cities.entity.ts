import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Address } from "./addresses.entity";

@Entity("cities")
export class City {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 32 })
  name: string;

  @OneToMany(() => Address, (addresses) => addresses.city)
  addresses: Address[];
}
