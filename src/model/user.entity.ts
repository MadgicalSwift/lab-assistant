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
  classGroup : string;

  @Column({ nullable: true })
  scienceTopic : string;

  @Column({ nullable: true })
  difficultyLevel : string;

  @Column({ nullable: true })
  experimentName : string;

  @Column({ default: 0 })
  currentQuestionIndex : number;
  
  @Column({ nullable: true })
  setName : string;

  @Column({ default: 0 })
  score : number;
}
