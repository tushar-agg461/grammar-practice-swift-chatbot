import { Injectable } from '@nestjs/common';
import topicsJson from '../topics.json';
import * as dotenv from 'dotenv';
import { LocalizationService } from 'src/localization/localization.service';
import { MessageService } from 'src/message/message.service';
import { response } from 'express';
import axios from 'axios';
import { UserService } from 'src/model/user.service';

dotenv.config();

@Injectable()
export class SwiftchatMessageService extends MessageService {
  private botId = process.env.BOT_ID;
  private apiKey = process.env.API_KEY;
  private apiUrl = process.env.API_URL;
  private baseUrl = `${this.apiUrl}/${this.botId}/messages`;
  private topics: string[];

  constructor(private userService: UserService) {
    super();
    this.topics = this.getTopic();
  }
  private getTopic(): string[] {
    return topicsJson.map((topic) => topic.topic);
  }
  // function to create level buttons
  private async createLevelButtons(
    from: string,
    text: string,
    buttons: { body: string; reply: string }[],
  ): Promise<void> {
    const messageData = {
      to: from,
      type: 'button',
      button: {
        body: {
          type: 'text',
          text: {
            body: text,
          },
        },
        buttons: buttons,
        allow_custom_response: false,
      },
    };

    try {
      await axios.post(this.baseUrl, messageData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  // function to create topics buttons
  private async createButtons(from: string, topics: string[]): Promise<void> {
    const url = `${this.apiUrl}/${this.botId}/messages`;
    const buttons = topics.map((topic) => ({
      type: 'solid',
      body: topic,
      reply: topic,
    }));

    const messageData = {
      to: from,
      type: 'button',
      button: {
        body: {
          type: 'text',
          text: {
            body: 'Please choose a topic:',
          },
        },
        buttons: buttons,
        allow_custom_response: false,
      },
    };
    try {
      const response = await axios.post(url, messageData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('errors:', error);
    }
  }
  // function to create ques and options buttons
  async sendQuestionWithButtons(from: string, question: any) {
    const url = `${this.apiUrl}/${this.botId}/messages`;
    const buttons = question.options.map((option: string) => ({
      type: 'solid',
      body: option,
      reply: option,
    }));

    const messageData = {
      to: from,
      type: 'button',
      button: {
        body: {
          type: 'text',
          text: {
            body: `Question: ${question.question}`,
          },
        },
        buttons: buttons,
        allow_custom_response: false,
      },
    };

    try {
      const response = await axios.post(url, messageData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending question with buttons:', error);
      throw new Error('Error sending question with buttons');
    }
  }

  private prepareRequestData(from: string, requestBody: string): any {
    return {
      to: from,
      type: 'text',
      text: {
        body: requestBody,
      },
    };
  }

  // private formatTopicsMessage(): string {
  //   return `Here are the available topics for your learning:\n\n${this.topics
  //     .map((topic, index) => `${index + 1}. ${topic}`)
  //     .join('\n')}`;
  // }

  private getQuestion(topic: string, difficulty: string) {
    const topicData = topicsJson.find(
      (t) => t.topic === topic && t.level === difficulty,
    );
    return topicData ? topicData.questions : [];
  }

  private formatQuestionMessage(question: any): string {
    return `Question: ${question.question}\nOptions:\n${question.options
      .map((opt: string, index: number) => `${index + 1}. ${opt}`)
      .join('\n')}`;
  }

  async sendWelcomeMessage(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = this.prepareRequestData(
      from,
      localisedStrings.welcomeMessage,
    );

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    console.log('kaisa h');
    await this.sendTopicsList(from);
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

  async sendDifficultyButtons(from: string) {
    const difficultyLevels = ['easy', 'medium', 'hard'];
    const buttons = difficultyLevels.map((level) => ({
      body: level,
      reply: `${level}`,
    }));
    await this.createLevelButtons(
      from,
      'Please select a difficulty level',
      buttons,
    );
  }
  async sendTopicsList(from: string) {
    await this.createButtons(from, this.topics);
  }

  // async choice(from: string) {
  //   const requestData = this.prepareRequestData(
  //     from,
  //     'Pls select a topic and level of your choice. ',
  //   );

  //   const response = await this.sendMessage(
  //     this.baseUrl,
  //     requestData,
  //     this.apiKey,
  //   );
  //   return response;
  // }

  // function to select the level of question and topic of choice
  async handleUser(from: string, topic: string, difficulty: string) {
    const selectedTopic = topicsJson.find(
      (t) => t.topic === topic && t.level === difficulty,
    );
    // console.log(typeof selectedTopic);
    if (selectedTopic) {
      for (const question of selectedTopic.questions) {
        await this.sendQuestionWithButtons(from, question);
      }
    } else {
      const requestData = this.prepareRequestData(
        from,
        'Sorry, I couldn’t find the specified topic and difficulty level. Please try again.',
      );

      const response = await this.sendMessage(
        this.baseUrl,
        requestData,
        this.apiKey,
      );
      return response;
    }
  }

  // async sendNextQues(from: string) {
  //   const userProgress = await this.userService.getUserProgress(from);
  //   const { topic, difficulty, currentquesindex } = userProgress;
  //   const topicData = topicsJson.find(
  //     (t) => t.topic === topic && t.level === difficulty,
  //   );

  //   if (topicData && currentquesindex < topicData.questions.length) {
  //     const question = topicData.questions[currentquesindex];
  //     const formattedQuestion = this.formatQuestionMessage(question);
  //     const requestData = this.prepareRequestData(from, formattedQuestion);
  //     await this.sendMessage(this.baseUrl, requestData, this.apiKey);
  //     await this.userService.updateUserProgress(
  //       from,
  //       topic,
  //       difficulty,
  //       currentquesindex + 1,
  //     );
  //   } else {
  //     const requestData = this.prepareRequestData(
  //       from,
  //       'You have completed all questions for this topic and difficulty level.',
  //     );
  //     await this.sendMessage(this.baseUrl, requestData, this.apiKey);
  //   }
  // }

  async startQuiz(from: string, topic: string, difficulty: string) {
    await this.userService.updateUserProgress(topic);
    // await this.sendNextQues(from);
  }

  // // function to handle the next question
  // async sendNextQues(from: string) {
  //   const userProgress = await this.userService.getUserProgress(from);
  //   const question = this.getQuestion(
  //     userProgress.topic,
  //     userProgress.difficulty,
  //   );

  //   if (userProgress.currentquesindex < question.length) {
  //     const ques = question[userProgress.currentquesindex];
  //     await this.sendQuestionWithButtons(from, ques);
  //   } else {
  //     await this.sendMessage(
  //       this.baseUrl,
  //       this.prepareRequestData(from, 'You have completed the quiz!'),
  //       this.apiKey,
  //     );
  //     await this.userService.resetUserProgress(from);
  //   }
  // }

  // // function to handle the correct answer for selected option
  // async handleAnswer(from: string, answer: string) {
  //   const userProgress = await this.userService.getUserProgress(from);
  //   const questions = this.getQuestion(
  //     userProgress.topic,
  //     userProgress.difficulty,
  //   );

  //   const currentques = questions[userProgress.currentquesindex];
  //   const correctans = currentques.correctAnswer;

  //   if (answer == correctans) {
  //     await this.sendMessage(
  //       this.baseUrl,
  //       this.prepareRequestData(from, 'Congrats!, Correct answer.'),
  //       this.apiKey,
  //     );
  //   } else {
  //     await this.sendMessage(
  //       this.baseUrl,
  //       this.prepareRequestData(
  //         from,
  //         'Sorry!, This is not the correct answer.',
  //       ),
  //       this.apiKey,
  //     );
  //   }
  //   userProgress.currentquesindex++;
  //   await this.userService.saveUSerProgress(userProgress);
  //   await this.sendNextQues;
  // }

  // // function to start the quiz
  // async startQuiz(from: string, topic: string, difficulty: string) {
  //   const user = await this.userService.findUserByMobileNumber(from);
  //   user.topic = topic;
  //   user.difficulty = difficulty;
  //   user.currentquesindex = 0;
  //   await this.userService.saveUser(user);
  //   // await this.sendNextQues(from);
  // }
}
