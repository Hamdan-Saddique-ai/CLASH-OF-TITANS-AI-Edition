// AI Debate Arguments Generator
// ChatGPT (Pro side - usually in favor of topic)
// DeepSeek (Con side - usually critical of topic)

let debateHistory = [];
let currentWinner = null;

// Random topics list
const randomTopics = [
    "Kya Artificial Intelligence insani naukriyan khatam kar degi?",
    "Social media zyada nuksan de raha hai ya faida?",
    "Kya remote work future hai?",
    "Cryptocurrency ek bubble hai ya future currency?",
    "Kya online education offline education se better hai?",
    "Pakistan ko AI mein invest karna chahiye?",
    "Kya electric vehicles environment ke liye truly better hain?",
    "Universal Basic Income ek achcha idea hai?",
    "Kya space exploration waste of money hai?",
    "Genetically modified food safe hai?"
];

// Generate ChatGPT Argument (usually supportive/innovative)
function generateChatGPTArgument(topic) {
    if (!topic || topic.trim() === "") topic = "Is debate topic";
    
    const templates = [
        `Mere perspective mein, "${topic}" ka future bohot bright hai. Iske bahut saare faide hain jo humein aage badhne mein madad kareinge. Technology aur innovation is direction mein already kaam kar rahi hai.`,
        
        `Main ChatGPT ke taur par keh sakta hoon ki "${topic}" ko apnana ek smart decision hoga. Data aur research is baat ki tasdeeq karte hain ke iske positive outcomes zyada hain.`,
        
        `"${topic}" ke haq mein mazboot arguments hain. Yeh efficiency improve karta hai, costs kam karta hai, aur logon ke liye naye opportunities create karta hai. Hum ise ignore nahi kar sakte.`,
        
        `Analysis ke mutabiq, "${topic}" ek game-changer hai. Iske benefits risks se kaafi zyada hain. Future trends bhi is direction mein ishaara kar rahe hain.`,
        
        `Main samajhta hoon "${topic}" ko support karna logical hai. Isse economic growth, social progress, aur technological advancement possible hai.`
    ];
    
    let argument = templates[Math.floor(Math.random() * templates.length)];
    
    // Calculate strength based on argument quality
    let strength = 50 + Math.floor(Math.random() * 30);
    if (argument.length > 150) strength += 10;
    if (argument.includes("future") || argument.includes("innovation")) strength += 5;
    if (argument.includes("benefits") || argument.includes("faide")) strength += 8;
    strength = Math.min(98, Math.max(45, strength));
    
    return { text: argument, strength: strength };
}

// Generate DeepSeek Argument (usually critical/analytical)
function generateDeepSeekArgument(topic) {
    if (!topic || topic.trim() === "") topic = "Is debate topic";
    
    const templates = [
        `DeepSeek ke taur par, main "${topic}" par gehrai se gaur karna zaroori samajhta hoon. Iske kuch serious drawbacks bhi hain jinhe ignore nahi kiya ja sakta. Hasty decisions nuksaan de sakte hain.`,
        
        `"${topic}" kaafi complex issue hai. Iske potential risks aur ethical concerns ko samjhna zaroori hai. Bina proper safeguards ke, ye problems create kar sakta hai.`,
        
        `Meri analysis ke mutabiq, "${topic}" ke overhyped hone ke chances zyada hain. Real-world implementation mein kaafi challenges aate hain jo log ignore karte hain.`,
        
        `Main "${topic}" ke khilaf nahi hoon, lekin iske nuqsaan ko bhi dekhna zaroori hai. Isme inequality, job loss, aur control issues ho sakte hain jo serious hain.`,
        
        `DeepSeek ki reasoning kehti hai ke "${topic}" ko lete waqt caution zaroori hai. Short-term benefits long-term risks se kam ho sakte hain. Humhe smart observation chahiye.`
    ];
    
    let argument = templates[Math.floor(Math.random() * templates.length)];
    
    let strength = 50 + Math.floor(Math.random() * 30);
    if (argument.length > 150) strength += 10;
    if (argument.includes("risk") || argument.includes("concern")) strength += 5;
    if (argument.includes("analysis") || argument.includes("complex")) strength += 8;
    strength = Math.min(98, Math.max(45, strength));
    
    return { text: argument, strength: strength };
}

// Update UI with arguments
function updateUI(chatgptArg, deepseekArg) {
    document.getElementById("chatgptArgument").innerText = chatgptArg.text;
    document.getElementById("deepseekArgument").innerText = deepseekArg.text;
    
    const chatgptStrength = chatgptArg.strength;
    const deepseekStrength = deepseekArg.strength;
    
    document.getElementById("chatgptStrength").innerText = chatgptStrength + "%";
    document.getElementById("deepseekStrength").innerText = deepseekStrength + "%";
    
    document.getElementById("chatgptFill").style.width = chatgptStrength + "%";
    document.getElementById("deepseekFill").style.width = deepseekStrength + "%";
}

// Update statistics
function updateStats() {
    if (debateHistory.length === 0) {
        document.getElementById("avgChatgpt").innerText = "0%";
        document.getElementById("avgDeepseek").innerText = "0%";
        document.getElementById("debateCount").innerText = "0";
        return;
    }
    
    let sumChat = 0, sumDeep = 0;
    for (let entry of debateHistory) {
        sumChat += entry.chatgpt;
        sumDeep += entry.deepseek;
    }
    
    const avgChat = Math.floor(sumChat / debateHistory.length);
    const avgDeep = Math.floor(sumDeep / debateHistory.length);
    
    document.getElementById("avgChatgpt").innerText = avgChat + "%";
    document.getElementById("avgDeepseek").innerText = avgDeep + "%";
    document.getElementById("debateCount").innerText = debateHistory.length;
}

// Start Debate
function startDebate() {
    let topic = document.getElementById("topicInput").value.trim();
    if (topic === "") {
        topic = "Artificial Intelligence ka future";
        document.getElementById("topicInput").value = topic;
    }
    
    const chatgptArg = generateChatGPTArgument(topic);
    const deepseekArg = generateDeepSeekArgument(topic);
    
    updateUI(chatgptArg, deepseekArg);
    
    debateHistory.push({
        chatgpt: chatgptArg.strength,
        deepseek: deepseekArg.strength,
        topic: topic,
        time: new Date().toLocaleTimeString()
    });
    
    if (debateHistory.length > 20) debateHistory.shift();
    
    updateStats();
    
    // Clear previous winner
    currentWinner = null;
    document.getElementById("winnerDisplay").innerHTML = "⚖️ Debate complete! Ab winner select karein...";
    document.getElementById("insightText").innerHTML = `🎯 Topic: "${topic}" — Dono AI ne apne arguments de diye. Aap judge karein kiski argument zyada solid thi!`;
}

// Reset everything
function resetDebate() {
    debateHistory = [];
    currentWinner = null;
    
    document.getElementById("chatgptArgument").innerHTML = "Topic select karein aur Start Debate dabayein...";
    document.getElementById("deepseekArgument").innerHTML = "Topic select karein aur Start Debate dabayein...";
    document.getElementById("chatgptStrength").innerText = "0%";
    document.getElementById("deepseekStrength").innerText = "0%";
    document.getElementById("chatgptFill").style.width = "0%";
    document.getElementById("deepseekFill").style.width = "0%";
    
    updateStats();
    document.getElementById("winnerDisplay").innerHTML = "⚖️ Koi winner select nahi kiya gaya";
    document.getElementById("insightText").innerHTML = "💡 Reset ho gaya! Naya topic likhein aur debate shuru karein.";
}

// Select Winner ChatGPT
function selectChatGPTWinner() {
    if (debateHistory.length === 0) {
        alert("Pehle debate start karein! 'START DEBATE' button dabayein.");
        return;
    }
    
    currentWinner = "ChatGPT";
    const chatStrength = document.getElementById("chatgptStrength").innerText;
    const deepStrength = document.getElementById("deepseekStrength").innerText;
    
    document.getElementById("winnerDisplay").innerHTML = `🏆 WINNER: CHATGPT (OpenAI) 🏆 <br> Argument Strength: ${chatStrength} | DeepSeek: ${deepStrength}`;
    document.getElementById("insightText").innerHTML = `✅ Aapne ChatGPT ko winner declare kiya! ChatGPT ka argument strength ${chatStrength} tha. DeepSeek ka ${deepStrength} tha. Aapki judgement sahi hai!`;
}

// Select Winner DeepSeek
function selectDeepSeekWinner() {
    if (debateHistory.length === 0) {
        alert("Pehle debate start karein! 'START DEBATE' button dabayein.");
        return;
    }
    
    currentWinner = "DeepSeek";
    const chatStrength = document.getElementById("chatgptStrength").innerText;
    const deepStrength = document.getElementById("deepseekStrength").innerText;
    
    document.getElementById("winnerDisplay").innerHTML = `🏆 WINNER: DEEPSEEK (深度求索) 🏆 <br> Argument Strength: ${deepStrength} | ChatGPT: ${chatStrength}`;
    document.getElementById("insightText").innerHTML = `✅ Aapne DeepSeek ko winner declare kiya! DeepSeek ka argument strength ${deepStrength} tha. ChatGPT ka ${chatStrength} tha. Zabardast decision!`;
}

// Random Topic
function setRandomTopic() {
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    document.getElementById("topicInput").value = randomTopic;
    startDebate();
}

// Event Listeners
document.getElementById("startDebateBtn").addEventListener("click", startDebate);
document.getElementById("resetBtn").addEventListener("click", resetDebate);
document.getElementById("chatgptWinBtn").addEventListener("click", selectChatGPTWinner);
document.getElementById("deepseekWinBtn").addEventListener("click", selectDeepSeekWinner);
document.getElementById("randomTopicBtn").addEventListener("click", setRandomTopic);

// Initial default topic
window.addEventListener("load", () => {
    document.getElementById("topicInput").value = "Kya Pakistan ko AI technology mein invest karna chahiye?";
});