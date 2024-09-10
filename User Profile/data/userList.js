//initailizing
const first_name = document.querySelector(".js-first-name");
const last_name = document.querySelector(".js-last-name");
const image_input = document.querySelector(".js-image");


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//function for inserting 
export function add_user() {
    const my_firstname = first_name.value.trim();   
    const my_lastname = last_name.value.trim();     // Get the values from the input fields and trim any extra spaces
    const file = image_input.files[0];              // Get the uploaded image file
    const my_id = unique_Id_Generator();            // Get the generated unique id of the user

    isFieldEmpty(my_firstname, my_lastname, file);   //function call for prompting if field is has no input value
    reading_converting_pushing_atributes(my_firstname, my_lastname, file, my_id);   //function for converting image file to string and pushing all atributes to users array
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
function unique_Id_Generator(){
    let generatedIDs = new Set();                                                               // Set to store unique IDs
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97));          // generates ["a", "b", ..., "z"]
    const allCharacters = [...digits, ...letters];                                              // Combine digits and letters

    let my_id;
    do {                                                                                        // Keep generating IDs until a unique one is found
        my_id = "";                                                                             // Reset my_id for each attempt
        while (my_id.length < 10) {
            const randomID = allCharacters[Math.floor(Math.random() * allCharacters.length)];
            my_id += randomID;
        }
    } while (generatedIDs.has(my_id));                                                          // Ensure ID is unique

    generatedIDs.add(my_id); 
    return my_id;                                                                   // Store the unique ID
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
function isFieldEmpty(my_firstname, my_lastname, file){
    if (!my_firstname || !my_lastname || !file) {   // Check if all fields (first name, last name, and image) are filled
        alert("Please fill in all fields.");        // Alert the user if any field is missing
        return;                                     // Stop the function if validation fails
    }
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
function reading_converting_pushing_atributes(my_firstname, my_lastname, file, my_id){
    const reader = new FileReader();            // Create a new FileReader object to read the image file

    reader.onloadend = function () {            // When the file reading is completed, this function will execute
        const base64Image = reader.result;      // The image is now converted to a Base64 string

        users.push({                            // Add the new user's data (including the Base64 image) to the users array
            id: my_id,
            firstname: my_firstname,
            lastname: my_lastname,
            image: base64Image                  // Store the image as a Base64 string
        });

        save_to_localStorage();                 //calling the function save_to_localStorage to Save the updated users array to localStorage

        first_name.value = '';                  // Clear the input fields after saving the data
        last_name.value = '';                     
        image_input.value = ''; 
    };

    reader.readAsDataURL(file);                 // Read the image file as a Base64-encoded data URL
}



//-------------------------------------------------------------------------------------------------------------------------------------------------------------
function save_to_localStorage(){
    localStorage.setItem('savedUsers', JSON.stringify(users));
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//array of object named "users" containing the user information
//json.parse was used to retrieve all the object stored in the localstorage named "savedUsers"
//if the localstorage is currently empty, a default value is given, which is empty.
export let users = JSON.parse(localStorage.getItem('savedUsers')) || [];


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
export function removeFromUserList(userId){     //function that remove the user from the userList, has a parameter userId which tell what user should be remove
    const newUsers = [];                        //new variable for storing the updated user in the userList

    users.forEach((lis_of_user) =>{             //loop all the users in the users and stored it in list_of_user parameter
        if(lis_of_user.id !== userId){          //if the user id from the users array didn't match with the user id to be remove
            newUsers.push(lis_of_user);         //that user will be push or add to the new array with a variable name newUsers
        }
    });

    users = newUsers;           //the newUsers array containing the updated list of users, will be declared as new array of users.                   
    save_to_localStorage();     //the updated list of users will be saved to localstorage via function named save_to_localStoarge
}

export function update_user(data_userId, update_input_value_firstname, update_input_value_lastname){ //function that changes the exact users info in the localstorage
    users.forEach((userList) =>{                                //looping the users array and storing it in the userList parameter
        if(userList.id === data_userId){                        //if the id from the users array matches the id that has an update below are executed
            userList.firstname = update_input_value_firstname;  //the firstname value from the users arraay will be replace by the update_input_value_firstname
            userList.lastname = update_input_value_lastname;    //the lastname value from the users array will be raplece by the update_input_value_lastname
        }
    });

    save_to_localStorage();                                     //all the updates will be saved in the localstorage throught this function

}

// console.log(users);
// localStorage.clear();