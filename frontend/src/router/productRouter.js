import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const ProductList = lazy(() => import("../pages/products/ListPage"));
const productRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ProductList></ProductList>
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="list"></Navigate>,
    },
  ];
};

export default productRouter;
