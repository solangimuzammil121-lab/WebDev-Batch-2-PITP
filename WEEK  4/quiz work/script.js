const correctAnswers = {
    q1: 'C',
    q2: 'A',
    q3: 'B',
};

function calculateScore() {
    let score = 0;
    const totalQuestions = 3;
    const resultDiv = document.getElementById('result');

    // We specifically target only the inputs that are currently ':checked'
    const userAnswers = document.querySelectorAll('input[type="radio"]:checked');

    // Use a forEach loop to iterate over the answers 
    userAnswers.forEach((answer) => {
        const questionName = answer.name;

        if(answer.value === correctAnswers[questionName]) {
            score++;
            answer.parentElement.style.color = 'green';
            answer.parentElement.style.fontWeight = 'bold';
        } else {
            answer.parentElement.style.color = 'red';
        }

    });
    let feedbackMessage = '';
    if (score === totalQuestions) {
        feedbackMessage = `Amazing! You got a perfect score!`;
    } else if (score >= 1) {
        feedbackMessage = `Not Bad! Kee Studying.`;
    } else {
        feedbackMessage = `Time To Hit The Books Again.`;
    }

    resultDiv.innerHTML = `
    <h3> Your Results</h3>
    <p> You Scored <strong>${score}</strong> out of <strong>${totalQuestions}</strong>.</p>
    <p><em>${feedbackMessage}</em></p>
    `;
}