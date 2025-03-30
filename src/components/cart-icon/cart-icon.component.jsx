import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles.jsx";

const Cart = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default Cart;
