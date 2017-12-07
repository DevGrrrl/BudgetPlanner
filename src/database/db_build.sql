BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    cost FLOAT(2),
    category VARCHAR(50),
    date_purchased DATE,
    status BOOLEAN
);

INSERT INTO users (user_name, password) VALUES ('Alina', '$2a$10$8c8tk6wqxvUgSsweOmHUO.JA95Jpf02crXTWAetJEr4IinXL3zxEG');
INSERT INTO users (user_name, password) VALUES ('James', '$2a$10$8c8tk6wqxvUgSsweOmHUO.JA95Jpf02crXTWAetJEr4IinXL3zxEG');

INSERT INTO items (user_id, cost, category, date_purchased, status) VALUES ((SELECT id FROM users WHERE user_name = 'James'), 2.96, 'Groceries', '2017-11-29', true);

INSERT INTO items (user_id, cost, category, date_purchased, status) VALUES ((SELECT id FROM users WHERE user_name = 'James'), 5.30, 'Groceries', '2017-11-29', true);

INSERT INTO items (user_id, cost, category, date_purchased, status) VALUES ((SELECT id FROM users WHERE user_name = 'Alina'), 9.30, 'Groceries', '2017-11-29', false);

COMMIT;
