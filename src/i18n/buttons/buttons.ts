import data from '../../datasource/data.json';
import { localisedStrings } from '../en/localised-strings';

export function createAgeButton(from: string) {
  return {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: localisedStrings.agePrompt,
        },
      },
      buttons: localisedStrings.ages.map((age: string) => ({
        type: 'solid',
        body: age,
        reply: age,
      })),
      allow_custom_response: false,
    },
  };
}

export function scienceTopicButtons(from: string) {
  const topic = data.topics.map((topic) => topic.topic_name);
  return {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: localisedStrings.scienceTopicMessage,
        },
      },
      buttons: topic.map((topic: string) => ({
        type: 'solid',
        body: topic,
        reply: topic,
      })),
      allow_custom_response: false,
    },
  };
}

export function difficultyLevelButtons(from: string, topic: string) {
  return {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: localisedStrings.difficultyLevelPrompt,
        },
      },
      buttons: localisedStrings.difficultyLevelButtons.map((difficultyLevel: string) => ({
        type: 'solid',
        body: difficultyLevel,
        reply: difficultyLevel,
      })),
      allow_custom_response: false,
    },
  };
}

export function experimentTopicButtons(from: string, userData: any) {
  const selectedScienceTopic = data.topics.find(
    (t) => t.topic_name === userData.scienceTopic,
  );
  const selectedDifficultyLevel = selectedScienceTopic.levels.find(
    (l) => l.level_name === userData.difficultyLevel,
  );

  const buttons = selectedDifficultyLevel.experiments.map((experiment) => ({
    type: 'solid',
    body: experiment.experiment_name,
    reply: experiment.experiment_name,
  }));

  return {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: localisedStrings.difficultyLevelPrompt,
        },
      },
      buttons,
      allow_custom_response: false,
    },
  };
}
