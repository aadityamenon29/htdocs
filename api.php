<?php
// For error displaying purposes.
error_reporting(E_ALL);
ini_set('display_errors', '1');

$servername = "localhost";
$username = "root";
$password = "";
$database = "violas_app";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Handle GET requests
    if ($_SERVER['REQUEST_URI'] === '/api.php/users') {
        // Fetch all users from the database
        $result = $conn->query("SELECT * FROM users"); //

        if ($result === false) {
            die("Error in SQL query: " . $conn->error);
        }

        $users = $result->fetch_all(MYSQLI_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($users);
    }

    // Function to fetch available books that are not rented. Use the date_of_return column in rental table to check if the book is available. if date_of_return is empty for given book id, then it is not available else it is available. Also, if there is no row in rental table for given book id, then it is available.

    if ($_SERVER['REQUEST_URI'] === '/api.php/books/available_books') {
        // Fetch all books from the database
        $result = $conn->query("
        
        SELECT
        b.*
        FROM
        books AS b
        LEFT JOIN rental AS r
        ON
        b.bid = r.book_id
        GROUP BY
        b.bid,
        b.name,
        b.author,
        b.ISBN,
        b.genre
        HAVING
        COUNT(DISTINCT r.rental_id) = 0 OR SUM(
        CASE WHEN r.date_of_return IS NULL THEN 1 ELSE 0
        END
        ) = 0;
        
        "); //

        if ($result === false) {
            die("Error in SQL query: " . $conn->error);
        }

        $books = $result->fetch_all(MYSQLI_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($books);
    }

    // Get all books

    if ($_SERVER['REQUEST_URI'] === '/api.php/books') {
        // Fetch all books from the database
        $result = $conn->query("
        
        SELECT
        b.bid AS book_id,
        b.name AS book_name,
        a.name AS author_name
        FROM
        books b
        JOIN authors a ON
        b.author = a.aid;
        
        "); //

        if ($result === false) {
            die("Error in SQL query: " . $conn->error);
        }

        $books = $result->fetch_all(MYSQLI_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($books);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_SERVER['REQUEST_URI'] === '/api.php/users') {

        $name = $_POST['fullName'];
        $email = $_POST['email'];

        $sql = "INSERT INTO users (fullName, email) VALUES ('$name', '$email')";

        if ($conn->query($sql) === false) {
            die("Error in SQL query: " . $conn->error);
        }

        header('Content-Type: application/json');
        echo json_encode(['message' => 'User added successfully']);
    } elseif ($_SERVER['REQUEST_URI'] === '/api.php/rental') {

        $user_id = $_POST['userID'];
        $book_id = $_POST['bookID'];
        $rental_date = date('Y-m-d');   // default to today's date as rental date

        // default $date_of_return to NULL to signify that the book has not been returned

        $sql = "INSERT INTO rental (user_id, book_id, rental_date, date_of_return) VALUES ('$user_id', '$book_id', '$rental_date', NULL)";

        if ($conn->query($sql) === false) {
            die("Error in SQL query: " . $conn->error);
        }

        header('Content-Type: application/json');
        echo json_encode(
            [
                'message' => 'Book rented successfully',
            ]
        );
    }
}

$conn->close();
