
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What percentage of your pre-tax income are you currently saving for retirement?",
    options: [
      { text: "I'm not currently saving", score: 1 },
      { text: "1-5%", score: 2 },
      { text: "6-10%", score: 3 },
      { text: "11-15%", score: 4 },
      { text: "More than 15%", score: 5 },
    ],
  },
  {
    id: 2,
    text: "How much high-interest debt (e.g., credit card debt) do you currently have?",
    options: [
      { text: "A significant amount", score: 1 },
      { text: "A manageable amount", score: 2 },
      { text: "A very small amount", score: 3 },
      { text: "None, I pay it off monthly", score: 4 },
    ],
  },
  {
    id: 3,
    text: "How would you describe your knowledge of retirement investment options (e.g., 401(k)s, IRAs, stocks)?",
    options: [
      { text: "Very low, it's confusing", score: 1 },
      { text: "Basic understanding", score: 2 },
      { text: "Fairly knowledgeable", score: 3 },
      { text: "Very knowledgeable and confident", score: 4 },
    ],
  },
  {
    id: 4,
    text: "Have you created a formal, written financial plan for your retirement?",
    options: [
      { text: "No, I have not thought about it", score: 1 },
      { text: "I've thought about it but haven't written it down", score: 2 },
      { text: "Yes, I have a basic plan", score: 3 },
      { text: "Yes, I have a detailed plan I review regularly", score: 4 },
    ],
  },
  {
    id: 5,
    text: "How many sources of income do you expect to have in retirement (e.g., Social Security, pension, investments, part-time work)?",
    options: [
      { text: "One", score: 1 },
      { text: "Two", score: 2 },
      { text: "Three", score: 3 },
      { text: "Four or more", score: 4 },
    ],
  },
  {
    id: 6,
    text: "If the stock market dropped 20% tomorrow, how would you react with your retirement investments?",
    options: [
        { text: "Sell everything to avoid further losses", score: 1 },
        { text: "Sell some of my investments", score: 2 },
        { text: "Hold my investments and wait for recovery", score: 3 },
        { text: "Invest more, seeing it as a buying opportunity", score: 4 },
    ],
  }
];
