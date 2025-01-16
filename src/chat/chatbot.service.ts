import { Injectable } from '@nestjs/common';
import IntentClassifier from '../intent/intent.classifier';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/model/user.service';
import { localisedStrings } from 'src/i18n/en/localised-strings';
import data from '../datasource/data.json';
import { MixpanelService } from 'src/mixpanel/mixpanel.service';
@Injectable()
export class ChatbotService {
  private readonly intentClassifier: IntentClassifier;
  private readonly message: MessageService;
  private readonly userService: UserService;
  private readonly mixpanel: MixpanelService;
  constructor(
    intentClassifier: IntentClassifier,
    message: MessageService,
    userService: UserService,
    mixpanel: MixpanelService,
  ) {
    this.intentClassifier = intentClassifier;
    this.message = message;
    this.userService = userService;
    this.mixpanel = mixpanel;
  }
  public async processMessage(body: any): Promise<any> {
    const { from, text, button_response, persistent_menu_response } = body;
    const buttonBody = button_response?.body;
    const textBody = text?.body;
    let botID = process.env.BOT_ID;
    let userData = await this.userService.findUserByMobileNumber(from, botID);
    if (!userData) {
      userData = await this.userService.createUser(from, 'english', botID);
    }

    if (persistent_menu_response) {
      if (persistent_menu_response.body == 'Change Class') {
        userData.score = 0;
        userData.currentQuestionIndex = 0;
        userData.classGroup = '7-8';

        await this.message.sendClassButtons(from);
        await this.userService.saveUser(userData);
        return;
      }
      if (persistent_menu_response.body == 'Change Subject') {
        const classGroupToSend = userData.classGroup || '7-8';
        userData.classGroup = classGroupToSend;
        userData.score = 0;
        userData.currentQuestionIndex = 0;
        await this.userService.saveUser(userData);

        await this.message.sendScienceTopics(from, classGroupToSend);
        return;
      }
    }

    const classGroup = data.classGroups.find(
      (group) => group.class === userData.classGroup,
    );
    const selectedTopic = classGroup?.topics.find(
      (topic) => topic?.topic_name === buttonBody,
    );
    const selectedExperimentDetails = classGroup?.topics
      .find((t) => t.topic_name === userData.scienceTopic)
      ?.levels.find((l) => l.level_name === userData.difficultyLevel)
      ?.experiments.find(
        (experiment) => experiment.experiment_name === buttonBody,
      );
    const selectedExperimentquestion = classGroup?.topics
      .find((t) => t.topic_name === userData.scienceTopic)
      ?.levels.find((l) => l.level_name === userData.difficultyLevel)
      ?.experiments.find(
        (experiment) => experiment.experiment_name === userData.experimentName,
      );

    if (buttonBody) {
      // Mixpanel tracking data
      const trackingData = {
        distinct_id: from,
        button: buttonBody,
        botID: botID,
      };
      this.mixpanel.track('Button_Click', trackingData);
      switch (true) {
        case localisedStrings.classes.includes(buttonBody):
          userData.classGroup = buttonBody;
          await this.message.sendScienceTopics(from, buttonBody);

          break;
        case selectedTopic !== undefined:
          userData.scienceTopic = buttonBody;
          await this.message.sendDifficultyLevel(from);
          break;
        case localisedStrings.difficultyLevelButtons.includes(buttonBody):
          userData.difficultyLevel = buttonBody;
          await this.message.sendExperimentTopics(from, userData);
          break;
        case localisedStrings.startButton.includes(buttonBody): {
          await this.message.sendQuizMessage(from);

          const { setName } = await this.message.sendExperimentFirstQuestion(
            from,
            selectedExperimentquestion?.quiz_sets,
          );

          userData.setName = setName;
          userData.currentQuestionIndex =
            typeof userData.currentQuestionIndex === 'number'
              ? userData.currentQuestionIndex + 1
              : 1;
          break;
        }

        case selectedExperimentDetails !== undefined:
          userData.experimentName = buttonBody;
          if (
            'title' in selectedExperimentDetails &&
            'description' in selectedExperimentDetails
          ) {
            const videoUrl = selectedExperimentDetails.video_link;
            let subTopic = selectedExperimentDetails.experiment_name;
            const videotitle = selectedExperimentDetails.title;
            const aboutVideo = selectedExperimentDetails.description;
            if (subTopic.length > 50) {
              subTopic = subTopic.slice(0, 50) + '...';
            }
          }
          await this.message.sendExperimentDetails(
            from,
            selectedExperimentDetails,
          );
          //====================
          await this.message.sendStartQuizandExploreButton(
            from,
            userData.experimentName,
          );
          break;

        case localisedStrings.selectExperimentButton === buttonBody:
          await this.message.sendExperimentTopics(from, userData);
          break;

        case localisedStrings.mainMenuButton === buttonBody:
          await this.message.sendClassButtons(from);
          break;

        case localisedStrings.retakeQuizButton === buttonBody:
          await this.message.sendQuestion(
            from,
            selectedExperimentquestion?.quiz_sets,
            userData.setName,
            userData.currentQuestionIndex,
          );
          userData.currentQuestionIndex += 1;
          break;

        default:
          {
            let feedback = await this.message.sendFeedBack(
              from,
              selectedExperimentquestion?.quiz_sets,
              userData.setName,
              userData.currentQuestionIndex,
              buttonBody,
            );
            if (typeof userData.score !== 'number' || isNaN(userData.score)) {
              userData.score = 0;
            }
            if (typeof feedback !== 'number' || isNaN(feedback)) {
              feedback = 0; // Default to 0 if feedback isn't a valid number
            }
            userData.score += feedback;
          }
          if (userData.currentQuestionIndex >= 10) {
            await this.message.sendScoreWithButtons(from, userData.score);
            userData.score = 0;
            userData.currentQuestionIndex = 0;
            break;
          }
          await this.message.sendQuestion(
            from,
            selectedExperimentquestion?.quiz_sets,
            userData.setName,
            userData.currentQuestionIndex,
          );
          userData.currentQuestionIndex += 1;
          break;
      }
    } else if (textBody) {
      if (localisedStrings.validText.includes(textBody)) {
        userData.score = 0;
        userData.currentQuestionIndex = 0;
        await this.message.sendWelcomeMessage(from, userData.language);
        await this.message.sendClassButtons(from);
        return;
      }
      userData.userName = textBody;
      await this.message.sendClassButtons(from);
    }
    await this.userService.saveUser(userData);
  }
}
export default ChatbotService;
