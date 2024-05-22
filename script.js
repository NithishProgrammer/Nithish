function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    displayMessage("You", userInput, "user-message");

    fetchResponse(userInput)
        .then(response => response.text())
        .then(data => {
            displayMessage("AI", data, "bot-message");
        })
        .catch(error => console.error('Error:', error));

    document.getElementById("user-input").value = "";
}

function displayMessage(sender, message, className) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.classList.add(className);
    messageElement.innerText = sender + ": " + message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchResponse(userInput) {
    const timeout = 10000; // 10 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-proj-qK9AVifTIOAoN1GnaIonT3BlbkFJJFOW6BOGYRhO9oMvYHNb'
            },
            body: JSON.stringify({
                "model": "text-davinci-003",
                "prompt": userInput,
                "max_tokens": 100
            }),
            signal: controller.signal
        });
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}
