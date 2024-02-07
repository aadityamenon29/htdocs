function validateSignup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  let errorMessage = "";

  //   // Email validation
  //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  //     errorMessage += "Please enter a valid email address.\n";
  //   }

  // Password validation
  //   if (password.length < 8) {
  //     errorMessage += "Password must be at least 8 characters long.\n";
  //   }

  // Confirm password validation
  if (password !== confirmPassword) {
    errorMessage += "Passwords do not match.\n";
  }

  // Display error message if any
  if (errorMessage) {
    alert(errorMessage);
    return false;
  } else {
    console.log("looks good, sending to db");
    fetch("api.php/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the server response (success message, error, etc.)
        console.log("Data:", data);
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);

        // Log the response text for debugging
        response.text().then((text) => console.error("Response Text:", text));
      });

    // Prevent default form submission (as Fetch API does it asynchronously)
    return false;
  }
}
