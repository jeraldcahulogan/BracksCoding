//initailizing
const first_name = document.querySelector(".js-first-name");
const last_name = document.querySelector(".js-last-name");
const image_input = document.querySelector(".js-image");
const submit_btn = document.querySelector(".js-submit-btn");

//when submit button is clicked, add_user function is executed
submit_btn.addEventListener('click', () => {
    addu_user();
});


//function for inserting 
function addu_user() {
    // Get the values from the input fields and trim any extra spaces
    const my_firstname = first_name.value.trim();
    const my_lastname = last_name.value.trim();
    const file = image_input.files[0]; // Get the uploaded image file

    // Check if all fields (first name, last name, and image) are filled
    if (!my_firstname || !my_lastname || !file) {
        alert("Please fill in all fields."); // Alert the user if any field is missing
        return; // Stop the function if validation fails
    }

    // Create a new FileReader object to read the image file
    const reader = new FileReader();

    // When the file reading is completed, this function will execute
    reader.onloadend = function () {
        // The image is now converted to a Base64 string
        const base64Image = reader.result;

        // Add the new user's data (including the Base64 image) to the users array
        users.push({
            firstname: my_firstname,
            lastname: my_lastname,
            image: base64Image // Store the image as a Base64 string
        });

        // Save the updated users array to localStorage as a string
        localStorage.setItem('savedUsers', JSON.stringify(users));

        // Clear the input fields after saving the data
        first_name.value = '';  // Clear the first name input
        last_name.value = '';   // Clear the last name input
        image_input.value = ''; // Clear the file input
    };

    // Read the image file as a Base64-encoded data URL
    reader.readAsDataURL(file);
}


//array of object named "users" containing the user information
//json.parse was used to retrieve all the object stored in the localstorage named "savedUsers"
//if the localstorage is currently empty, a default value is given.
const users = JSON.parse(localStorage.getItem('savedUsers')) || [];


//function for displaying the user info in the webpage
function display_users() {
  let userHTML = ""; //varaible that will handle HTML code
    users.forEach((userList) => {
    userHTML += `
        <div class="user-profile-container">
        <div class="image-container">
            <img src="${userList.image}" alt="">
        </div>
        <p>${userList.lastname}, ${userList.firstname}</p>
        </div>
    `;
    });

    //varaible userHTML containing the created HTML code 
     //is being inserted to the main HTML file having a class of "grid-user-profile-container"
    document.querySelector(".grid-user-profile-container").innerHTML = userHTML;
}

// Display stored users on page load
display_users();
// window.onload = display_users;

// localStorage.clear();
