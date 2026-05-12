// Mock PC components data
const components = [
  // CPUs
  { id: 1, name: 'AMD Ryzen 3 4100', type: 'cpu', price: 99, specs: '4 cores, 8 threads, 3.8GHz boost' },
  { id: 2, name: 'Intel Core i3-12100', type: 'cpu', price: 109, specs: '4 cores, 8 threads, 3.3GHz base' },
  { id: 3, name: 'Intel Core i5-12600K', type: 'cpu', price: 289, specs: '6 cores, 12 threads, 3.7GHz base' },
  { id: 4, name: 'AMD Ryzen 5 7600X', type: 'cpu', price: 299, specs: '6 cores, 12 threads, 4.7GHz boost' },
  { id: 5, name: 'Intel Core i7-13700K', type: 'cpu', price: 389, specs: '16 cores, 24 threads, 3.4GHz base' },
  { id: 6, name: 'AMD Ryzen 7 7800X3D', type: 'cpu', price: 449, specs: '8 cores, 16 threads, 4.2GHz boost' },

  // GPUs
  { id: 7, name: 'NVIDIA GTX 1650', type: 'gpu', price: 149, specs: '4GB GDDR5, 128-bit bus' },
  { id: 8, name: 'AMD Radeon RX 6500 XT', type: 'gpu', price: 159, specs: '4GB GDDR6, 64-bit bus' },
  { id: 9, name: 'NVIDIA RTX 4060', type: 'gpu', price: 299, specs: '8GB GDDR6, 128-bit bus' },
  { id: 10, name: 'AMD Radeon RX 7800 XT', type: 'gpu', price: 499, specs: '16GB GDDR6, 256-bit bus' },
  { id: 11, name: 'NVIDIA RTX 4070', type: 'gpu', price: 599, specs: '12GB GDDR6X, 192-bit bus' },
  { id: 12, name: 'NVIDIA RTX 4080', type: 'gpu', price: 1199, specs: '16GB GDDR6X, 256-bit bus' },

  // RAM
  { id: 13, name: 'Patriot 8GB DDR4-2666', type: 'ram', price: 39, specs: '8GB, DDR4-2666' },
  { id: 14, name: 'Corsair Vengeance 16GB DDR4-3200', type: 'ram', price: 89, specs: '16GB (2x8GB), DDR4-3200' },
  { id: 15, name: 'G.Skill Ripjaws V 32GB DDR4-3600', type: 'ram', price: 149, specs: '32GB (2x16GB), DDR4-3600' },
  { id: 16, name: 'Corsair Dominator 64GB DDR5-5600', type: 'ram', price: 399, specs: '64GB (2x32GB), DDR5-5600' },

  // Storage
  { id: 17, name: 'Kingston A2000 250GB NVMe SSD', type: 'storage', price: 39, specs: '250GB, PCIe 3.0, up to 2200MB/s' },
  { id: 18, name: 'WD Blue 500GB SATA SSD', type: 'storage', price: 49, specs: '500GB, SATA, 560MB/s' },
  { id: 19, name: 'Samsung 970 EVO 500GB NVMe SSD', type: 'storage', price: 79, specs: '500GB, PCIe 3.0, up to 3400MB/s' },
  { id: 20, name: 'WD Black SN850X 1TB NVMe SSD', type: 'storage', price: 129, specs: '1TB, PCIe 4.0, up to 6600MB/s' },
  { id: 21, name: 'Seagate Barracuda 2TB HDD', type: 'storage', price: 59, specs: '2TB, 7200RPM, 256MB cache' },

  // Motherboards
  { id: 22, name: 'ASRock A520M-HDV', type: 'motherboard', price: 69, specs: 'AM4, DDR4, USB 3.2' },
  { id: 23, name: 'Gigabyte B660M DS3H', type: 'motherboard', price: 119, specs: 'LGA1700, DDR4, PCIe 4.0' },
  { id: 24, name: 'ASUS Prime B660M-A WiFi', type: 'motherboard', price: 149, specs: 'LGA1700, WiFi 6, USB 3.2' },
  { id: 25, name: 'MSI MAG B550 Tomahawk', type: 'motherboard', price: 179, specs: 'AM4, PCIe 4.0, USB 3.2 Gen2' },
  { id: 26, name: 'ASUS ROG Strix Z690-E', type: 'motherboard', price: 329, specs: 'LGA1700, WiFi 6E, Thunderbolt 4' },

  // Power Supplies
  { id: 27, name: 'EVGA 500 W1', type: 'psu', price: 49, specs: '500W, 80+ White, Non-Modular' },
  { id: 28, name: 'Thermaltake Smart 500W', type: 'psu', price: 59, specs: '500W, 80+ Bronze, Semi-Modular' },
  { id: 29, name: 'Corsair RM650x', type: 'psu', price: 129, specs: '650W, 80+ Gold, Fully Modular' },
  { id: 30, name: 'Seasonic Focus GX-750', type: 'psu', price: 149, specs: '750W, 80+ Gold, Fully Modular' },
  { id: 31, name: 'Corsair HX1000i', type: 'psu', price: 299, specs: '1000W, 80+ Platinum, Fully Modular' },

  // Cases
  { id: 32, name: 'Thermaltake Versa H18', type: 'case', price: 44, specs: 'Micro-ATX, Tempered Glass' },
  { id: 33, name: 'Cougar MX330', type: 'case', price: 49, specs: 'Mid Tower, Mesh Front Panel' },
  { id: 34, name: 'Corsair 4000D Airflow', type: 'case', price: 89, specs: 'Mid Tower, Tempered Glass, White' },
  { id: 35, name: 'Fractal Design Meshify C Mini', type: 'case', price: 99, specs: 'Mini-ITX/Micro-ATX, Tempered Glass' },
  { id: 36, name: 'Lian Li PC-O11 Dynamic', type: 'case', price: 149, specs: 'Mid Tower, Tempered Glass, Excellent Airflow' }
];

module.exports = components;
