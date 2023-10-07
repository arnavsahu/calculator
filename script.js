let val = "";
let sign = "";

function addNumber(number) {
    val += number;
    updateDisplay();
}

function addSign(operator) {
    if (val === "" && sign !== "" && ["+", "-", "*", "/"].includes(sign.slice(-1))) {
        sign = sign.slice(0, -1);
        sign += operator;
    } else {
        sign += val + operator;
        val = "";
    }
    updateDisplay();
}

function calculate() {
    let result = 0;
    if (val !== "") {
        sign += val;
        val = "";
    }
    result = evaluate(sign)
    val = result.toString();
    sign = "";
    updateDisplay();
}

function clearAll() {
    val = "";
    sign = "";
    updateDisplay();
}

function evaluate(operation) {
    const elements = operation.split(/([+\-*/])/);
    const numbers = [];
    const operators = [];

    function operate(a, b, operator) {
        if (operator === "+") {
            return a + b;
        } else if (operator === "-") {
            return b - a;
        } else if (operator === "*") {
            return a * b;
        } else if (operator === "/") {
            return b / a;
        }
    }

    for (const element of elements) {
        if (element === " ") {
            continue;
        }
        if (element === "+" || element === "-") {
            while (operators.length && ["+", "-", "*", "/"].includes(operators[operators.length - 1])) {
                let num1 = numbers.pop();
                let num2 = numbers.pop();
                let sgn = operators.pop();
                numbers.push(operate(num1, num2, sgn));
            }
            operators.push(element);
            //put mult after div here in stack
        } else if (element === "/" || element === "*") {
            while (operators.length && ["/", "*"].includes(operators[operators.length - 1])) {
                let num1 = numbers.pop();
                let num2 = numbers.pop();
                let sgn = operators.pop();
                numbers.push(operate(num1, num2, sgn));
            }
            operators.push(element);
        } else {
            numbers.push(parseFloat(element));
        }
    }
    while (operators.length) {
        let num1 = numbers.pop();
        let num2 = numbers.pop();
        let sgn = operators.pop();
        numbers.push(operate(num1, num2, sgn));
    }
    return numbers[0];
}

function updateDisplay() {
    const display = document.getElementById("display");
    display.value = sign + val;
}
