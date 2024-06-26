import useCustomLogin from "../../hooks/useCustomLogin";
const { Link } = require("react-router-dom");

const BasicMenu = () => {
  // loginslice로 부터 상태 가져오기[Redux]
  // const loginState = useSelector((state) => state.loginSlice);
  // loginslice로 부터 상태 가져오기[Recoil]
  const { loginState } = useCustomLogin();
  return (
    <nav id="navbar" className="flex bg-blue-300">
      <div className="w-4/5 bg-gray-500">
        <ul className="flex p-4 text-white font-bold">
          <li className="pr-6 text-2xl">
            <Link to={"/"}>Main</Link>
          </li>
          <li className="pr-6 text-2xl">
            <Link to={"/about"}>About</Link>
          </li>
          {loginState.email ? (
            <>
              <li className="pr-6 text-2xl">
                <Link to={"/todo"}>Todo</Link>
              </li>
              <li className="pr-6 text-2xl">
                <Link to={"/products"}>Products</Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>

      <div className="w-1/5 flex justify-end bg-orange-300 p-4 font-medium">
        {/* 로그인 상태가 아니라면 Login 버튼이 나타나도록 */}
        {!loginState.email ? (
          <div className="text-white text-sm m-1 rounded">
            <Link to={`/member/login`}>Login</Link>
          </div>
        ) : (
          <div className="text-white text-sm m-1 rounded">
            <Link to={`/member/logout`}>Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default BasicMenu;
