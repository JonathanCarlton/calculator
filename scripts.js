
let displayDiv = document.querySelector(".result");

let clearButton = document.querySelector("#clear");

let display = displayDiv.querySelector("p");
let displayValue = "";
let operand = "";
let memory = "";

// event listener for button clicks
document.addEventListener('click', function (event) {
    // first check if it's a number button, then add clicked number to currentNumber
    if (event.target.matches(".number")) {
        // if display matches memory, then clear it and update display value and current value (This is usually after an operand is selected)
        if ( display.textContent === memory.toString() || displayValue === ""){
            displayValue = event.target.value;
        }
        else {
            displayValue += event.target.value; //increment the value for display
        }
        updateDisplay(displayValue); // update dispaly with new value
	}
    // check if current number is already a decimal before adding a decimal point
    if (event.target.matches(".decimal") && !display.textContent.includes(".")){
        displayValue += "."
        updateDisplay(displayValue);
	}
    
    // check if it's a function button
    if (event.target.matches(".function")) {
        if (memory != "" || displayValue != "" ){
            // call the appropriate function
            // check if there is a nextAction
            // if theres a next action, then perform the action

            if (event.target.value === "="){
                if (operand != "" && displayValue != "" && memory != ""){
                    memory = calculateResult(parseFloat(memory), operand, parseFloat(displayValue));
                    updateDisplay(memory);
                    document.querySelector(".active").classList.remove("active"); // remove the current active indicator
                    // reset operand and display value, store memory of result
                    displayValue = "";
                    operand = "";
                }
            }
            else { 
                // this runs if an operand is clicked

                // if operand is clicked, then check if there is a value in memory, if there is a value in memory then we need to 
                // if operand is clicked, check if there is a value in displayValue, if not we dont want to run a calculation, we want to allow user to 
                    // enter a new value 
                if (memory != "" && displayValue != ""){ // memory=true, displayValue=true, operand=true;
                    // operate
                    memory = calculateResult(parseFloat(memory), operand, parseFloat(displayValue));
                    // update Number field with value in memory
                    updateDisplay(memory);                
                    // update nextAction
                    operand = event.target.value;
                    // remove current active button indicator
                    // if there is an active button, clear it
                    if (document.querySelector(".active")) {
                        document.querySelector(".active").classList.remove("active"); // remove the current active indicator
                    }
                    // add indicator to this button instead
                    event.target.classList.add("active");
                    displayValue = "";
                }
                else if (memory != "" && displayValue === ""){ // memory=true, displayValue=false, operand=false;
                    // allow user to enter in a new display value
                    operand = event.target.value;
                    event.target.classList.add("active");
                }
                else { // memory=false, displayValue=true, operand=false;
                    // enter displayValue into memory, set the operand Value and clear DisplayValue so user can enter another number
                    operand = event.target.value;
                    // memory
                    memory = displayValue;
                    // set active action indicator
                    event.target.classList.add("active");
                    // reset currentValue
                    displayValue = "";
                }
            }
        }
	}
    // check if clear is click, if there is already a number in memory, then 
    if (event.target.matches("#clear")) {
        clear(clearButton.textContent);
    }
    if (clearButton.textContent != "C" && (displayValue != "" || display.textContent != "0")){ // if there is a current value and display is showing something 
        clearButton.textContent = "C";
    }
}, false);

function updateDisplay(number){
    // if display is 0, then set display to the passed in number
    // else append the passed in number to the displayValue, and 
    if (number === "You can't divide by 0!"){
        display.textContent = number;
        memory = "";
        operand = "";
        displayValue = "";
    }
    else if (number === memory) {
        roundedNumber = Math.round(number*10000000)/10000000; // round number to 7 decimal places if needed
        display.textContent = roundedNumber;
    }
    else {
        display.textContent = number;
    }
    displayDiv.appendChild(display);
}

function clear(buttonValue){
    if (buttonValue === "AC"){
        memory = "";
        // remove any operand and its highlight
        operand = "";
        if (document.querySelector(".active")) {
            document.querySelector(".active").classList.remove("active"); // remove the current active indicator
        }
    }
    if (memory != "") {
        clearButton.textContent = "AC";
    }
    displayValue = "";
    updateDisplay("0")
}

function calculateResult(number1, action, number2) {
    let result = 0;
    switch (action) {
        case "+":
            result = add(number1, number2);
            break;
        case "-":
            result = subtract(number1, number2);
            break;
        case "*":
            result = multiply(number1, number2);
            break;
        case "/":
            if (number2 === 0){
                return "You can't divide by 0!"
            }
            result = divide(number1, number2);
            break;
    }
    return result;
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

