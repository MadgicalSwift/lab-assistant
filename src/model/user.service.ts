import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { dynamoDBClient } from 'src/config/database-config.service';
import { v4 as uuidv4 } from 'uuid';
//const { USERS_TABLE } = process.env;
import * as dotenv from 'dotenv';
dotenv.config();
const { USERS_TABLE } = process.env;

@Injectable()
export class UserService {
  saveUserChallenge(from: any, Botid: any, challengeData: { topic: any; subTopic: any; question: { setNumber: any; score: number; badge: string; }[]; }) {
    throw new Error('Method not implemented.');
  }
  saveUserName(from: any, botID: string, body: any) {
    throw new Error('Method not implemented.');
  }
  getTopStudents(Botid: any, selectedMainTopic: any, selectedSet: any, selectedSubtopic: any) {
    throw new Error('Method not implemented.');
  }
  async createUser(
    mobileNumber: string,
    language: string,
    botID: string,
  ): Promise<User | any> {
    try {
      const newUser = {
        id: uuidv4(),
        mobileNumber: mobileNumber,
        language: language,
        Botid: botID,
      };
      const params = {
        TableName: USERS_TABLE,
        Item: newUser,
      };
      await dynamoDBClient().put(params).promise();
      return newUser; // Return just the user object
    } catch (error) {
      console.error('Error in createUser:', error);
    }
  }
  async findUserByMobileNumber(
    mobileNumber: string,
    Botid: string,
  ): Promise<User | any> {
    try {
      const params = {
        TableName: USERS_TABLE,
        KeyConditionExpression:
          'mobileNumber = :mobileNumber and Botid = :Botid',
        ExpressionAttributeValues: {
          ':mobileNumber': mobileNumber,
          ':Botid': Botid,
        },
      };
      const result = await dynamoDBClient().query(params).promise();
      return result.Items?.[0] || null; // Return the first item or null if none found
    } catch (error) {
      console.error('Error querying user from DynamoDB:', error);
      return null;
    }
  }

  async saveUser(user: User): Promise<User | any> {
    const updateUser = {
      TableName: USERS_TABLE,
      Item: {
        mobileNumber: user.mobileNumber,
        language: user.language,
        Botid: user.Botid,
        userName: user.userName,
        classGroup: user.classGroup,
        scienceTopic: user.scienceTopic,
        difficultyLevel: user.difficultyLevel,
        experimentName: user.experimentName,
        setName: user.setName,
        currentQuestionIndex: user.currentQuestionIndex,
        score: user.score
      },
    };
    return await dynamoDBClient().put(updateUser).promise();
  }
}
