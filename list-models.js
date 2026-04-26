import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyANSKqrwBiXoEUgtAjFZG7EtTTWqruRmxs";

async function test() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    if (data.error) {
      console.error("Error fetching models:", data.error.message);
      return;
    }
    const models = data.models.map(m => m.name);
    console.log("Available models:", models);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

test();
