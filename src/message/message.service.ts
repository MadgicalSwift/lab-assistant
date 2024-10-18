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
  abstract sendAgeButtons(from: string);
  abstract sendScienceTopics(from: string);
  abstract sendDifficultyLevel(from: string, topic: string);
  abstract sendExperimentTopics(from: string, userData: any);
  abstract sendExperimentDetails(from: string, selectedExperimentDetails: any);
  abstract sendLanguageChangedMessage(from: string, language: string);
}
