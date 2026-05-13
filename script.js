async function generateContent(){

const topic =
document.getElementById("topic").value;

const output =
document.getElementById("output");

output.innerHTML =
"<div class='loading'>Generating amazing content...</div>";

const API_KEY =
"AIzaSyDCOE6fWH-6kyh9OhoYh87uBetaq_luKpU";

const prompt = `
You are a viral YouTube strategist.

For the topic "${topic}"

Generate:

1. 3 viral video titles
2. Thumbnail text
3. Strong hook
4. Short storytelling idea
5. CTA for engagement

Make it emotional and highly engaging.
`;

try{

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${AIzaSyDCOE6fWH-6kyh9OhoYh87uBetaq_luKpU}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{text:prompt}
]
}
]
})
}
);

const data = await response.json();

const text =
data.candidates[0].content.parts[0].text;

output.innerHTML = text;

}catch(error){

output.innerHTML =
"Something went wrong.";

}

}

function copyText(){

const text =
document.getElementById("output").innerText;

navigator.clipboard.writeText(text);

alert("Copied!");
}