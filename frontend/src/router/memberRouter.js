import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Login = lazy(() => import("../pages/member/LoginPage"));
const Logout = lazy(() => import("../pages/member/LogoutPage"));
const Loading = <div>Loading...</div>;

const memberRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "logout",
      element: (
        <Suspense fallback={Loading}>
          <Logout />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
