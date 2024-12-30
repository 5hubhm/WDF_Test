document.addEventListener("DOMContentLoaded", () => {
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
});
