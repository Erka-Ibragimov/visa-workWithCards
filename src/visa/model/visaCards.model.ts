import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ExcelTotalCards extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false })
  card_number: string;
  @Column({ nullable: false })
  client_code: string;
  @Column({ nullable: false })
  filial_code: string;
  @Column({ nullable: false })
  local_code: string;
  @Column({ nullable: false })
  embossed_name: string;
  @Column({ nullable: false })
  date_registered: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  resident: string;
  @Column({ nullable: false })
  country_code: string;
  @Column({ nullable: false })
  pasport: string;
  @Column({ nullable: false })
  code: string;
  @CreateDateColumn()
  created_at: Date;
}
