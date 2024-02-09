// Function to fetch users from API
function populateUsers() {
  fetch("http://localhost/api.php/users")
    .then((response) => response.json())
    .then((users) => {
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

// Function to populate books dropdown
function populateBooks() {
  fetch("http://localhost/api.php/books")
    .then((response) => response.json())
    .then((books) => {
      // Clear existing options
      const book_dropdown = document.querySelector("#book-dropdown");
      book_dropdown.innerHTML = "";

      books.forEach((book) => {
        const optionElement = document.createElement("option");
        optionElement.text = book.book_name + "-" + book.author_name;
        optionElement.value = book.book_id;
        book_dropdown.appendChild(optionElement);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function submitRental(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const user_id = document.querySelector("#user-dropdown").value;

  const book_id = document.querySelector("#book-dropdown").value;
  console.log(`inside submit rental ${user_id} ${book_id}`);

  fetch("http://localhost/api.php/rental", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `userID=${encodeURIComponent(user_id)}&bookID=${encodeURIComponent(
      book_id
    )}`,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message); // Display a success message
    })
    .catch((error) => {
      console.error("Error:", error, error);
      // log full stack trace of error
      console.error("Error:", error.stack);
      response.text().then((text) => console.error("Response Text:", text));
    });
}

document.addEventListener("DOMContentLoaded", function () {
  populateUsers(); // Call the function to populate users dropdown
  populateBooks(); // Call the function to populate books dropdown
});
