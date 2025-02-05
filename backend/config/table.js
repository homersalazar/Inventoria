CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NULL,
    LastName VARCHAR(50) NULL,
    email VARCHAR(50) NULL,
    password VARCHAR(255) NULL,
    status SMALLINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE
);



CREATE TABLE Roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ROLE VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

const jwtSecret = process.env.JWT_SECRET || 'd3c6bcd4c0c6947d1ef113b41d37bdd350679b42416266b6db1666b6eb0f0454'; 


CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image_path VARCHAR(100) NULL,
    ctgy_name VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
