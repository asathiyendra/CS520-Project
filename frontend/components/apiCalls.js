import { API_URL } from "./constants";

async function apiCall(destinationUrl, method) {
  try {
    const res = await fetch(`${API_URL}${destinationUrl}`, {
      method: method,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error.message);
  }
}

async function getRandomPrompt() {
  const data = await apiCall("prompts/random_prompt/", "GET");
  return data;
}

export { getRandomPrompt };
