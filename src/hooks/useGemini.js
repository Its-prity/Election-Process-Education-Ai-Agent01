import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const useGemini = () => {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDUfLRtyvHbiWXIvQH2srRd3EY9VJ57UGM');
  
  const generateResponse = useCallback(async (userText, language) => {
    if (!apiKey) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const lowerText = userText.toLowerCase();
      let response = "I notice you haven't provided an API key yet. For a real answer, please click 'Set API Key' in the top right. For now, this is a simulated response! 🗳️";
      
      if (lowerText.includes('vote') || lowerText.includes('voting')) {
        response = "To vote in a U.S. presidential election, you must be a U.S. citizen, meet your state's residency requirements, be 18 years old on or before Election Day, and be registered to vote by your state's deadline.";
      } else if (lowerText.includes('electoral college')) {
        response = "The Electoral College is a process, not a place. The founding fathers established it in the Constitution as a compromise between election of the President by a vote in Congress and election of the President by a popular vote of qualified citizens. There are 538 electors in total.";
      } else if (lowerText.includes('primary') || lowerText.includes('caucus')) {
        response = "A primary is a state-level election where party members vote to choose a candidate affiliated with their political party. A caucus is a local meeting where registered members of a political party in a city, town or county gather to vote for their preferred party candidate and conduct other party business.";
      }
      return response;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const prompt = `You are a helpful AI assistant. While you specialize in the Indian Election System (Lok Sabha, Rajya Sabha, Election Commission of India, voting, etc.), you are happy to answer ANY question the user asks, even if it is completely irrelevant to elections. Keep the answer concise and easy to understand. You MUST respond entirely in ${language}. Use markdown formatting. Whenever explaining a process, timeline, or complex relationship, you MUST include a Mermaid.js diagram block (\`\`\`mermaid ... \`\`\`) to visualize it. CRITICAL RULE FOR DIAGRAMS: To prevent Mermaid syntax errors, you MUST enclose ALL node labels in double quotes. Example: A["Node Label (Info)"] --> B["Another Label"]. Do not use unquoted parentheses or special characters inside node labels.\n\nUser Question: ${userText}`;
      
      const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-pro"];
      let lastError;

      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(prompt);
          const response = await result.response;
          return response.text();
        } catch (err) {
          console.warn(`Model ${modelName} failed:`, err.message);
          lastError = err;
          // If it's a 503, try the next model. If it's an auth error, we could stop, but trying the next won't hurt.
        }
      }

      throw lastError; // If all models fail, throw the last error
    } catch (error) {
      console.error("Error generating AI response:", error);
      return "API Error: " + error.message;
    }
  }, [apiKey]);

  return { apiKey, setApiKey, generateResponse };
};
