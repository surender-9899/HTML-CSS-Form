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
        firstName.nextElementSibling.style.paddingTop = "3px";
        isValid = false;
    }


    const dob = document.getElementById("D.O.B");
    if (dob.value.trim() === "") {
        console.error("D.O.B cannot be empty");
        dob.nextElementSibling.innerText = "! D.O.B cannot be empty";
        dob.nextElementSibling.style.display = "block";
        isValid = false;
        dob.nextElementSibling.style.paddingTop = "3px";
    }

    const email = document.getElementById("Email");
    if (email.value.trim() === "") {
        console.error("Email cannot be empty");
        email.nextElementSibling.innerText = "! Email cannot be empty";
        email.nextElementSibling.style.display = "block";
        isValid = false;
        email.nextElementSibling.style.paddingTop = "3px";
    }

    const password = document.getElementById("Password");
    if (password.value.trim() === "") {
        console.error("Password cannot be empty");
        password.nextElementSibling.innerText = "! Password cannot be empty";
        password.nextElementSibling.style.display = "block";
        isValid = false;
        password.nextElementSibling.style.paddingTop = "3px";   
    }

    const ConfirmPassword = document.getElementById("ConfirmPassword");
    if (ConfirmPassword.value.trim() === "") {
        console.error("Confirm Password cannot be empty");
        ConfirmPassword.nextElementSibling.innerText = "! Confirm Password cannot be empty";
        ConfirmPassword.nextElementSibling.style.display = "block";
        ConfirmPassword.nextElementSibling.style.paddingTop = "3px";
        isValid = false;
    }

    const Address = document.getElementById("Address Line 1");
    if (Address.value.trim() === "") {
        console.error("Address cannot be empty");
        Address.nextElementSibling.innerText = "! Address cannot be empty";
        Address.nextElementSibling.style.display = "block";
        Address.nextElementSibling.style.paddingTop = "3px";    
        isValid = false;
    }

    const number = document.getElementById("Number");
    if (number.value.trim() === "") {
        console.error("Phone Number cannot be empty");
        number.nextElementSibling.innerText = "! Phone Number cannot be empty";
        number.nextElementSibling.style.display = "block";
        number.nextElementSibling.style.paddingTop = "3px";
        isValid = false;
    }

    const gender = document.querySelector('input[name="Gender"]:checked');
    const genderError = document.querySelector('input[name="Gender"]').parentElement.querySelector("span");

    if (!gender) {
        console.error("Please select gender");
        genderError.innerText = "! Please select gender";
        genderError.style.display = "block";
        genderError.style.paddingTop = "3px";   
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
        termsError.style.paddingTop = "3px";
        isValid = false;
    }

    if (isValid) { 
        console.log("Form submitted successfully");
    }
});


// To Display the data in console 
// And to display the data on the htm page and store  in the session storage 
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

    let allUsers = JSON.parse(sessionStorage.getItem("users")) || [];

    allUsers.push(user);

    sessionStorage.setItem("users", JSON.stringify(allUsers));
    
   let displayText = `<table  class = "table">
        <thead>
            <tr>
                <th class = "tablegroup" >Field</th>
                <th class = "tablegroup" >Value</th>
            </tr>
        </thead>
        <tbody>`;

        allUsers.forEach(function(data) {
            for (let key in data) {
                displayText += `<tr>
                <td class = "tablegroup" >${key}</td>
                <td class = "tablegroup" >${data[key]}</td>
                </tr>`;
            }displayText += `<tr>
                <td colspan="2" style="padding: 8px;"></td>
                </tr>`;
    });

    displayText += `</tbody></table>`;

    document.getElementById("displayData").innerHTML = displayText;

    document.getElementById("myForm").reset();
});

