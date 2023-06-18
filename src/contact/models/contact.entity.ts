import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('contact')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true})
  email: String;

  @Column({ nullable: true, type: 'bigint' })
  phoneNumber: string;

  @Column({ nullable: true, default: null})
  linkedId: number;

  @Column({ default: false })
  linkPrecedence: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null})
  deletedAt: Date

}
