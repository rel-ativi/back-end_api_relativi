import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Address } from "../adresses";

@Entity("districts")
export class District {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 32 })
  name: string;

  @OneToMany(() => Address, (addresses) => addresses.district)
  addresses: Address[];
}
