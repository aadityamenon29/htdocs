// Function to fetch users from API
function populateUsers() {
  fetch("http://localhost/api.php/users")
    .then((response) => response.json())
    .then((users) => {
      console.log("inside pop users");
      // Clear existing options
      const user_dropdown = document.querySelector("#user-dropdown");
      user_dropdown.innerHTML = "";

      users.forEach((user) => {
        const optionElement = document.createElement("option");
        optionElement.text = user.fullName;
        optionElement.value = user.id;
        user_dropdown.appendChild(optionElement);
      });
    })
    .catch((error) => console.error("Error:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  populateUsers(); // Call the function to populate users dropdown
});
