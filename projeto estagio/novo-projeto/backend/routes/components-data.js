// Mock PC components data
const components = [
  // CPUs
  { id: 1, name: 'AMD Ryzen 3 4100', type: 'cpu', manufacturer: 'AMD', price: 99, specs: '4 cores, 8 threads, 3.8GHz boost', tdp: '65W', rating: 3.5 },
  { id: 2, name: 'Intel Core i3-12100', type: 'cpu', manufacturer: 'Intel', price: 109, specs: '4 cores, 8 threads, 3.3GHz base', tdp: '58W', rating: 3.6 },
  { id: 3, name: 'Intel Core i5-12600K', type: 'cpu', manufacturer: 'Intel', price: 289, specs: '6 cores, 12 threads, 3.7GHz base', tdp: '125W', rating: 4.2 },
  { id: 4, name: 'AMD Ryzen 5 7600X', type: 'cpu', manufacturer: 'AMD', price: 299, specs: '6 cores, 12 threads, 4.7GHz boost', tdp: '105W', rating: 4.3 },
  { id: 5, name: 'Intel Core i7-13700K', type: 'cpu', manufacturer: 'Intel', price: 389, specs: '16 cores, 24 threads, 3.4GHz base', tdp: '125W', rating: 4.6 },
  { id: 6, name: 'AMD Ryzen 7 7800X3D', type: 'cpu', manufacturer: 'AMD', price: 449, specs: '8 cores, 16 threads, 4.2GHz boost', tdp: '120W', rating: 4.7 },

  // GPUs
  { id: 7, name: 'NVIDIA GTX 1650', type: 'gpu', manufacturer: 'NVIDIA', price: 149, specs: '4GB GDDR5, 128-bit bus', tdp: '75W', rating: 3.4 },
  { id: 8, name: 'AMD Radeon RX 6500 XT', type: 'gpu', manufacturer: 'AMD', price: 159, specs: '4GB GDDR6, 64-bit bus', tdp: '150W', rating: 3.3 },
  { id: 9, name: 'NVIDIA RTX 4060', type: 'gpu', manufacturer: 'NVIDIA', price: 299, specs: '8GB GDDR6, 128-bit bus', tdp: '70W', rating: 4.0 },
  { id: 10, name: 'AMD Radeon RX 7800 XT', type: 'gpu', manufacturer: 'AMD', price: 499, specs: '16GB GDDR6, 256-bit bus', tdp: '320W', rating: 4.5 },
  { id: 11, name: 'NVIDIA RTX 4070', type: 'gpu', manufacturer: 'NVIDIA', price: 599, specs: '12GB GDDR6X, 192-bit bus', tdp: '200W', rating: 4.4 },
  { id: 12, name: 'NVIDIA RTX 4080', type: 'gpu', manufacturer: 'NVIDIA', price: 1199, specs: '16GB GDDR6X, 256-bit bus', tdp: '320W', rating: 4.8 },

  // RAM
  { id: 13, name: 'Patriot 8GB DDR4-2666', type: 'ram', manufacturer: 'Patriot', price: 39, specs: '8GB, DDR4-2666', warranty: '1 ano', rating: 3.2 },
  { id: 14, name: 'Corsair Vengeance 16GB DDR4-3200', type: 'ram', manufacturer: 'Corsair', price: 89, specs: '16GB (2x8GB), DDR4-3200', warranty: 'Vitalícia', rating: 4.3 },
  { id: 15, name: 'G.Skill Ripjaws V 32GB DDR4-3600', type: 'ram', manufacturer: 'G.Skill', price: 149, specs: '32GB (2x16GB), DDR4-3600', warranty: 'Vitalícia', rating: 4.4 },
  { id: 16, name: 'Corsair Dominator 64GB DDR5-5600', type: 'ram', manufacturer: 'Corsair', price: 399, specs: '64GB (2x32GB), DDR5-5600', warranty: 'Vitalícia', rating: 4.6 },

  // Storage
  { id: 17, name: 'Kingston A2000 250GB NVMe SSD', type: 'storage', manufacturer: 'Kingston', price: 39, specs: '250GB, PCIe 3.0, up to 2200MB/s', warranty: '5 anos', rating: 3.8 },
  { id: 18, name: 'WD Blue 500GB SATA SSD', type: 'storage', manufacturer: 'Western Digital', price: 49, specs: '500GB, SATA, 560MB/s', warranty: '5 anos', rating: 4.0 },
  { id: 19, name: 'Samsung 970 EVO 500GB NVMe SSD', type: 'storage', manufacturer: 'Samsung', price: 79, specs: '500GB, PCIe 3.0, up to 3400MB/s', warranty: '5 anos', rating: 4.2 },
  { id: 20, name: 'WD Black SN850X 1TB NVMe SSD', type: 'storage', manufacturer: 'Western Digital', price: 129, specs: '1TB, PCIe 4.0, up to 6600MB/s', warranty: '5 anos', rating: 4.5 },
  { id: 21, name: 'Seagate Barracuda 2TB HDD', type: 'storage', manufacturer: 'Seagate', price: 59, specs: '2TB, 7200RPM, 256MB cache', warranty: '2 anos', rating: 3.9 },

  // Motherboards
  { id: 22, name: 'ASRock A520M-HDV', type: 'motherboard', manufacturer: 'ASRock', price: 69, specs: 'AM4, DDR4, USB 3.2', warranty: '3 anos', rating: 3.5 },
  { id: 23, name: 'Gigabyte B660M DS3H', type: 'motherboard', manufacturer: 'Gigabyte', price: 119, specs: 'LGA1700, DDR4, PCIe 4.0', warranty: '3 anos', rating: 3.9 },
  { id: 24, name: 'ASUS Prime B660M-A WiFi', type: 'motherboard', manufacturer: 'ASUS', price: 149, specs: 'LGA1700, WiFi 6, USB 3.2', warranty: '3 anos', rating: 4.1 },
  { id: 25, name: 'MSI MAG B550 Tomahawk', type: 'motherboard', manufacturer: 'MSI', price: 179, specs: 'AM4, PCIe 4.0, USB 3.2 Gen2', warranty: '3 anos', rating: 4.3 },
  { id: 26, name: 'ASUS ROG Strix Z690-E', type: 'motherboard', manufacturer: 'ASUS', price: 329, specs: 'LGA1700, WiFi 6E, Thunderbolt 4', warranty: '3 anos', rating: 4.6 },

  // Power Supplies
  { id: 27, name: 'EVGA 500 W1', type: 'psu', manufacturer: 'EVGA', price: 49, specs: '500W, 80+ White, Non-Modular', warranty: '3 anos', rating: 3.4 },
  { id: 28, name: 'Thermaltake Smart 500W', type: 'psu', manufacturer: 'Thermaltake', price: 59, specs: '500W, 80+ Bronze, Semi-Modular', warranty: '5 anos', rating: 3.7 },
  { id: 29, name: 'Corsair RM650x', type: 'psu', manufacturer: 'Corsair', price: 129, specs: '650W, 80+ Gold, Fully Modular', warranty: '10 anos', rating: 4.4 },
  { id: 30, name: 'Seasonic Focus GX-750', type: 'psu', manufacturer: 'Seasonic', price: 149, specs: '750W, 80+ Gold, Fully Modular', warranty: '12 anos', rating: 4.5 },
  { id: 31, name: 'Corsair HX1000i', type: 'psu', manufacturer: 'Corsair', price: 299, specs: '1000W, 80+ Platinum, Fully Modular', warranty: '10 anos', rating: 4.7 },

  // Cases
  { id: 32, name: 'Thermaltake Versa H18', type: 'case', manufacturer: 'Thermaltake', price: 44, specs: 'Micro-ATX, Tempered Glass', warranty: '2 anos', rating: 3.6 },
  { id: 33, name: 'Cougar MX330', type: 'case', manufacturer: 'Cougar', price: 49, specs: 'Mid Tower, Mesh Front Panel', warranty: '2 anos', rating: 3.8 },
  { id: 34, name: 'Corsair 4000D Airflow', type: 'case', manufacturer: 'Corsair', price: 89, specs: 'Mid Tower, Tempered Glass, White', warranty: '5 anos', rating: 4.3 },
  { id: 35, name: 'Fractal Design Meshify C Mini', type: 'case', manufacturer: 'Fractal Design', price: 99, specs: 'Mini-ITX/Micro-ATX, Tempered Glass', warranty: '5 anos', rating: 4.4 },
  { id: 36, name: 'Lian Li PC-O11 Dynamic', type: 'case', manufacturer: 'Lian Li', price: 149, specs: 'Mid Tower, Tempered Glass, Excellent Airflow', warranty: '5 anos', rating: 4.6 }
];

module.exports = components;
