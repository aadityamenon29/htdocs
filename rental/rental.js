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

function populateAvailableBooks() {
  fetch("http://localhost/api.php/books/available_books")
    .then((response) => response.json())
    .then((books) => {
      // Clear existing options
      const book_dropdown = document.querySelector("#book-dropdown");
      book_dropdown.innerHTML = "";

      books.forEach((book) => {
        const optionElement = document.createElement("option");
        optionElement.text =
          "Book id: " + book.bid + " - " + book.name + "-" + book.ISBN;
        optionElement.value = book.bid;
        book_dropdown.appendChild(optionElement);
      });
    });
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
      populateAvailableBooks(); // Refresh the book list
      populateUsers(); // Refresh the user list
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
  populateAvailableBooks(); // Call the function to populate books dropdown
});
