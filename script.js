let a = null;
let b = null;
let action = null;

let isExecuted = false;
let isReplace = true;
let isNewA = false;

const acBtn = document.getElementById("AllClear");
const bsBtn = document.getElementById("Backspace");
const commaBtn = document.getElementById("Comma");
const equalBtn = document.getElementById("Equal");
const psBtn = document.getElementById("PlusMinus");

const dispHist = document.querySelector(".display-hist");
const dispOperator = document.querySelector(".display-operator");
const dispInput = document.querySelector(".display-input");
const input0 = document.querySelector(".number-0");

const inputNumbers = document.querySelectorAll(".number");
const inputOperators = document.querySelectorAll(".operator");

acBtn.addEventListener("click", () => {
    a = null;
    b = null;
    isReplace = true;

    dispHist.textContent = "";
    dispOperator.textContent = "";
    dispInput.textContent = "";
});

bsBtn.addEventListener("click", () => {
    const val = dispInput.textContent.toString().trim();
    if (val.length == 2 && val[0] == "-") dispInput.textContent = "";
    else dispInput.textContent = val.slice(0, -1);
});

inputOperators.forEach((operator) => {
    operator.addEventListener("click", () => {
        isNewA = false;

        const currentVal = dispInput.textContent.trim();
        if (currentVal != "") {
            action = operator.textContent.trim();
            dispOperator.textContent = action;

            a = currentVal.trim();
            dispHist.textContent = a;
            isReplace = true;
        }
    });
});

inputNumbers.forEach((input) => {
    input.addEventListener("click", () => {
        newCalculation();

        const inputVal = input.textContent.trim();
        if (isReplace) {
            dispInput.textContent = inputVal;

            isReplace = false;
        } else dispInput.textContent = dispInput.textContent + inputVal;
    });
});

input0.addEventListener("click", () => {
    newCalculation();

    const text = dispInput.textContent.trim();
    if (text == "" || /[1-9]/.test(text) || /\./.test(text)) {
        if (isReplace) {
            dispInput.textContent = "0";
            if (action != null) isReplace = false;
        } else dispInput.textContent = dispInput.textContent + "0";
    }
});

commaBtn.addEventListener("click", () => {
    const text = dispInput.textContent.trim();
    if (!text.includes(".") && text != "") {
        dispInput.textContent = text + ".";
        isReplace = false;
    }
});

function computed() {
    let result;
    if (action == "+") {
        result = a + b;
    } else if (action == "-") {
        result = a - b;
    } else if (action == "×") {
        result = a * b;
    } else if (action == "÷") {
        result = a / b;
    }
    if (result % 1 != 0 && result.toString().split(".")[1]?.length > 5) {
        result = result.toFixed(5);
    }
    dispHist.textContent = `${a} ${action} ${b}`;
    dispOperator.textContent = "=";
    dispInput.textContent = result;

    isReplace = true;
    isNewA = true;

    a = result;
}

equalBtn.addEventListener("click", () => {
    if (!isReplace) {
        b = dispInput.textContent.trim();
        b = Number(b);
    }
    if (a != null && action != null && action != "" && typeof b === "number") {
        a = Number(a);
        computed();
    }
});

function newCalculation() {
    if (isNewA) {
        dispHist.textContent = "";
        dispOperator.textContent = "";

        a = null;
        action = null;
    }
}

psBtn.addEventListener("click", () => {
    let text = dispInput.textContent.trim();
    if (text != "" && !isReplace) {
        text = Number(text) * -1;

        dispInput.textContent = text;
    }
});
