import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  mobileNumber: string;

  @Column()
  language: string;

  @Column()
  botID: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  scienceTopic : string;

  @Column({ nullable: true })
  difficultyLevel : string;

  @Column({ nullable: true })
  experimentName : string;

}
