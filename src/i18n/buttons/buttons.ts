import data from '../../datasource/data.json';

import { localisedStrings } from '../en/localised-strings';

export function createClassButton(from: string) {
  return {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: localisedStrings.classPrompt,
        },
      },
      buttons: localisedStrings.classes.map((classes: string) => ({
        type: 'solid',
        body: classes,
        reply: classes,
      })),
      allow_custom_response: false,
    },
  };
}

export function scienceTopicButtons(from: string, buttonBody: string) {
  const classGroup = data.classGroups.find(
    (group) => group.class === buttonBody,
  );

  // Get topics from the found class group
  const topics = classGroup?.topics.map((topic) => topic.topic_name) || [];

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
      buttons: topics.map((topic) => ({
        type: 'solid',
        body: topic,
        reply: topic,
      })),
      allow_custom_response: false,
    },
  };
}

export function difficultyLevelButtons(from: string) {
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
  const selectedClassGroup = data.classGroups.find(
    (group) => group.class === userData.classGroup,
  );

  // Find the selected science topic within the class group
  const selectedScienceTopic = selectedClassGroup?.topics.find(
    (topic) => topic.topic_name === userData.scienceTopic,
  );

  // Find the selected difficulty level within the science topic
  const selectedDifficultyLevel = selectedScienceTopic?.levels.find(
    (level) => level.level_name === userData.difficultyLevel,
  );

  // Map through the experiments and create buttons based on the experiment_name
  const buttons = selectedDifficultyLevel?.experiments.map((experiment) => ({
    type: 'solid',
    body: experiment.experiment_name,
    reply: experiment.experiment_name,
  }));

  // Return the button response with the experiment topic message
  return {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: localisedStrings.experimentTopicMessage, // Customize this text if needed
        },
      },
      buttons: buttons,
      allow_custom_response: false,
    },
  };
}

export function experimentDetailsWithButton(
  from: string,
  selectedExperimentDetail: any,
) {
  // Construct the experiment details message
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
${selectedExperimentDetail.steps
  .map((step, index) => `${index + 1}. ${step}`)
  .join('\n\n')}

${
  selectedExperimentDetail.video_link
    ? `**Video Tutorial**:${selectedExperimentDetail.video_link}`
    : ''
}
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
