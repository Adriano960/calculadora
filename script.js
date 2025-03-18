let display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons .btn');

let currentInput = '';
let operator = '';
let previousInput = '';

function updateDisplay() {
    display.innerText = currentInput || '0';
}

function appendNumber(number) {
    if (currentInput.includes('.') && number === '.') return;
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && op !== '-') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function appendFunction(func) {
    let result;
    const current = parseFloat(currentInput);
    if (isNaN(current)) return;
    switch (func) {
        case 'sin':
            result = Math.sin(current);
            break;
        case 'cos':
            result = Math.cos(current);
            break;
        case 'tan':
            result = Math.tan(current);
            break;
        case 'asin':
            result = Math.asin(current);
            break;
        case 'acos':
            result = Math.acos(current);
            break;
        case 'atan':
            result = Math.atan(current);
            break;
        case 'sqrt':
            result = Math.sqrt(current);
            break;
        case 'pow':
            result = Math.pow(current, 2); // Exemplo: eleva ao quadrado
            break;
        case 'log':
            result = Math.log10(current);
            break;
        case 'ln':
            result = Math.log(current);
            break;
        case 'exp':
            result = Math.exp(current);
            break;
        case 'pi':
            result = Math.PI;
            break;
        case 'fact':
            result = factorial(current);
            break;
        default:
            return;
    }
    currentInput = result.toString();
    updateDisplay();
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Função para adicionar um número ou vírgula ao display
function addToDisplay(value) {
    const display = document.getElementById('display');
    if (value === '.' && display.value.includes('.')) {
        return; // Evita adicionar mais de uma vírgula
    }
    display.value += value;
}

// Função para inicializar a calculadora
function initCalculator() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            addToDisplay(value);
        });
    });

    // Adiciona o evento para o botão de vírgula
    const commaButton = document.getElementById('comma');
    commaButton.addEventListener('click', () => {
        addToDisplay('.');
    });
}

// Inicializa a calculadora quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initCalculator);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(value)) {
            appendOperator(value);
        } else if (value === 'DEL') {
            deleteLast();
        } else if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'pow', 'log', 'ln', 'exp', 'π', 'n!'].includes(value)) {
            appendFunction(value);
        } else {
            appendNumber(value);
        }
    });
});
