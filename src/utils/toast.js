import { toast } from 'react-hot-toast';

const luxuryToastConfig = {
  style: {
    background: '#1B1B1B',
    color: '#F8F8F8',
    border: '1px solid rgba(201, 162, 39, 0.35)',
    borderRadius: '0px', // Luxury styling with clean minimalist sharp corners
    fontSize: '11px',
    fontFamily: '"Poppins", sans-serif',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '14px 24px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65)',
  },
  iconTheme: {
    primary: '#C9A227', // Luxury gold icon accents
    secondary: '#1B1B1B',
  },
  duration: 3000,
};

export const showSuccess = (message) => {
  toast.success(message, luxuryToastConfig);
};

export const showError = (message) => {
  toast.error(message, {
    ...luxuryToastConfig,
    iconTheme: {
      primary: '#EF4444', // Red for errors
      secondary: '#1B1B1B',
    },
    style: {
      ...luxuryToastConfig.style,
      border: '1px solid rgba(239, 68, 68, 0.35)',
    },
  });
};

export const showInfo = (message) => {
  toast(message, {
    ...luxuryToastConfig,
    icon: '✨',
  });
};

// Domain-specific custom luxury notification helpers
export const toastAddedToCart = (title) => {
  showSuccess(`${title} added to bag`);
};

export const toastRemovedFromCart = (title) => {
  showSuccess(`${title} removed from bag`);
};

export const toastAddedToWishlist = (title) => {
  showInfo(`${title} saved to wishlist`);
};

export const toastRemovedFromWishlist = (title) => {
  showInfo(`${title} removed from wishlist`);
};

export const toastLoginSuccess = (username) => {
  showSuccess(`Welcome back, ${username || 'Guest'}`);
};

export const toastLogoutSuccess = () => {
  showSuccess('Logged out successfully');
};
