CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    chat_type VARCHAR(50),
    chat_id VARCHAR(50),
    content JSON
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    chat_type VARCHAR(50),
    chat_id VARCHAR(50),
    content JSON,
    events VARCHAR(50)
);