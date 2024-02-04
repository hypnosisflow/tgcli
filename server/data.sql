CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    chat_type VARCHAR(50),
    chat_id VARCHAR(50),
    content JSON
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    period_filter VARCHAR(50),
    chat_id VARCHAR(50),
    report_date VARCHAR(50),
    user_id VARCHAR(50),
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    username VARCHAR(50),
    phone VARCHAR(50),
    content JSON,
    events VARCHAR(50)
);