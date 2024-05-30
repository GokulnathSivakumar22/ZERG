CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    dob DATE NOT NULL,
    sex ENUM('Male', 'Female', 'Other') NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
show tables;
SELECT * FROM users;

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    cooking_time INT,
    is_saved BOOLEAN DEFAULT 0
);

show tables;
drop table recipes;
show tables;
drop table users;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `sex` enum('male','female','other') NOT NULL,
  `email` varchar(255) NOT NULL,
  `terms` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

  ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    cooking_time INT,
    is_saved BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS discussions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


