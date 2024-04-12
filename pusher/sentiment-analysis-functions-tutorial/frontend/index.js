import {
    dummyUsers,
    getPusherClient,
    renderMessage,
    setCookie,
  } from "./utils.js";
  
  // ...code continues below
// ...imports above

let channel;

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = document.querySelector("#username");
  const username = input.value;

  if (!dummyUsers.find((user) => user.user_info.name === username)) {
    alert("User not found");
    return;
  }
  setCookie({ name: "username", value: username, expiryInDays: 1 });
  renderMessage({
    query: "#username-display",
    message: `You have joined as ${username}`,
    className: "heading",
  });
  
  loginForm.style.display = "none";
  document.querySelector("#chat-area").style.display = "flex";
  
// ...code continues below
// ...continues from above
const pusherClient = await getPusherClient();
console.log(pusherClient);

channel = pusherClient.subscribe("private-chat-channel");
channel.bind("client-chat-event", (data) => {
  if (data) {
    renderMessage({
      query: ".messages",
      message: typeof data === "string" ? data : data?.message,
      className: "message",
    });
  }
});
});

// ...code continues below
// ...login-form event listener above

const messageForm = document.querySelector("#message-form");
messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = document.querySelector("#message");
  const message = input.value;

  await channel.trigger("client-chat-event", {
    message,
  });

  renderMessage({
    query: ".messages",
    message: `You: ${message}`,
    className: "message message-me",
  });

  input.value = "";
});
