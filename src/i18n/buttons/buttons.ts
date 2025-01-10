import data from '../../datasource/data.json';
import _ from 'lodash';
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
  if(!classGroup) {
    console.error('Class group not found for the given class.');
  }
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
export function experimentDetails(from: string, selectedExperimentDetail: any) {
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

export function firstQuestionWithOptionButtons(
  from: string,
  selectedExperimentquestion: any,
) {
  // Select a random question set
 
  const randomSet =
    selectedExperimentquestion[
      Math.floor(Math.random() * selectedExperimentquestion.length)
    ];
  const questionObject = randomSet.questions[0];
  // Check if the question exists for the given index
  if (!questionObject) {
    console.error('No question found at the provided index.');
    return;
  }
  // Shuffle options using lodash
  const shuffledOptions = _.shuffle(questionObject.options);
  const messageData = {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: `Question 1.\n${questionObject.question}`,
        },
      },
      buttons: shuffledOptions.map((option: string) => ({
        type: 'solid',
        body: option,
        reply: option,
      })),
      allow_custom_response: false,
    },
  };
  return {
    messageData,
    setName: randomSet.set_name,
  };
}


export function nextQuestionWithOptionButtons(
  from: string,
  selectedExperimentquestion: any,
  setName: string,
  currentQuestionIndex: number,
) {
  // Find the set by setName and validate that it exists
  const questionSet = selectedExperimentquestion.find(
    (set: any) => set.set_name === setName,
  );
  // Check if the questionSet and the specific question exist
  if (!questionSet || !questionSet.questions[currentQuestionIndex]) {
    console.error("Question set or specific question not found.");
    return;
  }
  const questionObject = questionSet.questions[currentQuestionIndex];
  // Check if the questionObject and its options are valid
  if (!questionObject || !questionObject.options) {
    console.error("Question object or options are missing.");
    return;
  }
  currentQuestionIndex += 1;

  // Shuffle options using lodash
  const shuffledOptions = _.shuffle(questionObject.options);
  return {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: `Question ${currentQuestionIndex}.\n${questionObject.question}` ,
        },
      },
      buttons: shuffledOptions.map((option: string) => ({
        type: 'solid',
        body: option,
        reply: option,
      })),
      allow_custom_response: false,
    },
  };
}

//================================
export function startAndExploreButton(
  from: string,
  selectedCategory: any,) 
  {
  return {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: localisedStrings.afterCarousalMessage(selectedCategory),
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



export function scoreWithButtons(from: string) {
  return {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: localisedStrings.afterScoreMessage,
        },
      },
      buttons: [
        {
          type: 'solid',
          body: localisedStrings.selectExperimentButton,
          reply: localisedStrings.selectExperimentButton,
        },
        {
          type: 'solid',
          body: localisedStrings.mainMenuButton,
          reply: localisedStrings.mainMenuButton,
        },
        {
          type: 'solid',
          body: localisedStrings.retakeQuizButton,
          reply: localisedStrings.retakeQuizButton,
        },
      ],
      allow_custom_response: false,
    },
  };
}









