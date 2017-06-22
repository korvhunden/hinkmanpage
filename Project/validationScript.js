var createAccountButtonStatusObject;

$(document).ready(function() {

  // Start of
  // validation functions

  // These functions takes a string and returns true if it passes the regular expression in the function.

  function isEmailInputValid(emailInput) {
    var emailRegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/; // Regular expression for valid email adress from https://www.w3schools.com/jsref/prop_email_pattern.asp

    return emailRegExp.test(emailInput);
  }

  function isPasswordInputValid(pswInput) {
    var pswRegExp = /.{3,}/;

    return pswRegExp.test(pswInput);
  }

  function isNameInputValid(nameInput) {
    var nameRegExp = /^[a-z]+$/i; // Only the characters a-Z (case insensitive) allowed

    return nameRegExp.test(nameInput);
  }

  function isUsernameVaild(usernameInput) {
    var usernameRegExp = /^[a-z0-9_]+$/i; // Only letters a-Z (case insensitive), digits and "_" allowed

    return usernameRegExp.test(usernameInput);
  }

  // End of
  // validation functions


  // Start of script that checks the inputs

  $("#login_email_input").change(function() {
    var userInput = $(this).val(); // For more easily readable code - userInput is the value of the input

    if (userInput.length > 0) { // Only run this code if there is something in the input field
      if (isEmailInputValid(userInput)) {
        $("#login_email_valid_status").empty(); // If the email is valid, remove error messages
        $("#login_submit_button").prop("disabled", false);
      }
      else {
        $("#login_email_valid_status").html("The given email adress is not valid");
        $("#login_submit_button").prop("disabled", true);
      }
    }
    else {
      $("#login_email_valid_status").empty(); // Remove error message if input is empty
      $("#login_submit_button").prop("disabled", true);
    }

  });

  // ------ Functions for the create account form --------

  // -- If the input from the user is not valid and the field gets unfocused these functions will generate an error message --

  $("#create_account_username").change(function() {
    var userInput = $(this).val(); // For more easily readable code - userInput is the value of the input

    if (userInput.length > 0) { // Only run this code if there is something in the input field
      if (isUsernameVaild(userInput)) {
        $("#create_account_username_valid_status").empty(); // If the email is valid, remove error messages
      }
      else {
        $("#create_account_username_valid_status").html("The given username is not valid. Accepted characters are letters (a-Z), digits (0-9) and underscore (_)");
      }
    }
    else {
      $("#create_account_username_valid_status").empty(); // Remove error message if input is empty
    }

  });

  $("#create_account_fname").change(function() {
    var userInput = $(this).val(); // For more easily readable code - userInput is the value of the input

    if (userInput.length > 0) { // Only run this code if there is something in the input field
      if (isNameInputValid(userInput)) {
        $("#create_account_fname_valid_status").empty(); // If the input is valid, remove error messages
      }
      else {
        $("#create_account_fname_valid_status").html("The given first name is not valid. Accepted characters are letters (a-Z)");
      }
    }
    else {
      $("#create_account_fname_valid_status").empty(); // Remove error message if input is empty
    }

  });

  $("#create_account_lname").change(function() {
    var userInput = $(this).val(); // For more easily readable code - userInput is the value of the input

    if (userInput.length > 0) { // Only run this code if there is something in the input field
      if (isNameInputValid(userInput)) {
        $("#create_account_lname_valid_status").empty(); // If the input is valid, remove error messages
      }
      else {
        $("#create_account_lname_valid_status").html("The given last name is not valid. Accepted characters are letters (a-Z)");
      }
    }
    else {
      $("#create_account_lname_valid_status").empty(); // Remove error message if input is empty
    }

  });

  $("#create_account_email").change(function() {
    var userInput = $(this).val(); // For more easily readable code - userInput is the value of the input

    if (userInput.length > 0) { // Only run this code if there is something in the input field
      if (isEmailInputValid(userInput)) {
        $("#create_account_email_valid_status").empty(); // If the input is valid, remove error messages
      }
      else {
        $("#create_account_email_valid_status").html("The given email is not valid.");
      }
    }
    else {
      $("#create_account_email_valid_status").empty(); // Remove error message if input is empty
    }

  });

  $("#create_account_password").change(function() {
    var userInput = $(this).val(); // For more easily readable code - userInput is the value of the input

    if (userInput.length > 0) { // Only run this code if there is something in the input field
      if (isPasswordInputValid(userInput)) {
        $("#create_account_password_valid_status").empty(); // If the input is valid, remove error messages
      }
      else {
        $("#create_account_password_valid_status").html("The given password is not valid. It must be at least 3 characters.");
      }
      if (userInput == $("#create_account_password_repeat").val() ) {
        $("#create_account_password_repeat_valid_status").empty(); // If the input is valid, remove error messages
      }
      else {
        $("#create_account_password_repeat_valid_status").html("The repeated password does not match the first one.");
      }
    }
    else {
      $("#create_account_password_valid_status").empty(); // Remove error message if input is empty
    }

  });

  $("#create_account_password_repeat").change(function() {
    var userInput = $(this).val(); // For more easily readable code - userInput is the value of the input

    if (userInput.length > 0) { // Only run this code if there is something in the input field
      if (userInput == $("#create_account_password").val() ) {
        $("#create_account_password_repeat_valid_status").empty(); // If the input is valid, remove error messages
      }
      else {
        $("#create_account_password_repeat_valid_status").html("The repeated password does not match the first one.");
      }
    }
    else {
      $("#create_account_password_repeat_valid_status").empty(); // Remove error message if input is empty
    }

  });

  // -- End of functions that generate error messages

  // -- Start of functions to disable the submit button for the form is every input is not validated --

  function createAccountButtonStatus() {
    this.create_account_username_ok = false;
    this.create_account_fname_ok = false;
    this.create_account_lname_ok = false;
    this.create_account_email_ok = false;
    this.create_account_password_ok = false;
    this.create_account_password_repeat_ok = false;
  }

  // If all inputs are valid, this returns true
  createAccountButtonStatus.prototype.checkButtonStatus = function() {
    if (this.create_account_username_ok && this.create_account_fname_ok && this.create_account_lname_ok && this.create_account_email_ok && this.create_account_password_ok && this.create_account_password_repeat_ok) {
      $("#create_account_submit_button").prop("disabled", false);
    }
    else {
      $("#create_account_submit_button").prop("disabled", true);
    }
  };


  createAccountButtonStatusObject = new createAccountButtonStatus();

  // -- These functions checks if input is valid when a key is lifted - if not, they will tell createAccountButtonStatusObject to disable the button

  $("#create_account_username").keyup(function() {
    var userInput = $(this).val(); // For more easily readable code - userInput is the value of the input

    if (userInput.length > 0) { // Only run this code if there is something in the input field
      if (isUsernameVaild(userInput)) {
        createAccountButtonStatusObject.create_account_username_ok = true;
        $("#create_account_username_valid_status").empty(); // If the email is valid, remove error messages
      }
      else {
        createAccountButtonStatusObject.create_account_username_ok = false;
      }
    }
    else {
      createAccountButtonStatusObject.create_account_username_ok = false;
      $("#create_account_username_valid_status").empty(); // Remove error messages
    }

    createAccountButtonStatusObject.checkButtonStatus();
  });

  $("#create_account_fname").keyup(function() {
    var userInput = $(this).val(); // For more easily readable code - userInput is the value of the input

    if (userInput.length > 0) { // Only run this code if there is something in the input field
      if (isNameInputValid(userInput)) {
        createAccountButtonStatusObject.create_account_fname_ok = true;
        $("#create_account_fname_valid_status").empty(); // If the input is valid, remove error messages
      }
      else {
        createAccountButtonStatusObject.create_account_fname_ok = false;
      }
    }
    else {
      createAccountButtonStatusObject.create_account_fname_ok = false;
      $("#create_account_fname_valid_status").empty(); // Remove error messages
    }
    createAccountButtonStatusObject.checkButtonStatus();
  });

  $("#create_account_lname").keyup(function() {
    var userInput = $(this).val(); // For more easily readable code - userInput is the value of the input

    if (userInput.length > 0) { // Only run this code if there is something in the input field
      if (isNameInputValid(userInput)) {
        createAccountButtonStatusObject.create_account_lname_ok = true;
        $("#create_account_lname_valid_status").empty(); // If the input is valid, remove error messages
      }
      else {
        createAccountButtonStatusObject.create_account_lname_ok = false;
      }
    }
    else {
      createAccountButtonStatusObject.create_account_lname_ok = false;
      $("#create_account_lname_valid_status").empty(); // Remove error messages
    }
    createAccountButtonStatusObject.checkButtonStatus();
  });

  $("#create_account_email").keyup(function() {
    var userInput = $(this).val(); // For more easily readable code - userInput is the value of the input

    if (userInput.length > 0) { // Only run this code if there is something in the input field
      if (isEmailInputValid(userInput)) {
        createAccountButtonStatusObject.create_account_email_ok = true;
        $("#create_account_email_valid_status").empty(); // If the input is valid, remove error messages
      }
      else {
        createAccountButtonStatusObject.create_account_email_ok = false;
      }
    }
    else {
      createAccountButtonStatusObject.create_account_email_ok = false;
      $("#create_account_email_valid_status").empty(); // Remove error messages
    }
    createAccountButtonStatusObject.checkButtonStatus();
  });

  $("#create_account_password, #create_account_password_repeat").keyup(function() {
    var userInput1 = $("#create_account_password").val(); // For more easily readable code - userInput is the value of the input
    var userInput2 = $("#create_account_password_repeat").val();

    if (userInput1.length > 0) { // Only run this code if there is something in the input field
      if (isPasswordInputValid(userInput1) && userInput1 == userInput2 ) {
        createAccountButtonStatusObject.create_account_password_ok = true;
        createAccountButtonStatusObject.create_account_password_repeat_ok = true;
      }
      else {
        createAccountButtonStatusObject.create_account_password_ok = false;
        createAccountButtonStatusObject.create_account_password_repeat_ok = false;
      }
    }
    else {
      createAccountButtonStatusObject.create_account_password_ok = false;
      createAccountButtonStatusObject.create_account_password_repeat_ok = false;
    }
    createAccountButtonStatusObject.checkButtonStatus();
  });

  // ----- End of functions to disable the submit button for the form is every input is not validated ------

  // ------ End of functions for the create account form --------

});
