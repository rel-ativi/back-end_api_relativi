import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bank_info")
export class BankInfo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 16 })
  bank: string;

  @Column({ length: 16 })
  agency: string;

  @Column({ length: 16 })
  account_number: string;
}
