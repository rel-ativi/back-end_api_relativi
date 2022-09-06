import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Address } from "./addresses.entity";

@Entity("states")
export class State {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 32 })
  name: string;

  @OneToMany(() => Address, (addresses) => addresses.state)
  addresses: Address[];
}
