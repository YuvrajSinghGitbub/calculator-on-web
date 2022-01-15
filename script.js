const numButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equlasButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const prevDisplay = document.querySelector("[data-prev-operand]");
const currDisplay = document.querySelector("[data-curr-operand]");

class Calculator {
    constructor(currentOperandTE, previousOperandTE) {
        this.currOperandTE = currentOperandTE;
        this.prevOperandTE = previousOperandTE;
        this.allClear();
    }

    allClear() {
        this.currOperand = "";
        this.prevOperand = "";
        this.operation = undefined;
    }

    deleteNumber() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currOperand.includes(".")) return;
        this.currOperand += number.toString();
    }

    chooseOperation(operation) {
        if (this.currOperand === "") return;
        if (this.prevOperand !== "") {
            this.compute();
        }

        this.operation = operation
        this.prevOperand = this.currOperand;
        this.currOperand = "";
    }

    // add a helper function that is going to format the numbers
    // use the Intl object and its NumberFormat method for the purpose.
    formatNumber(number) {
        if (number === "") return ""
        return new Intl.NumberFormat("en-US").format(number);
    }

    updateDisplay() {
        // this.currOperandTE.innerText = this.currOperand;
        this.currOperandTE.innerText = this.formatNumber(this.currOperand);

        if (this.operation != null) {
            // this.prevOperandTE.textContent = `${this.prevOperand} ${this.operation}`;
            this.prevOperandTE.textContent = `${this.formatNumber(this.prevOperand)} ${this.operation}`;
        }
        else {
            this.prevOperandTE.textContent = ""
        }
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case "+":
                computation = prev + curr;
                break;

            case "-":
                computation = prev - curr;
                break;

            case "*":
                computation = prev * curr;
                break;

            case "÷":
                computation = prev / curr;
                break;

            default:
                return
        }

        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = "";
    }
}

let calculator = new Calculator(currDisplay, prevDisplay);

numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    });
});

equlasButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
    calculator.allClear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.deleteNumber();
    calculator.updateDisplay();
});