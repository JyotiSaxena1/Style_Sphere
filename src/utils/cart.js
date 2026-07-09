import { toastAddedToCart, toastRemovedFromCart } from './toast';

const CART_KEY = 'style-sphere-cart';

const initialCartItems = [
  {
    id: 1,
    title: 'Aurelia Trench Coat',
    subtitle: 'Classic tailored cashmere wool blend',
    brand: 'Prada',
    price: 380,
    color: 'Beige',
    size: 'M',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Sienna Leather Tote',
    subtitle: 'Italian full-grain calfskin bag',
    brand: 'Gucci',
    price: 520,
    color: 'Black',
    size: 'O/S',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop',
  },
];

export const getCart = () => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (stored === null) {
      localStorage.setItem(CART_KEY, JSON.stringify(initialCartItems));
      return initialCartItems;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading cart from localStorage', e);
    return initialCartItems;
  }
};

export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Error writing cart to localStorage', e);
  }
};

export const addToCart = (product, selectedSize = 'M', selectedColor = 'Default', quantity = 1) => {
  const cart = getCart();
  const existingIndex = cart.findIndex((item) => item.id === product.id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      subtitle: product.subtitle,
      brand: product.brand,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: product.image,
    });
  }

  saveCart(cart);
  toastAddedToCart(product.title);
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);
  const updated = cart.filter((item) => item.id !== productId);
  saveCart(updated);
  if (item) {
    toastRemovedFromCart(item.title);
  }
  return updated;
};

export const updateQuantity = (productId, change) => {
  const cart = getCart();
  const updated = cart.map((item) => {
    if (item.id === productId) {
      const newQty = Math.max(1, item.quantity + change);
      return { ...item, quantity: newQty };
    }
    return item;
  });
  saveCart(updated);
  return updated;
};
