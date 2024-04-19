import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useMemo } from "react";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";
import { useRecoilValue } from "recoil";
import { cartTotalState } from "../../atoms/cartState";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();

  const { cartItems, changeCart } = useCustomCart();

  const totalValue = useRecoilValue(cartTotalState);

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex flex-col">
          <div className="flex w-full">
            <div className="w-4/5 text-2xl font-extrabold">
              {loginState.nickname}'s Cart
            </div>

            <div className="bg-orange-600 w-9 text-center text-white w-1/5 font-bold rounded-full m-1">
              {cartItems.length}
            </div>
          </div>

          <div>
            <ul>
              {cartItems.map((item) => (
                <CartItemComponent
                  {...item}
                  key={item.cino}
                  changeCart={changeCart}
                  email={loginState.email}
                />
              ))}
            </ul>

            <div className="text-2xl text-right font-extrabold">
              TOTAL : {totalValue}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CartComponent;
