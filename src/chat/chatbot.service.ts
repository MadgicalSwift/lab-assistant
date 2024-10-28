import { Injectable } from '@nestjs/common';
import IntentClassifier from '../intent/intent.classifier';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/model/user.service';
import { localisedStrings } from 'src/i18n/en/localised-strings';
import data from '../datasource/data.json';

@Injectable()
export class ChatbotService {
  private readonly intentClassifier: IntentClassifier;
  private readonly message: MessageService;
  private readonly userService: UserService;

  constructor(
    intentClassifier: IntentClassifier,
    message: MessageService,
    userService: UserService,
  ) {
    this.intentClassifier = intentClassifier;
    this.message = message;
    this.userService = userService;
  }

  public async processMessage(body: any): Promise<any> {
    const { from, text, button_response } = body;
    const buttonBody = button_response?.body;
    const textBody = text?.body;
    let botID = process.env.BOT_ID;
    let userData = await this.userService.findUserByMobileNumber(from);
    if (!userData) {
      userData = await this.userService.createUser(from, 'english', botID);
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

        case selectedExperimentDetails !== undefined:
          userData.experimentName = buttonBody;
          await this.message.sendExperimentDetails(
            from,
            selectedExperimentDetails,
          );
          break;

        case localisedStrings.startButton.includes(buttonBody):
          const { setName } = await this.message.sendExperimentFirstQuestion(
            from,
            selectedExperimentquestion?.quiz_sets,
          );
          userData.setName = setName;
          userData.currentQuestionIndex += 1;
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
          const feedback = await this.message.sendFeedBack(
            from,
            selectedExperimentquestion?.quiz_sets,
            userData.setName,
            userData.currentQuestionIndex,
            buttonBody,
          );
          userData.score += feedback;
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
    } else {
      if (localisedStrings.validText.includes(textBody)) {
        this.message.sendWelcomeMessage(from, userData.language);
        return;
      }

      userData.userName = textBody;
      await this.message.sendClassButtons(from);
    }

    await this.userService.saveUser(userData);
  }
}
export default ChatbotService;
