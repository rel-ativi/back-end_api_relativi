import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("payment_info")
export class PaymentInfo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128 })
  card_name: string;

  @Column({ length: 64 })
  card: string;

  @Column({ type: "date" })
  due_date: string;

  @Column({ type: "integer" })
  @Exclude()
  sec_code: number;
}
