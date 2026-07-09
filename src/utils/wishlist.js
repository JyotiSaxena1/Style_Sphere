const WISHLIST_KEY = 'style-sphere-wishlist';

const defaultWishlistProducts = [
  {
    id: 1,
    title: 'Aurelia Trench Coat',
    subtitle: 'Classic tailored cashmere wool blend',
    category: 'Women',
    brand: 'Prada',
    price: 380,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Sienna Leather Tote',
    subtitle: 'Italian full-grain calfskin bag',
    category: 'Accessories',
    brand: 'Gucci',
    price: 520,
    originalPrice: 680,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Chronos Gold Watch',
    subtitle: 'Automatic movement Swiss timepiece',
    category: 'Accessories',
    brand: 'Dior',
    price: 890,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 11,
    title: 'Athena Velvet Gown',
    subtitle: 'Midnight blue floor-length velvet evening gown',
    category: 'Women',
    brand: 'Chanel',
    price: 790,
    originalPrice: 950,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
  },
];

export const getWishlist = () => {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored === null) {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(defaultWishlistProducts));
      return defaultWishlistProducts;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading wishlist from localStorage', e);
    return defaultWishlistProducts;
  }
};

export const saveWishlist = (wishlist) => {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  } catch (e) {
    console.error('Error writing wishlist to localStorage', e);
  }
};

import { toastAddedToWishlist, toastRemovedFromWishlist } from './toast';

export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  const exists = wishlist.some((item) => item.id === product.id);

  if (!exists) {
    wishlist.push(product);
    saveWishlist(wishlist);
    toastAddedToWishlist(product.title);
  }
  return wishlist;
};

export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();
  const item = wishlist.find((item) => item.id === productId);
  const updated = wishlist.filter((item) => item.id !== productId);
  saveWishlist(updated);
  if (item) {
    toastRemovedFromWishlist(item.title);
  }
  return updated;
};

export const isWishlisted = (productId) => {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.id === productId);
};
