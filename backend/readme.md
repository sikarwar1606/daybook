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


CREATE TABLE expences_categories (
    category_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, name)  -- prevents duplicate category names per user
);

CREATE TABLE monthly_expences (
    expences_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    category_id INTEGER NOT NULL REFERENCES expences_categories(category_id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE saving_jars(
    jar_id SERIAL PRIMARY KEY, 
    jar_name INTEGER NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    target_amount NUMERIC(10,2) NOT NULL, 
    risk TEXT NOT NULL,
)

CREATE TABLE monthly_savings (
    saving_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    month DATE NOT NULL,
    savings NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, month)       -- prevents duplicate entries for the same user+month
);

INSERT INTO monthly_savings (user_id, month, saving)
VALUES (1, '2026-09-01', 500.00)
ON CONFLICT (user_id, month)
DO UPDATE SET saving = EXCLUDED.saving;   



ALTER TABLE monthly_savings
ADD COLUMN updated_at TIMESTAMP;   


INSERT INTO monthly_savings (user_id, month, saving)
VALUES (1, '2026-09-01', 500.00)
ON CONFLICT (user_id, month)
DO UPDATE SET
    saving = EXCLUDED.saving,
    updated_at = NOW();   


ALTER TABLE monthly_savings
ALTER COLUMN updated_at SET DEFAULT NOW();   

CREATE TABLE monthly_savings_history (
    history_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    month DATE NOT NULL,
    saving NUMERIC(10,2) NOT NULL,
    saved_at TIMESTAMP NOT NULL DEFAULT NOW()
);   


CREATE OR REPLACE FUNCTION save_savings_history()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO monthly_savings_history (user_id, month, saving, saved_at)
    VALUES (OLD.user_id, OLD.month, OLD.saving, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;   


CREATE TRIGGER trg_savings_history
BEFORE UPDATE ON monthly_savings
FOR EACH ROW
EXECUTE FUNCTION save_savings_history();   


INSERT INTO monthly_savings (user_id, month, saving)
VALUES (1, '2026-09-01', 500.00)
ON CONFLICT (user_id, month)
DO UPDATE SET
    saving = EXCLUDED.saving,
    updated_at = NOW();   


CREATE TABLE recommended_jar_category(
  rj_category_id  SERIAL PRIMARY KEY,
  category_name text NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)


CREATE TABLE jar_category(
  category_id SERIAL PRIMARY KEY, 
  user_id INTEGER NOT NULL REFERENCES users(user_id),
  category_name text NOT NULL,
  jar_limit INTEGER NOT NULL,
  rj_category_id INTEGER REFERENCES recommended_jar_category(rj_category_id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, category_name)
)   