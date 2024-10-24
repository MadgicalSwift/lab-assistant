import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LocalizationService } from 'src/localization/localization.service';
import { MessageService } from 'src/message/message.service';
import { localisedStrings } from 'src/i18n/en/localised-strings';
import {
  createClassButton,
  scienceTopicButtons,
  difficultyLevelButtons,
  experimentTopicButtons,
  experimentDetailsWithButton,
} from 'src/i18n/buttons/buttons';
dotenv.config();

@Injectable()
export class SwiftchatMessageService extends MessageService {
  botId = process.env.BOT_ID;
  apiKey = process.env.API_KEY;
  apiUrl = process.env.API_URL;
  baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  private prepareRequestData(from: string, requestBody: any): any {
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
    const messageData = createClassButton(from);
    const response = await this.sendMessage(
      this.baseUrl,
      messageData,
      this.apiKey,
    );
    return response;
  }

  async sendScienceTopics(from: string, buttonBody: string) {
    const messageData = scienceTopicButtons(from, buttonBody);
    const response = await this.sendMessage(
      this.baseUrl,
      messageData,
      this.apiKey,
    );
    return response;
  }

  async sendDifficultyLevel(from: string) {
    const messageData = difficultyLevelButtons(from);
    const response = await this.sendMessage(
      this.baseUrl,
      messageData,
      this.apiKey,
    );
    return response;
  }

  async sendExperimentTopics(from: string, userData: string) {
    const messageData = experimentTopicButtons(from, userData);
    const response = await this.sendMessage(
      this.baseUrl,
      messageData,
      this.apiKey,
    );
    return response;
  }

  async sendExperimentDetails(from: string, selectedExperimentDetails: any) {
    const messageData = experimentDetailsWithButton(from, selectedExperimentDetails);
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
