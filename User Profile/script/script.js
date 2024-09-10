import { add_user, removeFromUserList, users, update_user } from "../data/userList.js";

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
document.querySelector(".js-submit-btn").addEventListener('click', () => {  // When submit button is clicked, add_user function is executed
    add_user();                                                             //this function is now located in the userList.js
});


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
function display_users() {              // Function for displaying the user info in the webpage
    let userHTML = "";                  // Variable that will serve as a container of the generated HTML code
    users.forEach((userList) => {       //loop all the users and stored in userListParameter
        userHTML += `
            <div class="user-profile-container js-user-profile-container-${userList.id}">
                <div class="image-container">
                    <img src="${userList.image}" alt="">
                </div>
                <p>ID : ${userList.id}</p>
                <p class="user-fullname-display-${userList.id}">${userList.lastname}, ${userList.firstname}</p>

                <div class="span-container">

                    <span class="js-update-user" data-user-update-id="${userList.id}">Update</span>

                    <div>
                        <div class="js-input-container">
                            <div class="label-container">
                                <label for="firstname">Firstname: </label>
                            </div>
                            <input type="text" id="firstname" class="js-first-name-${userList.id}">
                        </div>


                        <div class="js-input-container">
                            <div class="label-container">
                                <label for="lastname">Lastname: </label>
                            </div>
                            <input type="text" id="lastname" class="js-last-name--${userList.id}">
                        </div>
                    </div>

                    <div class="save-cancel-btn">
                        <div class="js-submit-btn-container">
                            <button class="js-submit-btn" data-user-update-id="${userList.id}">Save</button>
                        </div>

                        <div class="js-cancel-btn-container">
                            <button class="js-cancel-btn" data-user-update-id="${userList.id}">Cancel</button>
                        </div>
                    </div>

                    <span class="js-delete-user" data-user-delete-id="${userList.id}">Delete</span>

                </div>
            </div>
        `;
    });
    document.querySelector(".grid-user-profile-container").innerHTML = userHTML;  // Insert the generated HTML code into the main HTML file
    if_delete_btn();                                                              //function call for delete btn listener
    if_update_save_cancel_btn();                                                                //function call for update btn listener

}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
function if_delete_btn(){                                                                       //function for delete btn listener
    document.querySelectorAll(".js-delete-user").forEach((deleteUser) => {                      // Attach event listeners for delete buttons after rendering
        deleteUser.addEventListener("click", () => {
            const data_userId = deleteUser.dataset.userDeleteId;                                // Use correct dataset reference

            removeFromUserList(data_userId);                                                    // Call the function to remove the user


            const con = document.querySelector(`.js-user-profile-container-${data_userId}`);    // Remove the user's HTML container from the page
            if (con) {
                con.remove();                                                                   // Removes the container from the DOM
            }
        });
    });
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
function if_update_save_cancel_btn(){
    document.querySelectorAll('.js-update-user').forEach((updateUser) => {          // Selects all elements with the class 'js-update-user' and loops over them
        updateUser.addEventListener("click", () => {                                // Adds a click event listener to each update link element
            
            const data_userId = updateUser.dataset.userUpdateId;                  // Retrieves the 'userId' from the 'js-update-user' attribute of the clicked link
    
            document.querySelector(`.js-user-profile-container-${data_userId}`)
            .classList.add('is-editing-userprofile');       // Adds the class 'is-editing-userprofile' to the  user profile container related to the userId
                                                            // This likely triggers the UI to switch to editing mode for the item's quantity
        });
    });

    save_cancel_btn();
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
function save_cancel_btn(){                                                 //function for save or cancel btn
    document.querySelectorAll('.js-submit-btn').forEach((saveUpdate) =>{    //loop all the button js-submit-btn which is the save btn
        saveUpdate.addEventListener('click', ()=>{                          // add a listener to the save btn

            const data_userId = saveUpdate.dataset.userUpdateId;            //get the stored data(id) from the save btn contianer and save it in the variable data_userId

            const update_input_value_firstname = document.querySelector(`.js-first-name-${data_userId}`).value; //get the value inputted in the firstname field and stored it in the variable update_input_value_firstname
            const update_input_value_lastname = document.querySelector(`.js-last-name--${data_userId}`).value;  //get the value inputted in the lastname field and stored it in the variable update_input_value_lastname

            if (isFieldEmpty(update_input_value_firstname, update_input_value_lastname)) {  //function call to check if the all field is not empty
                return;                                                                     // Stop the execution if fields are empty, means it will not proceed to next step because of the return statement
            }                                                                               //meanwhile, if all field is filled then this it proceed to the next process with is updating the user.

            update_user(data_userId, update_input_value_firstname, update_input_value_lastname);    //a function call from the userList.js wherein the inputted info of the user will be saved in the localstorage.
            document.querySelector(`.user-fullname-display-${data_userId}`).innerHTML = `${update_input_value_lastname}, ${update_input_value_firstname}`;  //this is to update the display info in of the user in the web page

            document.querySelector(`.js-user-profile-container-${data_userId}`) // Removes the class 'is-editing-userprofile' from the user profile container related to the userId
            .classList.remove('is-editing-userprofile');                        // This likely switches the UI back from editing mode to normal display mode 

            document.querySelector(`.js-first-name-${data_userId}`).value ='';  //to reset in firstname input field to enpty
            document.querySelector(`.js-last-name--${data_userId}`).value ='';  //to reset in lastname input field to enpty

        });

    });

    document.querySelectorAll('.js-cancel-btn').forEach((cancelUpdate) =>{      //get all the cancel button and stored it in the cancelUpdate parameter
        cancelUpdate.addEventListener('click', () => {                          //add event listener to the cancel button

            const data_userId = cancelUpdate.dataset.userUpdateId;              //get the stored data(id) from the cancel btn contianer and save it in the variable data_userId


            document.querySelector(`.js-user-profile-container-${data_userId}`) // Removes the class 'is-editing-userprofile' from the user profile container related to the userId
            .classList.remove('is-editing-userprofile');                        // This likely switches the UI back from editing mode to normal display mode 
        });
    });

}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
function isFieldEmpty(firstname, lastname) {
    if (!firstname || !lastname) {              // Check if first name or last name is empty
        alert("Please fill in all fields.");
        return true;                            // Return true if fields are empty
    }
    return false;                               // Return false if fields are valid
}


display_users(); // Display stored users on page load
