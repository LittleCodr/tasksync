import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const analyzeTasks = async (tasks: any[]) => {
  const prompt = `Analyze these tasks and provide priority recommendations based on deadlines, urgency, and importance:
    ${JSON.stringify(tasks, null, 2)}
    
    For each task, provide:
    1. Recommended priority (High, Medium, Low)
    2. Best time slot for completion
    3. Brief reasoning for the recommendation`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const getChatResponse = async (message: string, context: any) => {
  const prompt = `As a productivity assistant, help the user with their tasks. Context about their tasks and work patterns:
    ${JSON.stringify(context, null, 2)}
    
    User message: ${message}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};