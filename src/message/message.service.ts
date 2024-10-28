import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import { CustomException } from 'src/common/exception/custom.exception';
import { localisedStrings } from 'src/i18n/en/localised-strings';

@Injectable()
export abstract class MessageService {
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
  abstract sendLanguageChangedMessage(from: string, language: string);
}
