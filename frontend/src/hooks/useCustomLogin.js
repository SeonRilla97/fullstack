import { Navigate, createSearchParams, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { loginPost } from "../api/memberApi";
import { cartState } from "../atoms/cartState";
import signinState from "../atoms/signinState";
import { removeCookie, setCookie } from "../util/cookieUtil";

const useCustomLogin = () => {
  const navigate = useNavigate();

  const [loginState, setLoginState] = useRecoilState(signinState);
  const resetState = useResetRecoilState(signinState);
  const resetCartState = useResetRecoilState(cartState);
  const isLogin = loginState.email ? true : false;

  const exceptionHandle = (ex) => {
    console.log("Exception -------------");

    console.log(ex);

    const errorMsg = ex.response.data.error;

    const errorStr = createSearchParams({ error: errorMsg }).toString();

    if (errorMsg === "REQUIRE_LOGIN") {
      alert("로그인 해야만 합니다.");
      navigate({ pathname: "/member/login", search: errorStr });
      return;
    }

    if (errorMsg === "ERROR_ACCESSDENIED") {
      alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
      navigate({ pathname: "/member/login", search: errorStr });
      return;
    }
  };

  const doLogin = async (loginParam) => {
    // const action = await dispatch(loginPostAsync(loginParam));
    const result = await loginPost(loginParam);

    console.log(result);

    saveAsCookie(result);
    return result;
  };

  const saveAsCookie = (data) => {
    setCookie("member", JSON.stringify(data), 1); // 1일

    setLoginState(data);
  };

  const doLogout = () => {
    //로그아웃
    // dispatch(logout());

    removeCookie("member");
    resetState();
    resetCartState();
  };

  const moveToPath = (path) => {
    navigate({ pathname: path }, { replace: true }); // 페이지 이동
  };

  const moveToLogin = () => {
    navigate({ pathname: `/member/login` }, { replace: true }); //로그인 페이지로 이동
  };

  const moveToLoginReturn = () => {
    //로그인 페이지 이동 컴포넌트
    return <Navigate replace to="/member/login" />;
  };

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    exceptionHandle,
    saveAsCookie,
  };
};

export default useCustomLogin;
