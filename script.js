const display = document.getElementById("display");

function appendNumber(number) {
    if (display.value === "0" && number !== ".") {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const lastCharacter = display.value.slice(-1);

    if ("+-*/".includes(lastCharacter)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
}

function calculate() {
    try {
        const result = Function('"use strict"; return (' + display.value + ')')();

        if (!Number.isFinite(result)) {
            throw new Error("Resultado no válido");
        }

        display.value = result;
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1000);
    }
}

// Permite utilizar el teclado.
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/^[0-9.]$/.test(key)) {
        appendNumber(key);
    } else if ("+-*/".includes(key)) {
        appendOperator(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "Backspace") {
        deleteLast();
    }
});
