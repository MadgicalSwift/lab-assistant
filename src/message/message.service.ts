import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import { CustomException } from 'src/common/exception/custom.exception';
import { localisedStrings } from 'src/i18n/en/localised-strings';

@Injectable()
export abstract class MessageService {
  sendInitialTopics(from: any) {
    throw new Error('Method not implemented.');
  }
  getQuestionBySet(from: any, buttonBody: any, selectedMainTopic: any, selectedSubtopic: any, randomSet: any, questionsAnswered: any) {
    throw new Error('Method not implemented.');
  }
  endMessage(from: any) {
    throw new Error('Method not implemented.');
  }
  sendCompleteExplanation(from: any, description: any, topic: any) {
    throw new Error('Method not implemented.');
  }
  checkAnswer(from: any, buttonBody: any, selectedMainTopic: any, selectedSubtopic: any, randomSet: any, currentQuestionIndex: any): { result: any; } | PromiseLike<{ result: any; }> {
    throw new Error('Method not implemented.');
  }
  newscorecard(from: any, score: number, questionsAnswered: any, badge: string) {
    throw new Error('Method not implemented.');
  }
  sendSubTopics(from: any, mainTopic: any) {
    throw new Error('Method not implemented.');
  }
  sendExplanation(from: any, description: any, subtopicName: any) {
    throw new Error('Method not implemented.');
  }
  sendName(from: any) {
    throw new Error('Method not implemented.');
  }
  async prepareWelcomeMessage() {
    return localisedStrings.welcomeMessage;
  }
  getSeeMoreButtonLabel() {
    return localisedStrings.seeMoreMessage;
  }

  async sendMessage(baseUrl: string, requestData: any, token: string) {
    try {
      const response = await axios.post(baseUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error sending message:', error.response?.data);
      // throw new CustomException(error);
    }
  }

  abstract sendWelcomeMessage(from: string, language: string);
  abstract sendClassButtons(from: string);
  abstract sendScienceTopics(from: string, buttonBody: string);
  abstract sendDifficultyLevel(from: string);
  abstract sendExperimentTopics(from: string, userData: any);
  abstract sendExperimentDetails(from: string, selectedExperimentDetails: any);
  abstract sendExperimentFirstQuestion(from: string, selectedExperimentquestion: any);
  abstract sendQuestion(from: string, selectedExperimentquestion: any, setName: string, currentQuestionIndex: number);
  abstract sendFeedBack(from: string, selectedExperimentquestion: any, setName: string, currentQuestionIndex: number, buttonBody: string);
  abstract sendScoreWithButtons(from: string, score: number);
  abstract sendExperimentVideo(from: string, selectedExperimentDetails: any);
  abstract sendLanguageChangedMessage(from: string, language: string);
}
