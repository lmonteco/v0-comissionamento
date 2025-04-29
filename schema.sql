-- Create tables for the sales commission system

-- Users table
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Salespeople table
CREATE TABLE salespeople (
  id VARCHAR(255) PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  is_commissioned BOOLEAN DEFAULT TRUE,
  user_id VARCHAR(255) UNIQUE REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id VARCHAR(255) PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  counts_for_goal BOOLEAN DEFAULT TRUE,
  is_commissioned BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product types table
CREATE TABLE product_types (
  id VARCHAR(255) PRIMARY KEY,
  product_id VARCHAR(255) REFERENCES products(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  codes TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Commission rules table
CREATE TABLE commission_rules (
  id VARCHAR(255) PRIMARY KEY,
  rule_id VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Goals table
CREATE TABLE goals (
  id VARCHAR(255) PRIMARY KEY,
  rule_id VARCHAR(255) REFERENCES commission_rules(id) ON DELETE CASCADE,
  value DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Achievement ranges table
CREATE TABLE achievement_ranges (
  id VARCHAR(255) PRIMARY KEY,
  goal_id VARCHAR(255) REFERENCES goals(id) ON DELETE CASCADE,
  min_percentage DECIMAL(5,2) NOT NULL,
  max_percentage DECIMAL(5,2),
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Commission rates table
CREATE TABLE commission_rates (
  id VARCHAR(255) PRIMARY KEY,
  product_id VARCHAR(255) REFERENCES products(id) ON DELETE CASCADE,
  achievement_range_id VARCHAR(255) REFERENCES achievement_ranges(id) ON DELETE CASCADE,
  rate DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quarterly bonus table
CREATE TABLE quarterly_bonuses (
  id VARCHAR(255) PRIMARY KEY,
  value DECIMAL(10,2) NOT NULL,
  min_percentage DECIMAL(5,2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Calculations table
CREATE TABLE calculations (
  id VARCHAR(255) PRIMARY KEY,
  calculation_id VARCHAR(50) NOT NULL,
  rule_id VARCHAR(255) REFERENCES commission_rules(id),
  reference_month INTEGER NOT NULL,
  reference_year INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  goal_value DECIMAL(10,2) NOT NULL,
  achieved_value DECIMAL(10,2) NOT NULL,
  achievement_percentage DECIMAL(5,2) NOT NULL,
  achievement_category VARCHAR(50) NOT NULL,
  commission_total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pendente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Salesperson calculations table
CREATE TABLE salesperson_calculations (
  id VARCHAR(255) PRIMARY KEY,
  calculation_id VARCHAR(255) REFERENCES calculations(id) ON DELETE CASCADE,
  salesperson_id VARCHAR(255) REFERENCES salespeople(id) ON DELETE CASCADE,
  produced_value DECIMAL(10,2) NOT NULL,
  commission_value DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product calculations table
CREATE TABLE product_calculations (
  id VARCHAR(255) PRIMARY KEY,
  calculation_id VARCHAR(255) REFERENCES calculations(id) ON DELETE CASCADE,
  product_description VARCHAR(255) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL,
  commission_value DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quarterly bonus calculations table
CREATE TABLE quarterly_bonus_calculations (
  id VARCHAR(255) PRIMARY KEY,
  bonus_id VARCHAR(255) REFERENCES quarterly_bonuses(id),
  reference_quarter INTEGER NOT NULL,
  reference_year INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  achieved_percentage DECIMAL(5,2) NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'pendente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Salesperson quarterly bonuses table
CREATE TABLE salesperson_quarterly_bonuses (
  id VARCHAR(255) PRIMARY KEY,
  quarterly_calculation_id VARCHAR(255) REFERENCES quarterly_bonus_calculations(id) ON DELETE CASCADE,
  salesperson_id VARCHAR(255) REFERENCES salespeople(id) ON DELETE CASCADE,
  bonus_value DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales table
CREATE TABLE sales (
  id VARCHAR(255) PRIMARY KEY,
  salesperson_id VARCHAR(255) REFERENCES salespeople(id) ON DELETE CASCADE,
  product_id VARCHAR(255) REFERENCES products(id) ON DELETE CASCADE,
  calculation_id VARCHAR(255) REFERENCES calculations(id),
  sale_date DATE NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2),
  commission_value DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
