// Address management utilities
export const getAddresses = (userId) => {
  try {
    const addresses = localStorage.getItem(`addresses_${userId}`);
    return addresses ? JSON.parse(addresses) : [];
  } catch (error) {
    console.error('Error loading addresses:', error);
    return [];
  }
};

export const saveAddress = (userId, address) => {
  try {
    const addresses = getAddresses(userId);
    const newAddress = {
      id: address.id || `addr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...address,
    };
    
    // If this is set as default, remove default from others
    if (newAddress.isDefault) {
      addresses.forEach(addr => {
        if (addr.id !== newAddress.id) {
          addr.isDefault = false;
        }
      });
    }
    
    // If updating existing address
    const existingIndex = addresses.findIndex(addr => addr.id === newAddress.id);
    if (existingIndex >= 0) {
      addresses[existingIndex] = newAddress;
    } else {
      addresses.push(newAddress);
    }
    
    localStorage.setItem(`addresses_${userId}`, JSON.stringify(addresses));
    return newAddress;
  } catch (error) {
    console.error('Error saving address:', error);
    throw error;
  }
};

export const deleteAddress = (userId, addressId) => {
  try {
    const addresses = getAddresses(userId);
    const filtered = addresses.filter(addr => addr.id !== addressId);
    localStorage.setItem(`addresses_${userId}`, JSON.stringify(filtered));
    return filtered;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

export const setDefaultAddress = (userId, addressId) => {
  try {
    const addresses = getAddresses(userId);
    addresses.forEach(addr => {
      addr.isDefault = addr.id === addressId;
    });
    localStorage.setItem(`addresses_${userId}`, JSON.stringify(addresses));
    return addresses;
  } catch (error) {
    console.error('Error setting default address:', error);
    throw error;
  }
};

export const getDefaultAddress = (userId) => {
  const addresses = getAddresses(userId);
  return addresses.find(addr => addr.isDefault) || addresses[0] || null;
};
