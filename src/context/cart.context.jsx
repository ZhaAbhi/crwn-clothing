import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //find if cart items contains productToAdd
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  //If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => (cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
  }
  //return new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
  //check if quantity is equal to 1, if it is remove that from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // return back cart item with matching cart item with reduced quantity
  return cartItems.map((cartItem) => (cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem));
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemToCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemToCart, cartItems, cartCount, cartTotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
