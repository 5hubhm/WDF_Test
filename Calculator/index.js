const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("history-list");

let currentExpression = "";
let history = [];

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value === "C") {
            clearDisplay();
        } else if (value === "del") {
            deleteLastCharacter();
        } else if (value === "=") {
            calculateResult();
        } else {
            appendToExpression(value);
        }
    });
});

// Keyboard input handler
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "Escape") { // Clear (C)
        clearDisplay();
    } else if (key === "Backspace") { // Delete last character (del)
        deleteLastCharacter();
    } else if (key === "Enter" || key === "=") { // Calculate result
        calculateResult();
    } else if ("0123456789+-*/.".includes(key)) { // Valid input
        appendToExpression(key);
    }
});

function clearDisplay() {
    currentExpression = "";
    updateDisplay();
}

function deleteLastCharacter() {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    try {
        const result = eval(currentExpression);
        currentExpression = result.toString();
        updateDisplay();
        addToHistory(currentExpression); // Save result to history
    } catch (error) {
        currentExpression = "Error";
        updateDisplay();
        setTimeout(() => clearDisplay(), 1500);
    }
}

function appendToExpression(value) {
    if (value === "=" || value === "C" || value === "del") return;
    currentExpression += value;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentExpression || "0";
}

// Add result to history
function addToHistory(result) {
    if (history.length >= 2) {
        history.pop(); // Remove the last history item if there are already two
    }
    history.unshift(result); // Add the new result to the top
    updateHistoryDisplay();
}

// Update the history display
function updateHistoryDisplay() {
    historyList.innerHTML = ''; // Clear existing history

    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.textContent = item;
        historyList.appendChild(historyItem);
    });
}

clearDisplay();
