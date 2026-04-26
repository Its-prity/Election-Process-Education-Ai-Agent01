import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyANSKqrwBiXoEUgtAjFZG7EtTTWqruRmxs";
const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
  const modelsToTest = ["gemini-2.5-flash", "gemini-flash-latest"];
  for (const m of modelsToTest) {
    try {
      console.log(`Testing model: ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Hello!");
      const response = await result.response;
      console.log(`Success with ${m}:`, response.text());
      return;
    } catch (error) {
      console.error(`Failed with ${m}:`, error.message);
    }
  }
}

test();
