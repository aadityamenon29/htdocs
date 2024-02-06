// Function to add a new user
function addUser() {
  // was working all along, just had to do hard refresh cmd+shift+R or disable cache in network tab
  console.log("inside add uaaaser");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  fetch("http://localhost/api.php/users", {
    method: "POST",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `fullName=${encodeURIComponent(name)}&email=${encodeURIComponent(
      email
    )}`,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message); // Display a success message
      fetchUsers(); // Refresh the user list
    })
    .catch((error) => {
      console.error("Error:", error);

      // Log the response text for debugging
      response.text().then((text) => console.error("Response Text:", text));
    });
}

// Function to fetch and display the list of users
function fetchUsers() {
  fetch("http://localhost/api.php/users")
    .then((response) => response.json())
    .then((users) => {
      const userList = document.getElementById("userList");
      userList.innerHTML = ""; // Clear existing list

      users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${user.fullName} (${user.email})`;
        userList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error:", error));
  document.querySelector("#header-users").innerHTML = "Users";
}

// Fetch and display the list of books
function fetchBooks() {
  fetch("http://localhost/api.php/books")
    .then((response) => response.json())
    .then((books) => {
      const bookList = document.getElementById("bookList");
      bookList.innerHTML = ""; // Clear existing list

      books.forEach((book) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${book.book_name} by ${book.author_name}`;
        bookList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error:", error));

  document.querySelector("#header-books").innerHTML = "Books";
}

// Initial fetch to display users when the page loads
// fetchUsers();
