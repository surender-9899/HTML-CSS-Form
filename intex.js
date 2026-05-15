// To Validate Form Data and Display Errors in Console and on the HTML Page
const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    const errorSpans = document.querySelectorAll("span");
    errorSpans.forEach(function (span) {
        span.innerText = "";
        span.style.display = "none";
    });

    const firstName = document.getElementById("FirstName");
    if (firstName.value.trim() === "") {
        console.error("First Name cannot be empty");
        firstName.nextElementSibling.innerText = "! First Name cannot be empty";
        firstName.nextElementSibling.style.display = "block";
        isValid = false;
    }


    const dob = document.getElementById("D.O.B");
    if (dob.value.trim() === "") {
        console.error("D.O.B cannot be empty");
        dob.nextElementSibling.innerText = "! D.O.B cannot be empty";
        dob.nextElementSibling.style.display = "block";
        isValid = false;
    }

    const email = document.getElementById("Email");
    if (email.value.trim() === "") {
        console.error("Email cannot be empty");
        email.nextElementSibling.innerText = "! Email cannot be empty";
        email.nextElementSibling.style.display = "block";
        isValid = false;
    }

    const password = document.getElementById("Password");
    if (password.value.trim() === "") {
        console.error("Password cannot be empty");
        password.nextElementSibling.innerText = "! Password cannot be empty";
        password.nextElementSibling.style.display = "block";
        isValid = false;
    }

    const ConfirmPassword = document.getElementById("ConfirmPassword");
    if (ConfirmPassword.value.trim() === "") {
        console.error("Confirm Password cannot be empty");
        ConfirmPassword.nextElementSibling.innerText = "! Confirm Password cannot be empty";
        ConfirmPassword.nextElementSibling.style.display = "block";
        isValid = false;
    }

    const Address = document.getElementById("Address Line 1");
    if (Address.value.trim() === "") {
        console.error("Address cannot be empty");
        Address.nextElementSibling.innerText = "! Address cannot be empty";
        Address.nextElementSibling.style.display = "block";
        isValid = false;
    }

    const number = document.getElementById("Number");
    if (number.value.trim() === "") {
        console.error("Phone Number cannot be empty");
        number.nextElementSibling.innerText = "! Phone Number cannot be empty";
        number.nextElementSibling.style.display = "block";
        isValid = false;
    }

    const gender = document.querySelector('input[name="Gender"]:checked');
    const genderError = document.querySelector('input[name="Gender"]').parentElement.querySelector("span");

    if (!gender) {
        console.error("Please select gender");
        genderError.innerText = "! Please select gender";
        genderError.style.display = "block";
        genderError.style.fontSize = "10px";
        genderError.style.color = "red";
        isValid = false;
    }

    const terms = document.getElementById("terms");
    const termsError = terms.parentElement.querySelector("span");

    if (!terms.checked) {
        console.error("Please accept the terms");
        termsError.innerText = "! Please accept the terms";
        termsError.style.display = "block";
        termsError.style.fontSize = "10px";
        termsError.style.color = "red";
        isValid = false;
    }

    if (isValid) { 
        console.log("Form submitted successfully");
    }
});



// To Display Form Data as object[Key : Value] in Console
// document.getElementById("myForm").addEventListener("submit", function(event) {
//             event.preventDefault();

//             let formData = new FormData(this);

//             for (let [key, value] of formData.entries()) {
//                 console.log(key + ": " + value);
//             }
//             // for htlm page
//             let displayText = "";
//             for( let i = 0; i < form.elements.length; i++){
//                 let element = form.elements[i];
//                 if (element.type === 'submit' || element.type === 'reset' || element.type === "checkbox" || element.type === "radio") continue;

//                 let value = element.value;
//                 let id = element.id;

//                 if (id) {
//                     displayText += id + ": " + value + "\n";
//                     localStorage.setItem(id, JSON.stringify(value));
//                 }
//             }

//             const selectedGender = form.querySelector('input[name="Gender"]:checked');
//             if (selectedGender) {
//                 displayText += "Gender: " + selectedGender.value + "\n";
//                 localStorage.setItem("Gender", JSON.stringify(selectedGender.value));
//             }

//             document.getElementById("displayData").innerText = displayText;

//             // Commented out reset so later submit listeners can still read the form values
//             document.getElementById("myForm").reset();
// });


//  //TO Display Form Data as Object[Key : Value] on the HTML Page
// let result = document.getElementById("result");
// document.getElementById("myForm").addEventListener("submit",function(event){
//     event.preventDefault();
//     let displayText = "";
//                 for( let i = 0; i < form.elements.length; i++){
//                     let element = form.elements[i];
//                     if (element.type === 'submit' || element.type === 'reset' || element.type === "checkbox" || element.type === "radio") continue;

//                     let value = element.value;
//                     let id = element.id;

//                     if (id) {
//                         displayText += id + ": " + value + "\n";
//                     }
//                 }

//                 const selectedGender = form.querySelector('input[name="Gender"]:checked');
//                 if (selectedGender) {
//                     displayText += "Gender: " + selectedGender.value + "\n";
//                 }

//                 document.getElementById("displayData").innerText = displayText;
//                 document.getElementById("myForm").reset();
        
    
// });


document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    for (let [key, value] of formData.entries()) {
        console.log(key + ": " + value);
    }
    let user = {};

    for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];

        if (element.type === "submit" ||element.type === "reset" ||element.type === "checkbox" ||element.type === "radio") continue;

        let value = element.value;
        let id = element.id;

        if (id) {
            user[id] = value;
        }
    }

    const selectedGender = form.querySelector('input[name="Gender"]:checked');
    if (selectedGender) {
        user["Gender"] = selectedGender.value;
    }

    // get old data
    let allUsers = JSON.parse(sessionStorage.getItem("users")) || [];

    // add new user
    allUsers.push(user);

    // save again
    sessionStorage.setItem("users", JSON.stringify(allUsers));

    // display all submitted users
    let displayText = "";

    allUsers.forEach(function(data, index) {

        for (let key in data) {
            displayText += key + ": " + data[key] + "\n";
        }

        displayText += "----------------------\n";
    });

    document.getElementById("displayData").innerText = displayText;

    document.getElementById("myForm").reset();
});