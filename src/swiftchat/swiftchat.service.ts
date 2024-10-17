import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LocalizationService } from 'src/localization/localization.service';
import { MessageService } from 'src/message/message.service';
import { localisedStrings } from 'src/i18n/en/localised-strings';
import {
  createAgeButton,
  scienceTopicButtons,
  difficultyLevelButtons,
  experimentTopicButtons,
} from 'src/i18n/buttons/buttons';
dotenv.config();

@Injectable()
export class SwiftchatMessageService extends MessageService {
  botId = process.env.BOT_ID;
  apiKey = process.env.API_KEY;
  apiUrl = process.env.API_URL;
  baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  private prepareRequestData(from: string, requestBody: string): any {
    return {
      to: from,
      type: 'text',
      text: {
        body: requestBody,
      },
    };
  }
  async sendWelcomeMessage(from: string, language: string) {
    const requestData = this.prepareRequestData(
      from,
      localisedStrings.welcomeMessage,
    );

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }

  async sendAgeButtons(from: string) {
    const messageData = createAgeButton(from);
    const response = await this.sendMessage(
      this.baseUrl,
      messageData,
      this.apiKey,
    );
    return response;
  }

  async sendScienceTopics(from: string) {
    const messageData = scienceTopicButtons(from);
    const response = await this.sendMessage(
      this.baseUrl,
      messageData,
      this.apiKey,
    );
    return response;
  }

  async sendDifficultyLevel(from: string, topic: string) {
    const messageData = difficultyLevelButtons(from, topic);
    const response = await this.sendMessage(
      this.baseUrl,
      messageData,
      this.apiKey,
    );
    return response;
  }

  async sendExperimentTopics(from: string, userData: any) {
    const messageData = experimentTopicButtons(from, userData);
    const response = await this.sendMessage(
      this.baseUrl,
      messageData,
      this.apiKey,
    );
    return response;
  }

  async sendLanguageChangedMessage(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = this.prepareRequestData(
      from,
      localisedStrings.select_language,
    );

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }
}
