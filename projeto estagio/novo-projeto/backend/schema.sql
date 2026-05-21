-- PC Builder Database Schema

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username)
);

-- Create component categories table
CREATE TABLE IF NOT EXISTS component_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create components table
CREATE TABLE IF NOT EXISTS components (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  manufacturer VARCHAR(100),
  model VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255),
  specifications JSON,
  description TEXT,
  power_consumption INT,
  compatibility_notes TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES component_categories(id),
  INDEX idx_category (category_id),
  INDEX idx_manufacturer (manufacturer),
  FULLTEXT ft_name_model (name, model)
);

-- Create builds table
CREATE TABLE IF NOT EXISTS builds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  total_price DECIMAL(12, 2),
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_is_public (is_public)
);

-- Create build_components table (junction table)
CREATE TABLE IF NOT EXISTS build_components (
  id INT AUTO_INCREMENT PRIMARY KEY,
  build_id INT NOT NULL,
  component_id INT NOT NULL,
  quantity INT DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (build_id) REFERENCES builds(id) ON DELETE CASCADE,
  FOREIGN KEY (component_id) REFERENCES components(id),
  UNIQUE KEY unique_build_component (build_id, component_id),
  INDEX idx_build_id (build_id),
  INDEX idx_component_id (component_id)
);

-- Create saved_builds table (for public/shared builds)
CREATE TABLE IF NOT EXISTS saved_builds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  build_id INT NOT NULL,
  user_id INT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (build_id) REFERENCES builds(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_build (user_id, build_id),
  INDEX idx_user_id (user_id),
  INDEX idx_build_id (build_id)
);

-- Insert sample component categories
INSERT INTO component_categories (name, description, icon) VALUES
('CPU', 'Processadores (CPU)', 'cpu'),
('GPU', 'Placas Gráficas', 'gpu'),
('RAM', 'Memória RAM', 'memory'),
('Armazenamento', 'HDDs e SSDs', 'storage'),
('Motherboard', 'Placas-mãe', 'motherboard'),
('Fonte', 'Fontes de Alimentação', 'power'),
('Cooler', 'Ventilação e Refrigeração', 'cooler'),
('Case', 'Chassis e Caixas', 'case'),
('Periféricos', 'Teclados, Mouses, Monitores', 'peripherals')
ON DUPLICATE KEY UPDATE name=name;