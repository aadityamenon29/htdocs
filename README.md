Viola's library management project

SQL for rental table : 

```
CREATE TABLE rental (
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    bid INT,
    rental_date DATE,
    date_of_return DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(bid)
);
```
