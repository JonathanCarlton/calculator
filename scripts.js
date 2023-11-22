
let resultDiv = document.querySelector(".result");
let currentNumber = resultDiv.querySelector("p");
let nextAction = "";
let isCurrentNumberDecimal = false;
let memory = 0;


// event listener for button clicks
document.addEventListener('click', function (event) {
    // first check if it's a number button, then add clicked number to currentNumber
    if (event.target.matches(".number")) {

        // check if currentNumber is populated and if nextAction is not "";
        if ( parseInt(currentNumber.textContent) === memory){
            currentNumber.textContent = "0";
        }
        updateCurrentNumber(event.target.value);
        
	}
    // check if current number is already a decimal before adding a decimal point
    if (event.target.matches(".decimal") && !isCurrentNumberDecimal) {
        addDecimal(event.target.value);
	}

    // check if clear is click, if there is already a number in memory, then 
    if (event.target.value === "c") {
        clear();
    }
    if (event.target.value === "ac") {
        clear(true);
    }
    
    // check if it's a function button
    if (event.target.matches(".function")) {
        // call the appropriate function
        // check if there is a nextAction
        // if theres a next action, then perform the action

        if (event.target.value === "="){
            if (nextAction != ""){
                // perform the correct action on the memory and currentNumber
                memory = calculateResult(memory, nextAction, parseFloat(currentNumber.textContent));
                clear();
                updateCurrentNumber(memory);
                document.querySelector(".active").classList.remove("active"); // remove the current active indicator
                nextAction = "";
            }
        }
        else { // run this for all other function  buttons
            if (nextAction != ""){
                switch (nextAction) {
                    case "+":
                        memory = add(memory, parseFloat(currentNumber.textContent));
                        // clear numberField
                        clear();
                        updateCurrentNumber(memory);
                        // remove current active button indicator
                        activeButton.classList.remove("active");
                        // add indicator to this button instead
                        event.target.classList.remove("active");
                        break;

                    case "-":
                        memory = subtract(memory, parseFloat(currentNumber.textContent));
                        // clear numberField
                        clear();
                        updateCurrentNumber(memory);
                        // remove current active button indicator
                        activeButton.classList.remove("active");
                        // add indicator to this button instead
                        event.target.classList.remove("active");
                        break;

                    case "*":
                        memory = multiply(memory, parseFloat(currentNumber.textContent));
                        // clear numberField
                        clear();
                        updateCurrentNumber(memory);
                        // remove current active button indicator
                        activeButton.classList.remove("active");
                        // add indicator to this button instead
                        event.target.classList.remove("active");
                        break;

                    case "/":
                        memory = divide(memory, parseFloat(currentNumber.textContent));
                        // clear numberField
                        clear();
                        updateCurrentNumber(memory);
                        // remove current active button indicator
                        activeButton.classList.remove("active");
                        // add indicator to this button instead
                        event.target.classList.remove("active");
                        break;
    
                }
                // perform next action with memory and current number, then update memory
                // if next action is "=" then display the new memory value in the results section
            }
            else {
                nextAction = event.target.value;
                memory = parseFloat(currentNumber.textContent);
                event.target.classList.add("active");
                console.log(nextAction);
                console.log(memory);
            }
        }
	}
}, false);

// functions

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
            result = divide(number1, number2);
            break;
    }
    return result;
}

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

function clear(clearAll=false){
    if (clearAll){
        memory = 0;
    }
    currentNumber.textContent = 0;
    resultDiv.appendChild(currentNumber);
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

