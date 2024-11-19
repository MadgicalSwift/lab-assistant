// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: false })
//   mobileNumber: string;

//   @Column()
//   language: string;

//   @Column()
//   botID: string;

//   @Column({ nullable: true })
//   userName: string;

//   @Column({ nullable: true })
//   classGroup : string;

//   @Column({ nullable: true })
//   scienceTopic : string;

//   @Column({ nullable: true })
//   difficultyLevel : string;

//   @Column({ nullable: true })
//   experimentName : string;

//   @Column({ default: 0 })
//   currentQuestionIndex : number;
  
//   @Column({ nullable: true })
//   setName : string;

//   @Column({ default: 0 })
//   score : number;
// }


import { IsString, IsNumber, IsOptional } from 'class-validator';

export class User {
  @IsString()
  mobileNumber: string;

  @IsString()
  language: string;

  @IsString()
  Botid: string;

  @IsString()
  userName: string | null;

  @IsString()
  classGroup: string | null;

  @IsString()
  scienceTopic: string | null;

  @IsString()
  difficultyLevel: string | null;

  @IsString()
  experimentName: string | null;

  @IsString()
  setName: string | null;

  @IsNumber()
  currentQuestionIndex: number = 0;

  @IsNumber()
  score: number = 0;
  selectedSet: null;
  questionsAnswered: number;
  selectedMainTopic: any;
  selectedSubtopic: any;
}
