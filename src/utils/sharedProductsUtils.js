// Shared products utilities
export const getSharedProducts = (userId) => {
  try {
    const shared = localStorage.getItem(`shared_products_${userId}`);
    return shared ? JSON.parse(shared) : [];
  } catch (error) {
    console.error('Error loading shared products:', error);
    return [];
  }
};

export const addSharedProduct = (userId, product) => {
  try {
    const shared = getSharedProducts(userId);
    const exists = shared.find(item => item.id === product.id);
    if (!exists) {
      const sharedProduct = {
        ...product,
        sharedAt: new Date().toISOString(),
      };
      shared.push(sharedProduct);
      localStorage.setItem(`shared_products_${userId}`, JSON.stringify(shared));
    }
    return shared;
  } catch (error) {
    console.error('Error adding shared product:', error);
    throw error;
  }
};

export const removeSharedProduct = (userId, productId) => {
  try {
    const shared = getSharedProducts(userId);
    const filtered = shared.filter(item => item.id !== productId);
    localStorage.setItem(`shared_products_${userId}`, JSON.stringify(filtered));
    return filtered;
  } catch (error) {
    console.error('Error removing shared product:', error);
    throw error;
  }
};
