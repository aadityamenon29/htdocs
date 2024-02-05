<?php

// For error displaying purposes.
error_reporting(E_ALL);
ini_set('display_errors', '1');

$servername = "localhost";
$username = "root";
$password = "";
$database = "violas_app";

// int, float, double, char, varchar, string, long, bool

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    //echo "Inside if -get";
    //echo "\n".$_SERVER['REQUEST_URI'];
    
    // Handle GET requests
    if ($_SERVER['REQUEST_URI'] === '/api.php/users') {
        //echo "Inside if-if /api/users";
        // Fetch all users from the database
        $result = $conn->query("SELECT * FROM users"); //

        if ($result === false) {
            die("Error in SQL query: " . $conn->error);
        }

        $users = $result->fetch_all(MYSQLI_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($users);
    }

    if ($_SERVER['REQUEST_URI'] === '/api.php/books') {
        // Fetch all books from the database
        $result = $conn->query("
        
                SELECT
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
    // Handle POST requests
    if ($_SERVER['REQUEST_URI'] === '/api.php/users') {

        // testing -
        // echo json_encode(['message' => 'User added successfully - DUMMY']);

        // Add a new user to the database -
        
        $name = $_POST['fullName'];
        $email = $_POST['email'];

        $sql = "INSERT INTO users (fullName, email) VALUES ('$name', '$email')";

        if ($conn->query($sql) === false) {
            die("Error in SQL query: " . $conn->error);
        }

        header('Content-Type: application/json');
        echo json_encode(['message' => 'User added successfully']);
    }
}

$conn->close();
