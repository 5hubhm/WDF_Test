const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentExpression = "";

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

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "Escape") { 
        clearDisplay();
    } else if (key === "Backspace") {
        deleteLastCharacter();
    } else if (key === "Enter" || key === "=") { 
        calculateResult();
    } else if ("0123456789+-*/.".includes(key)) { 
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

clearDisplay();
