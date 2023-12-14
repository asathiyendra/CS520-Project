import { API_URL } from "./constants";

async function apiCall(destinationUrl, method, params = {}, body = {}) {
  if (Object.keys(params).length > 0) {
    // convert params object a query string
    const paramsArray = Object.entries(params);
    const paramsString = paramsArray
      .map((param) => `${param[0]}=${param[1]}`)
      .join("&");
    destinationUrl = `${destinationUrl}?${paramsString}`;
  }

  const formData = new FormData();
  Object.keys(body).map((key) => formData.append(key, body[key]));

  try {
    const res = await fetch(`${API_URL}${destinationUrl}`, {
      method: method,
      body: Object.keys(body).length > 0 ? formData : null,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error.message);
    return { error: error.message };
  }
}

async function getFriends(userId) {
  const data = await apiCall(
    "friendships/",
    "GET",
    (params = {
      userid: userId,
    })
  );
  return data;
}

async function deleteFriend(userId, friendId) {
  const data = await apiCall(
    "friendships/delete/",
    "DELETE",
    {},
    {
      userid: userId,
      friendid: friendId,
    }
  );
  return data;
}

async function postAddFriend(userId, usernameOrEmail) {
  const data = await apiCall(
    "friendships/add/",
    "POST",
    {},
    {
      userid: userId,
      username_or_email: usernameOrEmail,
    }
  );
  return data;
}

async function postAcceptFriend(userId, friendId) {
  const data = await apiCall(
    "friendships/accept/",
    "POST",
    {},
    {
      userid: userId,
      friendid: friendId,
    }
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
  const data = await apiCall("prompts/random_prompt/", "GET", {}, {});
  return data;
}

async function getAllPreviousPrompts() {
  const data = await apiCall("previous_prompts", "GET");
  return data;
}

async function signIn(username, password) {
  const data = await apiCall(
    "login/",
    "POST",
    {},
    {
      username: username,
      password: password,
    }
  );
  return data;
}

async function register(username, password, email) {
  const data = await apiCall(
    "register/",
    "POST",
    {},
    {
      username: username,
      password: password,
      email: email,
    }
  );
  return data;
}

async function postResponse(userId, promptId, answer, visibility) {
  const data = await apiCall(
    "store_response/",
    "POST",
    {},
    {
      userid: userId,
      promptid: promptId,
      text: answer,
      visibility: visibility,
    }
  );
  return data;
}

async function getUserById(userId) {
  const data = await apiCall(
    "user_profile/",
    "GET",
    (params = {
      userid: userId,
    })
  );
  return data;
}

async function updateUser(userId, username, email, password) {
  const data = await apiCall("user_profile/edit/", "POST", {
    userid: userId,
    username: username,
    email: email,
    password: password,
  });
  return data;
}

async function getFriendsResponses(userId, promptId) {
  const data = await apiCall(
    "friendsResponses/",
    "GET",
    (params = {
      userid: userId,
      promptid: promptId,
    })
  );
  return data;
}

async function getResponses(promptId) {
  const data = await apiCall(
    "previous_prompts/prompt_response/",
    "GET",
    (params = {
      promptid: promptId,
    })
  );
  return data;
}

async function getPromptById(promptId) {
  const data = await apiCall(
    "prompts/",
    "GET",
    (params = {
      ID: promptId,
    })
  );
  return data;
}

export {
  getRandomPrompt,
  getFriends,
  getResponseById,
  signIn,
  register,
  getAllPreviousPrompts,
  postResponse,
  postAddFriend,
  postAcceptFriend,
  deleteFriend,
  getUserById,
  updateUser,
  getFriendsResponses,
  getResponses,
  getPromptById,
};
