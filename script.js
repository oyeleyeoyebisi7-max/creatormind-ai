const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

function addMessage(text, sender){
  const msg = document.createElement("div");

  msg.classList.add("message", sender);

  msg.innerHTML = text;

  chatBox.appendChild(msg);

  chatBox.scrollTop = chatBox.scrollHeight;

  return msg;
}

async function sendMessage(){

  const text = userInput.value.trim();

  if(!text) return;

  addMessage(text, "user");

  userInput.value = "";

  const loading = addMessage("Thinking...", "bot");

  try{

    const response = await fetch("/api/chat",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message:text
      })
    });

    const data = await response.json();

    loading.remove();

    addMessage(data.reply, "bot");

  }catch(error){

    loading.remove();

    addMessage("Something went wrong.", "bot");

    console.error(error);
  }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown",(e)=>{
  if(e.key==="Enter" && !e.shiftKey){
    e.preventDefault();
    sendMessage();
  }
});