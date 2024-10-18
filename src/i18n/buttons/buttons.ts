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
      buttons: localisedStrings.difficultyLevelButtons.map(
        (difficultyLevel: string) => ({
          type: 'solid',
          body: difficultyLevel,
          reply: difficultyLevel,
        }),
      ),
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
          body: localisedStrings.experimentTopicMessage,
        },
      },
      buttons,
      allow_custom_response: false,
    },
  };
}

export function experimentDetailsWithButton(from: string, selectedExperimentDetail: any) {
  const experimentDetails = `
**Overview**: ${selectedExperimentDetail.aim}

**Objectives**:
${selectedExperimentDetail.objectives
  .map((objective, index) => `${index + 1}. ${objective}`)
  .join('\n\n')}

**Materials Needed**:
${selectedExperimentDetail.materials_needed
  .map((material, index) => `${index + 1}. ${material}`)
  .join('\n\n')}

**Step-by-Step Instructions**: 
${selectedExperimentDetail.steps.map((step, index) => `${index + 1}. ${step}`).join('\n\n')}

${selectedExperimentDetail.video_link ? `**Video Tutorial**:${selectedExperimentDetail.video_link}` : ''}
`;
  return {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: experimentDetails,
        },
      },
      buttons: [
        {
          type: 'solid',
          body: localisedStrings.startButton,
          reply: localisedStrings.startButton,
        },
      ],
      allow_custom_response: false,
    },
  };
}
