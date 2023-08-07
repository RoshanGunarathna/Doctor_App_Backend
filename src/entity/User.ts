import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { userRoles } from "../types/types";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index("firstName_index")
  firstName: string;

  @Column()
  @Index("lastName_index")
  lastName: string;

  @Column()
  @Index("nic_index", { unique: true })
  nic: string;

  @Column({
    length: 15,
  })
  @Index("phoneNumber_index", { unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: "enum",
    default: "user",
    enum: ["user", "admin", "doctor", "doctor's assistant", "pharmacy"],
  })
  role: userRoles;
}
