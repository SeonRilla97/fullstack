import { useSearchParams } from "react-router-dom";
import { getAccessToken } from "../../api/kakaoApi";
import { useEffect } from "react";

const KakaoRedirectPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const authCode = searchParams.get("code");

  //인가 코드 변경 시 AccessToken 다시 받아오기
  useEffect(() => {
    getAccessToken(authCode).then((data) => {
      console.log(data);
    });
  }, [authCode]);
  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
