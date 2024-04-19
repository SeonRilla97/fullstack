import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getCartItems, postChangeCart } from "../api/cartApi";
import { cartState } from "../atoms/cartState";

const useCustomCart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const queryClient = useQueryClient();

  const changeMutation = useMutation({
    mutationFn: (param) => postChangeCart(param),
    onSuccess: (result) => {
      setCartItems(result);
    },
  });

  const query = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (query.isSuccess || changeMutation.isSuccess) {
      queryClient.invalidateQueries("cart");
      setCartItems(query.data);
    }
  }, [query.isSuccess, query.data]);

  const changeCart = (param) => {
    changeMutation.mutate(param);
  };

  return { cartItems, changeCart };
};

export default useCustomCart;
