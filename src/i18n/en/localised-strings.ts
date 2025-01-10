export const localisedStrings = {
  validText: ['hi', 'Hi', 'HI', 'hI', 'Hello', 'hello', 'hola', 'Hii', 'hii'], 
  welcomeMessage: `Hello there! 👋 I'm the Lab Assistant, your science lab buddy! 🧪 What's your name, young scientist? 👩‍🔬👨‍🔬`,
  seeMoreMessage: 'See More Data',
  classPrompt: 'Which class group are you in? This will help me pick the best science experiments for you! 👨‍🏫',  
  classes: ['Below 6', '7-8', '9-10', '11-12'],
  scienceTopicMessage: `Choose a science topic you'd love to explore! 🔍🧬 Let's dive into some exciting discoveries!`,  
  difficultyLevelPrompt: 'What difficulty level would you like to try today?',  
  difficultyLevelButtons: ['Easy', 'Medium', 'Hard'],  
  experimentTopicMessage: 'Here are some fun experiments for you to try! 🎉🔬 Select one to start your scientific journey!',
  //=========
  afterCarousalMessage: (selectedCategory: any) => `Do you Want to test your knowledge about ${selectedCategory}? *click on start quiz*\n`,

  startButton:'Start Quiz 🚀',
  //====================
  quizMessage: () => `Welcome to the quiz! You'll be answering 10 questions, and for each correct answer, you'll earn 1 mark. Don't worry—incorrect answers won't cost you anything, as you'll score 0 for them. Ready to test your knowledge? Best of luck! :four_leaf_clover:`,

  topic: `Do you want to change`,
  ageButton: `Change age`,
  topicbutton:`Change topic`,
  levelButton:`Change level`,
  subjectButton:`Change subject`,
  exploreButton: 'Explore More Data',
  correctAnswer: `✅ Nice work! That's correct!`,
  incorrectAnswer: '❌ Wrong option❗ Please learn from the right option below ⬇️',
  afterScoreMessage: `Amazing work! 🌟🚀 Would you like to explore another thrilling experiment 🧪⚡, or go back to the quiz? 📊💪`,
  selectExperimentButton: 'Select Experiment 🔬',
  mainMenuButton: 'Main Menu 🏠',
  retakeQuizButton: 'Retake Quiz 🔄',
  shareMessage: (score: number) => `I scored ${score}/10 in the Lab Quiz! Try it: https://web.convegenius.ai/bots?botId=0201039737557804`,
  language_hindi: 'हिन्दी', 
  language_english: 'English',  
  language_changed: 'Language changed to English', 
};
