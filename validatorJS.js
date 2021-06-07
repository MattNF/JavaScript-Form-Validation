// Declaring Variables
let divReg = "";
let divMain = "";
let validCounter = 0;
let invalidCounter = 0;
let debugBool = false; // Debug variable. Set to true to turn on debug alerts.

// Adding an event listener for when the DOM loads
// Assigns functions to focus and blur events
window.addEventListener("DOMContentLoaded", function(){
    if (debugBool) { alert("DOMContentLoaded"); } // Debug Print
    divReg = document.getElementById("divRegistered");
    divMain = document.getElementById("divMain");
    divMain.addEventListener("focus", fHandleEnter, true);
    divMain.addEventListener("blur", fHandleExit, true);
    fProcessForm();
    // Select all input elements and assign into inputElements
    let inputElements = document.querySelectorAll("#frmRegister input[type=text], input[type=password]");
    // Select all span elements and assign into spanElements
    let spanElements = document.querySelectorAll("span");
    // optional for loop to show the elements in the array
    if (debugBool) { 
        for (let i = 0; i < inputElements.length; i++) {
        alert("Input elements = " + inputElements[i]);  
        }
    } 
    if (debugBool) { 
        for (let i = 0; i < spanElements.length; i++) {
        alert("Span elements = " + spanElements[i]);  
        }
    } 
    // Event listeners for the input elements
    inputElements[2].addEventListener("blur", function(){ fCompareInput(inputElements[1].value, inputElements[2].value, spanElements[2]); });
    inputElements[4].addEventListener("blur", function(){ fCompareInput(inputElements[3].value, inputElements[4].value, spanElements[4]); });
    // Event listener to check for login validity
    inputElements[0].addEventListener("input", function(){ fCheckLogin(inputElements[0].value, spanElements[0]); });
    // Event listener to check for email validity
    inputElements[3].addEventListener("blur", function(){ fCheckEmail(inputElements[3].value, spanElements[3]); });
    // Event listener to check for password validity
    inputElements[1].addEventListener("input", function(){ fCheckPassword(inputElements[1].value, spanElements[1]); });
});

// Function that changes background color on entering element
function fHandleEnter(e){
    if (debugBool) { alert("fHandleEnter Invoked"); } // Debug Print
    e.target.style.backgroundColor = "yellow";
}

// Function that removes background color on leaving element
function fHandleExit(e){
    if (debugBool) { alert("fHandleExit Invoked"); } // Debug Print
    e.target.style.backgroundColor = "#fff";
}

// Processing the form and displaying the registration message
function fProcessForm(){
    if (debugBool) { alert("fProcessForm Invoked"); } // Debug Print
    // Retrieve the querystring and parse with RegEx
    let strQueryString = location.search;
    let str = strQueryString.replace(/\?\w+=/i, " ");
    if (debugBool) { alert(str); } // Debug Print
    // Checking string length to see if form was processed 
    // Shows or hides elements depending on if it was or wasn't
    if (str.length > 0) {
        if (debugBool) { alert("STRLENGTHPOS"); } // Debug Print
        let login = str;
        divReg.innerHTML = "Thank you, " + login + ", you are now registered.";
        divMain.style.display = "none";
        jQuery("#divRegistered").fadeIn(2000);
    } else if (str.length === 0) {
        if (debugBool) { alert("STRLENGTHZERO"); } // Debug Print
        divReg.style.display = "none";
        divMain.style.display = "block";
    }
}

// Function to compare inputs
function fCompareInput(value1, value2, display){
    if (debugBool) { alert("fCompareInput Invoked"); } // Debug Print
    if (value1.length == 0 || value2.length == 0) {
        display.innerHTML = "";
        display.style = "";
    } else if (value1 == value2) {
        display.innerHTML = "Entries match";
        display.style.backgroundColor = "green";
    } else if (value1 !== value2) {
        display.innerHTML = "Entries do not match";
        display.style.backgroundColor = "red";
    }

}

// Function to check login
function fCheckLogin(login, loginDisplay){
    /* 
    RegEx to check for appropriate login.
    Login must have a minimum of 4 and maximum of 12 alphanumeric and underscore
    characters.
    */
    if (debugBool) { alert("fCheckLogin Invoked"); } // Debug Print
    let pattern = /^\w{4,}/i; // Setting up the Regular Expression

    // If login is valid:
    if (pattern.test(login) === true) {
        loginDisplay.innerHTML = login.length;
        loginDisplay.style.backgroundColor = "green";
        // Appends the invalid names to a list which is shown in a div tag
        let valTxt = document.getElementById("valNamesTxt");
        // This ensures that "Invalid Names:" is only created once. Counter is a global variable to ensure it doesn't get changed back.
        if (validCounter === 0) {
            let addPElementValid = document.createElement("p");
            addPElementValid.innerHTML = ("Valid Names:");
            valTxt.appendChild(addPElementValid);
            validCounter = 1;
        } 
        let val = document.getElementById("valNames");
        let addPElementValid2 = document.createElement("li");
        addPElementValid2.style.fontSize = "16px";
        addPElementValid2.style.color = "green";
        addPElementValid2.innerHTML = login;
        val.appendChild(addPElementValid2);
    }

    // If login is invalid:
    if ((pattern.test(login) === false) || (login.length > 12)) {
        loginDisplay.innerHTML = login.length;
        loginDisplay.style.backgroundColor = "red";
        // Appends the invalid names to a list which is shown in a div tag
        let inValTxt = document.getElementById("inValNamesTxt");
        // This ensures that "Invalid Names:" is only created once. Counter is a global variable to ensure it doesn't get changed back.
        if (invalidCounter === 0) {
            let newPinVal = document.createElement("p");
            newPinVal.innerHTML = ("Invalid Names:");
            inValTxt.appendChild(newPinVal);
            invalidCounter = 1;
        } 
        let inVal = document.getElementById("inValNames");
        let newPinVal2 = document.createElement("li");
        newPinVal2.style.fontSize = "16px";
        newPinVal2.style.color = "red";
        newPinVal2.innerHTML = login;
        inVal.appendChild(newPinVal2);
    }
}
// Function to check email
function fCheckEmail(email, emailDisplay){
    /* 
    RegEx to match an appropriate email address.
    Email must have at least 3 characters before the @
    as well as the @ itself. The domain must have 3 characters as well
    and it checks for the 5 most popular top-level domains (more could be added).
    */
   if (debugBool) { alert("fCheckEmail Invoked"); } // Debug Print
    let pattern = /\w{3}@\w{3}(\.com)|(\.net)|(\.gov)|(\.info)|(\.de)|(\.uk)/ig; 
    if (pattern.test(email) === true) {
        emailDisplay.innerHTML = "Valid email";
        emailDisplay.style.backgroundColor = "green";
    } else if (pattern.test(email) === false) {
        emailDisplay.innerHTML = "Invalid email";
        emailDisplay.style.backgroundColor = "red";
    }
}

function fCheckPassword(password, passwordDisplay){
    /* RegEx to check for an appropriate email. Checks for an uppercase letter,
    a numeric character, and a special character and length. */
    if (debugBool) { alert("fCheckPassword Invoked"); } // Debug Print
    let patternUpper = /[A-Z]/g; // Require uppercase letter
    let patternNumeric = /\d/g; // Require number
    let patternSpecial = /(\W)|(_)/g; // Require special character, exception for underscore
    let minLength = 6; // Minimum password length
    let complexityCounter = 0; // Count the level of complexity
    if (patternUpper.test(password) === true) {
        complexityCounter++;
    }
    if (patternNumeric.test(password) === true) {
        complexityCounter++;
    }
    if (patternSpecial.test(password) === true) {
        complexityCounter++;
    }
    if (password.length >=  minLength) {
        complexityCounter++;
    }
    passwordDisplay.style.color = "black"; // Make text more readable
    // Switch the span text depending on the password complexity level
    switch(complexityCounter){
        case 1:
            passwordDisplay.innerHTML = "Weak";
            passwordDisplay.style.backgroundColor = "orange";
            break;
        case 2:
            passwordDisplay.innerHTML = "Medium";
            passwordDisplay.style.backgroundColor = "yellow";
            break;
        case 3:
            passwordDisplay.innerHTML = "Strong";
            passwordDisplay.style.backgroundColor = "green";
            break;
        case 4:
            passwordDisplay.innerHTML = "Very Strong";
            passwordDisplay.style.backgroundColor = "yellowgreen";
            break;
        default:
            passwordDisplay.innerHTML = "Very Weak";
            passwordDisplay.style.backgroundColor = "red";
            break;
    }
}