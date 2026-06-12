const axios = require('axios');

const marketplaceSources = (process.env.COMPONENT_MARKETPLACE_SOURCES || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);

const FALLBACK_MARKETPLACE_COMPONENTS = [
  {
    id: 'gpu-4070-ti',
    name: 'NVIDIA GeForce RTX 4070 Ti',
    category: 'gpu',
    type: 'gpu',
    manufacturer: 'NVIDIA',
    price: 799.99,
    description: 'Placa gráfica de alto desempenho para jogos e criação de conteúdo com 12GB de memória GDDR6X.',
    specifications: '12GB GDDR6X, 7680 núcleos CUDA, ray tracing avançado',
    image_url: 'https://via.placeholder.com/400x260.png?text=RTX+4070+Ti',
    image_alt: 'Placa gráfica NVIDIA GeForce RTX 4070 Ti',
    linkCompra: 'https://www.example.com/product/rtx-4070-ti',
    tdp: '285W',
    rating: 4.8,
    in_stock: true,
  },
  {
    id: 'cpu-13700k',
    name: 'Intel Core i7-13700K',
    category: 'cpu',
    type: 'cpu',
    manufacturer: 'Intel',
    price: 419.99,
    description: 'Processador Intel de 16 núcleos com alto desempenho em jogos e multitarefa.',
    specifications: '16 núcleos, 24 threads, frequência até 5.4GHz',
    image_url: 'https://via.placeholder.com/400x260.png?text=Intel+Core+i7-13700K',
    image_alt: 'Processador Intel Core i7-13700K',
    linkCompra: 'https://www.example.com/product/intel-i7-13700k',
    tdp: '125W',
    rating: 4.6,
    in_stock: true,
  },
  {
    id: 'ram-32gb-3600',
    name: 'Corsair Vengeance 32GB DDR4 3600MHz',
    category: 'ram',
    type: 'ram',
    manufacturer: 'Corsair',
    price: 149.99,
    description: 'Memória RAM rápida e estável, ideal para jogos e edição de vídeo.',
    specifications: '32GB (2x16GB), DDR4, 3600MHz',
    image_url: 'https://via.placeholder.com/400x260.png?text=Corsair+32GB+3600MHz',
    image_alt: 'Memória RAM Corsair Vengeance 32GB 3600MHz',
    linkCompra: 'https://www.example.com/product/corsair-vengeance-32gb',
    tdp: '1.35V',
    rating: 4.7,
    in_stock: true,
  },
  {
    id: 'ssd-1tb',
    name: 'Samsung 980 Pro 1TB NVMe',
    category: 'storage',
    type: 'storage',
    manufacturer: 'Samsung',
    price: 139.99,
    description: 'SSD NVMe de alta velocidade para tempos de carregamento ultrarrápidos.',
    specifications: '1TB, NVMe PCIe 4.0, até 7000 MB/s',
    image_url: 'https://via.placeholder.com/400x260.png?text=Samsung+980+Pro+1TB',
    image_alt: 'SSD Samsung 980 Pro 1TB',
    linkCompra: 'https://www.example.com/product/samsung-980-pro-1tb',
    tdp: '8W',
    rating: 4.9,
    in_stock: true,
  },
  {
    id: 'mb-z790',
    name: 'ASUS ROG Strix Z790-E Gaming',
    category: 'motherboard',
    type: 'motherboard',
    manufacturer: 'ASUS',
    price: 329.99,
    description: 'Motherboard premium para processadores Intel com conectividade avançada.',
    specifications: 'LGA1700, DDR5, Wi-Fi 6E, PCIe 5.0',
    image_url: 'https://via.placeholder.com/400x260.png?text=ASUS+ROG+Strix+Z790-E',
    image_alt: 'Motherboard ASUS ROG Strix Z790-E',
    linkCompra: 'https://www.example.com/product/asus-rog-strix-z790-e',
    tdp: 'N/A',
    rating: 4.5,
    in_stock: true,
  },
];

function extractFirstImageUrl(item) {
  if (!item || typeof item !== 'object') return null;

  const direct =
    item.image_url ||
    item.imageUrl ||
    item.image_src ||
    item.imageSrc ||
    item.img ||
    item.image ||
    item.picture ||
    item.thumbnail ||
    item.thumb ||
    item.coverImage ||
    item.cover_image ||
    item.mediaUrl ||
    item.media_url ||
    item.urlImage ||
    item.product_image ||
    item.productImage;

  if (typeof direct === 'string' && direct.trim()) return direct.trim();

  // arrays
  if (Array.isArray(item.images) && item.images.length) {
    const v = item.images[0]?.url || item.images[0]?.image_url || item.images[0]?.src || item.images[0];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }

  if (Array.isArray(item.image_list) && item.image_list.length) {
    const v = item.image_list[0]?.url || item.image_list[0]?.src || item.image_list[0];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }

  // nested objects
  if (item.image && typeof item.image === 'object') {
    const v = item.image.url || item.image.image_url || item.image.src;
    if (typeof v === 'string' && v.trim()) return v.trim();
  }

  if (item.media && typeof item.media === 'object') {
    const v = item.media.url || item.media.src;
    if (typeof v === 'string' && v.trim()) return v.trim();
  }

  return null;
}

function normalizeComponentItem(item) {
  const imageUrl = extractFirstImageUrl(item);

  return {
    id: item.id || item.sku || item.productId || item.name,
    name: item.name || item.title || item.product_name || 'Componente',
    category: item.category || item.type || 'all',
    type: item.type || item.category || 'all',
    manufacturer: item.manufacturer || item.brand || 'Fabricante Desconhecido',
    price: parseFloat(item.price ?? item.amount ?? item.cost) || 0,
    description: item.description || item.summary || '',
    specifications: item.specifications ? JSON.stringify(item.specifications) : item.specs || item.details || '',
    image_url: imageUrl || null,
    image_alt:
      item.image_alt ||
      item.imageAlt ||
      item.alt ||
      item.imageTitle ||
      item.name ||
      'Imagem do componente',
    linkCompra: item.linkCompra || item.buyLink || item.url || item.product_url || '',
    tdp: item.tdp || item.power || null,
    rating:
      typeof item.rating === 'number'
        ? item.rating
        : parseFloat(item.reviewScore || item.stars) || null,
    in_stock: item.in_stock ?? item.available ?? true,
  };
}


async function fetchRemoteComponents() {
  if (!marketplaceSources.length) {
    return null;
  }

  const responses = await Promise.allSettled(
    marketplaceSources.map(async (url) => {
      const res = await axios.get(url, {
        headers: { Accept: 'application/json' },
        timeout: 10000,
      });
      const data = res.data;
      return Array.isArray(data) ? data : data.components || [];
    })
  );

  const items = responses
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value || []);

  return items.length > 0 ? items.map(normalizeComponentItem) : null;
}

async function getMarketplaceComponents() {
  const remote = await fetchRemoteComponents();
  if (remote && remote.length) {
    return remote;
  }
  return FALLBACK_MARKETPLACE_COMPONENTS;
}

module.exports = { getMarketplaceComponents, FALLBACK_MARKETPLACE_COMPONENTS };
