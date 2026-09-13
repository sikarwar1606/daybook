CREATE TABLE users(
    user_id SERIAL PRIMARY KEY, 
    google_id VARCHAR(255),
    user_name VARCHAR(100),
    email VARCHAR (255),
    avatar_url text,
    created_at TIMESTAMP DEFAULT NOW()
)


CREATE TABLE income_categories (
    category_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, name)  -- prevents duplicate category names per user
);

CREATE TABLE monthly_income (
    income_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    category_id INTEGER NOT NULL REFERENCES income_categories(category_id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);