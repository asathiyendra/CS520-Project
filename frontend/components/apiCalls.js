import { API_URL } from "./constants";

async function apiCall(destinationUrl, method, params = {}) {
  if (Object.keys(params).length > 0) {
    // convert params object a query string
    const paramsArray = Object.entries(params);
    const paramsString = paramsArray
      .map((param) => `${param[0]}=${param[1]}`)
      .join("&");
    destinationUrl = `${destinationUrl}?${paramsString}`;
  }

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

async function getFriends() {
  const data = await apiCall(
    "friendships/",
    "GET",
    (params = {
      userid: 1,
    })
  );
  return data;
}

async function getResponseById(responseId) {
  const data = await apiCall(
    "getResponseDetails/",
    "GET",
    (params = { responseid: responseId })
  );
  return data;
}

async function getRandomPrompt() {
  const data = await apiCall("prompts/random_prompt/", "GET");
  return data;
}

export { getRandomPrompt, getFriends, getResponseById };
