import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  role!: string; // manager|analyst|viewer|admin

  @Column({ name: "is_active", type: "boolean", default: true })
  is_active!: boolean;

  // 👇 aqui estava "timestamp", troque para "datetime"
  @Column({ name: "created_at", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
}
