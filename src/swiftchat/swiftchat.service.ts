import { Body, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LocalizationService } from 'src/localization/localization.service';
import { MessageService } from 'src/message/message.service';
import { localisedStrings } from 'src/i18n/en/localised-strings';
import {
  createClassButton,
  scienceTopicButtons,
  difficultyLevelButtons,
  experimentTopicButtons,
  experimentDetails,
  firstQuestionWithOptionButtons,
  nextQuestionWithOptionButtons,
  scoreWithButtons,
  startAndExploreButton
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
    const requestData = await this.prepareRequestData(
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

  async sendClassButtons(from: string) {
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

  
//===================================
async sendStartQuizandExploreButton(from: string, selectedCategory: any) {
  const requestData = startAndExploreButton(from, selectedCategory);
  await this.sendMessage(this.baseUrl, requestData, this.apiKey);
}


async sendQuizMessage(from: string) {
  const requestData = this.prepareRequestData(
    from,
    localisedStrings.quizMessage(),
  );
  await this.sendMessage(this.baseUrl, requestData, this.apiKey);
}

    
  async sendExperimentDetails(from: string, selectedExperimentDetails: any) {
    // Validate the selected experiment details
    if (!selectedExperimentDetails || !selectedExperimentDetails.experiment_name) {
      console.log('Experiment details are invalid or missing.');
      return;
    }
  
    // Construct the experiment URL dynamically
    const experimentUrl = `https://scienceexperiments.web.app/experiment/${encodeURIComponent(
      selectedExperimentDetails.experiment_name,
    )}`;
  
    // Construct the experiment card
    const experimentCard = {
      header: {
        type: 'text', 
        text: {
          body: selectedExperimentDetails.video_link
        }, 
      },
      body: {
        title: selectedExperimentDetails.experiment_name, 
        subtitle: `Aim: ${selectedExperimentDetails.aim}`, 
      },
      actions: [
        {
          button_text: 'Learn More', // Button text
          type: 'website', // Type of action
          website: {
            title: `Learn about ${selectedExperimentDetails.experiment_name}`, // Button title
            payload: 'experiment_info', 
            url: experimentUrl, 
          },
        },
      ],
    };
  
    // Prepare the request data for the platform
    const requestData = {
      to: from, 
      type: 'card', 
      card: [experimentCard], 
    };
  
    // console.log('Prepared request data:', requestData);
  
    try {
      const response = await this.sendMessage(this.baseUrl, requestData, this.apiKey);
      console.log('Experiment details sent successfully:', response);
      return response; 
    } catch (error) {
      console.error('Error sending experiment details:', error); // Error handling
    }
  
    return experimentCard; 
  }


  async sendExperimentFirstQuestion(
    from: string,
    selectedExperimentquestion: any,

  ) {
    console.log( selectedExperimentquestion)
    const { messageData, setName } = firstQuestionWithOptionButtons(
      from,
      selectedExperimentquestion,
    );
    const response = await this.sendMessage(
      this.baseUrl,
      messageData,
      this.apiKey,
    );
    return { response, setName };
  }

  async sendQuestion(
    from: string,
    selectedExperimentquestion: any,
    setName: string,
    currentQuestionIndex: number,
  ) {
    const messageData = nextQuestionWithOptionButtons(
      from,
      selectedExperimentquestion,
      setName,
      currentQuestionIndex,
    );
    const response = await this.sendMessage(
      this.baseUrl,
      messageData,
      this.apiKey,
    );
    return response;
  }

  async sendFeedBack(
    from: string,
    selectedExperimentquestion: any,
    setName: string,
    currentQuestionIndex: number,
    buttonBody: string,
  ) {
    // Find the correct question set based on the setName
    const questionSet = selectedExperimentquestion.find(
      (set: any) => set.set_name === setName,
    );

    if (questionSet) {
      let currentQuestion: any; 

      if (currentQuestionIndex === 0) {
        currentQuestion = questionSet.questions[0];
      } else {
        currentQuestion = questionSet.questions[currentQuestionIndex - 1];
      }

      // Check if buttonBody matches the correct answer for this question
      if (currentQuestion?.correct_answer === buttonBody) {
        const requestData = await this.prepareRequestData(
          from,
          `${localisedStrings.correctAnswer}\n**${currentQuestion.explanation}**`,
        );
        const response = await this.sendMessage(
          this.baseUrl,
          requestData,
          this.apiKey,
        );
        return 1;
      } else {
        const requestData = await this.prepareRequestData(
          from,
          `${localisedStrings.incorrectAnswer}\n**${currentQuestion.explanation}**`,
        );
        const response = await this.sendMessage(
          this.baseUrl,
          requestData,
          this.apiKey,
        );
        return 0;
      }
    } else {
      console.log('Question set not found');
    }
  }

  async sendScoreWithButtons(from: string, score: number) {
    const buttonData = scoreWithButtons(from);
    const percentage = (score / 10) * 100;
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(
      2,
      '0',
    )}-${String(currentDate.getMonth() + 1).padStart(
      2,
      '0',
    )}-${currentDate.getFullYear()}`;
    let badge = '';
    let performance = '';
    let animation = '';
    let text2 = '';
    // Assign badge and performance based on score
    if (score === 10) {
      badge = 'Gold🥇';
      performance = 'high';
      animation = 'confetti';
      text2 = 'Outstanding! Perfect score!';
    } else if (score >= 8) {
      badge = 'Silver🥈';
      performance = 'high';
      animation = 'confetti';
      text2 = 'Great job! You nailed it!';
    } else if (score >= 5) {
      badge = 'Bronze🥉';
      performance = 'medium';
      animation = undefined;
      text2 = 'Good effort! Keep it up!';
    } else {
      badge = 'Participant🎖️';
      performance = 'low';
      animation = undefined;
      text2 = 'Keep trying! You’ll improve!';
    }
    const requestData = {
      to: from,
      type: 'scorecard',
      scorecard: {
        theme: 'theme1',
        background: 'green',
        performance: performance,
        share_message: localisedStrings.shareMessage(score),
        text1: `${formattedDate}`,
        text2: text2,
        text3: `${percentage}%`,
        text4: `${badge}`,
        score: `${score}/10`,
        animation: animation,
      },
    };

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );

    await this.sendMessage(this.baseUrl, buttonData, this.apiKey);
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
