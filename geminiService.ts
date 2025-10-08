
import { GoogleGenAI } from "@google/genai";
import { Answer, UserData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateRetirementReport = async (
  answers: Answer[],
  score: number,
  maxScore: number,
  userData: UserData
): Promise<string> => {

  const formattedAnswers = answers.map((a, index) => 
    `${index + 1}. ${a.questionText}\n   - Your Answer: ${a.answerText} (Score: ${a.score})`
  ).join('\n');

  const prompt = `
    Act as a friendly and professional financial advisor. A user has completed a retirement preparedness questionnaire. Their details and answers are provided below. Your task is to generate a detailed and personalized retirement preparedness report.

    **User Details:**
    - Email: ${userData.email}
    - Mobile: ${userData.mobile}

    **Assessment Results:**
    - Final Score: ${score} out of a possible ${maxScore}.

    **Questionnaire Answers:**
    ${formattedAnswers}

    **Instructions for the Report:**

    Generate a report formatted as the body of an email. The tone should be positive, empowering, and professional, avoiding specific investment recommendations. The goal is to inform and motivate the user to seek professional advice.

    The email must have the following sections:

    1.  **Subject Line:** Start with "Subject: Your Personalized Retirement Preparedness Report".

    2.  **Greeting:** A warm and personal greeting like "Dear [User],". Since the user's name is not provided, you can use a general but welcoming greeting.

    3.  **Your Score Explained:** Briefly explain what their score of ${score}/${maxScore} means in simple terms. For example, if the score is high, praise them. If it's low, be encouraging about the opportunity to improve.

    4.  **Your Strengths:** Based on their high-scoring answers (score of 3 or higher), identify 2-3 things they are doing well. Be specific, referencing their answers to show the report is personalized. For example, "It's fantastic that you are saving more than 15% of your income..."

    5.  **Areas for Growth:** Based on their lower-scoring answers (score of 2 or lower), gently highlight 2-3 areas where they could improve. Frame these as opportunities, not failures. Provide actionable, general advice for each area. For example, "Creating a written financial plan can provide a clear roadmap..."

    6.  **Your Next Steps:** A concluding paragraph that encourages them to take action. Mention that a financial advisor can help create a more efficient and effective strategy tailored to their unique goals.

    7.  **Closing:** A professional closing, such as "Best regards,\nThe FutureSecure Financials Team".

    Please generate only the text content of the email body, starting with the subject line.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // In a real application, you would use a backend service to send an email.
    // Here, we simulate this by logging the generated report content.
    console.log("--- Generated Email Report ---");
    console.log(response.text);
    console.log("----------------------------");

    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate retirement report.");
  }
};
