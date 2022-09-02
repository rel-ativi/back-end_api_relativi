import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("days")
export class Day {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 16 })
  name: string;

  @Column({ type: "integer" })
  number: number;
}
