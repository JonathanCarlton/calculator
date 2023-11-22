
let resultDiv = document.querySelector(".result");
let currentNumber = resultDiv.querySelector("p");
let nextAction = "";
let isCurrentNumberDecimal = false;


// event listener for button clicks
document.addEventListener('click', function (event) {
    // first check if it's a number button, then add clicked number to currentNumber
    if (event.target.matches(".number")) {
        updateCurrentNumber(event.target.value);
	}
    // check if current number is already a decimal before adding a decimal point
    if (event.target.matches(".decimal") && !isCurrentNumberDecimal) {
        addDecimal(event.target.value);
	}
    


    // check if it's a function button
    // if (event.target.matches(".function")) {
    //     // call the appropriate function
    //     // check if there is a nextAction
    //         // if theres a next action, then perform the action
    //         if (nextAction != ""){
    //             switch (nextAction) {
    //                 case "+":
    //                     memory = add(memory, currentNumber);
    //                     break;
    //                 case "-":
    //                     memory = subtract(memory, currentNumber);
    //                     break;
    //                 case "*":
    //                     memory = multiply(memory, currentNumber);
    //                     break;
    //                 case "/":
    //                     memory = divide(memory, currentNumber);
    //                     break;
    //                 // case "=":
    //                 //     memory = returnResult(memory, currentNumber);
    //                 //     break;
    //             }
    //             // perform next action with memory and current number, then update memory
    //             // if next action is "=" then display the new memory value in the results section
    //         }
    //         else {

    //         }
    //         // if not, then add the clicked button as the next action
    //     if (event.target.matches("#add")) {
    //         currentNumber += event.target.value;

    //     }
        

	// }
}, false);

// this will be used to store the previously entered number. Will be cleared when '=' button is pressed or 'C' button pressed

let memory;


// functions

function updateCurrentNumber(number){
    if (currentNumber.textContent === "0") {
        currentNumber.textContent = "";
    }
    // update the result field
    currentNumber.textContent += number;
    resultDiv.appendChild(currentNumber);
}
function addDecimal(decimal){
    // update the result field
    currentNumber.textContent += decimal;
    resultDiv.appendChild(currentNumber);
    isCurrentNumberDecimal = true;
}

function add(number1, number2){
    return number1 + number2;
}

function subtract(number1, number2){
    return number1 - number2;
}

function multiply(number1, number2){
    return number1 * number2;
}

function divide(number1, number2){
    return number1 / number2;
}

