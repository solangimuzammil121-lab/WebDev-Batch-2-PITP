// --- JAVASCRIPT LOGIC ---

        // 1. Create an array of possible answer (Classic +Fun/Sarcastic)
        const answers = [
            "It is certian.",
            "Yes definitely.",
            "Changes are good.",
            "Signs point to yes.",
            "My sources says no.",
            "Changes are not so good.",
            "Very doubtful.",
            "404 Error : Fate no found.",
            "Only if you a little dance first.",
            "You are about to die!.",
            "The satrs say ... meh.",
            "Ask your dog, they know better.",
            "Computer says no.",
            "I am on a coffe break, ask later.",
            "Yes , but you wou't like the consequences.",
            "You need to consult a docter.",
            "Your wifi connection to destiny is WeakMap.",
            "Fate is currently stuck...",
            "Changes are great ... for someone else.",
        ];

        // 2. Select the important HTML elements
        const getAnswerButton = document.querySelector("#get-answer-btn");
        const answerDisplay = document.querySelector("#answer");

        // 3. The function that runs on click
        function showRandomeAnswer() {
            const randomIndex = Math.floor(Math.random() * answers.length);
            const randomAnswer = answers[randomIndex];
            answerDisplay.textContent = randomAnswer;
        }
        // 4. We use the variable 'getAnswerButton' we defined above.
        getAnswerButton.addEventListener("click", showRandomeAnswer);