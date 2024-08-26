// //5i - 5n
// const numbersToSolve = document.getElementById("numbersToSolve");
// const result = document.getElementById("result");
// const one = document.getElementById("one");
// const two = document.getElementById("two");
// const three = document.getElementById("three");
// const four = document.getElementById("four");
// const five = document.getElementById("five");
// const six = document.getElementById("six");
// const seven = document.getElementById("seven");
// const eight = document.getElementById("eight");
// const nine = document.getElementById("nine");
// const zero = document.getElementById("zero");
// const dot = document.getElementById("dot");

// const plus = document.getElementById("plus");
// const minus = document.getElementById("minus");
// const multiply = document.getElementById("multiply");
// const divide = document.getElementById("divide");

// const equal = document.getElementById("equal");
// const resetBtn = document.getElementById("resetBtn");

// let resultValue = localStorage.getItem('equalsValue') || '';

// // numbersToSolve.textContent = `${resultValue}`;

// function addClickListener(button, value) {
//     button.onclick = function() {
//         resultValue += value;
//         numbersToSolve.textContent = `${resultValue}`;
//         result.textContent = '';
//     };
// }

// addClickListener(one, '1');
// addClickListener(two, '2');
// addClickListener(three, '3');
// addClickListener(four, '4');
// addClickListener(five, '5');
// addClickListener(six, '6');
// addClickListener(seven, '7');
// addClickListener(eight, '8');
// addClickListener(nine, '9');
// addClickListener(zero, '0');
// addClickListener(dot, '.');

// addClickListener(plus, ' + ');
// addClickListener(minus, ' - ');
// addClickListener(multiply, ' * ');
// addClickListener(divide, ' / ');

// equal.onclick = function() {
//     resultValue = eval(resultValue);
//     result.textContent = `${resultValue}`;
//     numbersToSolve.textContent = '';
//     localStorage.setItem('equalsValue', resultValue);
//     console.log(localStorage.getItem('equalsValue'));
// };

// resetBtn.onclick = function(){
//     localStorage.removeItem('equalsValue');
//     result.textContent = '0';
//     numbersToSolve.textContent = `${resultValue = ''}`;
//     console.log(localStorage.getItem('equalsValue'));
// }


const buttons = [...document.querySelectorAll("button")];
const display = document.getElementById("numbersToSolve");
const result = document.getElementById("result");
let expression = localStorage.getItem('equalsValue') || '';

buttons.forEach(button => button.onclick = () => {
    if (button.id === 'equals') {
        expression = eval(expression);
        result.textContent = expression;
        display.textContent = '';
        localStorage.setItem('equalsValue', expression);
    } else if (button.id === 'resetBtn') {
        localStorage.removeItem('equalsValue');
        expression = '';
        result.textContent = '0';
        display.textContent = '';
    } else if (button.id === 'del') {
        expression = expression.slice(0, -1); // Remove last character
        display.textContent = expression;
    } else if (button.id === 'percent') {
        if (expression) {
            expression = String(eval(expression) / 100); // Calculate percentage
            display.textContent = expression;
        }
    } else {
        expression += button.textContent.trim();
        display.textContent = expression;
        result.textContent = '';
    }
});

