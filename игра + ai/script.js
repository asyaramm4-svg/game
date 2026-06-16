let score = 0;
let currentEquation = {};

function generateQuadraticEquation() {
    let a, b, c, discriminant;
    do {
        a = Math.floor(Math.random() * 5) + 1;
        b = Math.floor(Math.random() * 20) - 10;
        c = Math.floor(Math.random() * 15) - 7;
        discriminant = b * b - 4 * a * c;
    } while (discriminant < 0);

    const sqrtD = Math.sqrt(discriminant);
    const x1 = (-b + sqrtD) / (2 * a);
    const x2 = (-b - sqrtD) / (2 * a);

    currentEquation = { a, b, c, x1, x2, discriminant };

    const signB = b >= 0 ? '+' : '-';
    const absB = Math.abs(b);
    const signC = c >= 0 ? '+' : '-';
    const absC = Math.abs(c);

    document.getElementById('equation').textContent = 
        `${a}x² ${signB} ${absB}x ${signC} ${absC} = 0`;

    document.getElementById('x1').value = '';
    document.getElementById('x2').value = '';
}

function checkAnswer() {
    const userX1 = parseFloat(document.getElementById('x1').value);
    const userX2 = parseFloat(document.getElementById('x2').value);
    const feedback = document.getElementById('feedback');

    if (isNaN(userX1) || isNaN(userX2)) {
        feedback.textContent = 'Введи оба корня!';
        feedback.style.color = 'orange';
        return;
    }

    const eps = 0.1;
    const match1 = Math.abs(userX1 - currentEquation.x1) < eps || Math.abs(userX1 - currentEquation.x2) < eps;
    const match2 = Math.abs(userX2 - currentEquation.x1) < eps || Math.abs(userX2 - currentEquation.x2) < eps;

    if (match1 && match2) {
        feedback.textContent = 'Правильно! Молодец!';
        feedback.style.color = 'green';
        score++;
        document.getElementById('score').textContent = `Счёт: ${score}`;
        generateQuadraticEquation();
    } else {
        feedback.textContent = `Неверно. Попробуй ещё раз.`;
        feedback.style.color = 'red';
    }
}

function getAIHelp() {
    const aiPanel = document.getElementById('ai-panel');
    const aiChat = document.getElementById('ai-chat');
    aiPanel.style.display = 'block';

    const { a, b, c, x1, x2, discriminant } = currentEquation;
    const signB = b >= 0 ? '+' : '-';
    const absB = Math.abs(b);
    const signC = c >= 0 ? '+' : '-';
    const absC = Math.abs(c);

    const solutionText = `
Решаем уравнение: ${a}x² ${signB} ${absB}x ${signC} ${absC} = 0

1. Находим дискриминант:
   D = b² − 4ac = ${b}² − 4·${a}·${c} = ${discriminant}

2. Так как D ≥ 0, есть два (или один) действительных корня:
   x₁ = (−b + √D) / 2a = (−${b} + √${discriminant}) / ${2 * a} ≈ ${x1.toFixed(1)}
   x₂ = (−b − √D) / 2a = (−${b} − √${discriminant}) / ${2 * a} ≈ ${x2.toFixed(1)}

Ответ: x₁ ≈ ${x1.toFixed(1)}, x₂ ≈ ${x2.toFixed(1)}.
    `.trim();

    aiChat.innerHTML = `<div class="ai-message">${solutionText}</div>`;
}

function closeAI() {
    document.getElementById('ai-panel').style.display = 'none';
}

window.onload = generateQuadraticEquation;
