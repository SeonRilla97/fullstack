import { atom } from "recoil";
import { getCookie } from "../util/cookieUtil";

const initState = {
  email: "",
  nickname: "",
  social: false,
  accessToken: "",
  refreshToken: "",
};

const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  //   console.log(`memberInfo GetCookie Test : ${memberInfo}`);
  //   console.log(memberInfo.nickname);
  //닉네임처리라는데 Email도 이러면 decode 안되면 못쓰는게 정상일텐데 왜 nickname만 했으며, 별도의 설정없이 왜 cookie가 자동 decode 되는지?
  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }
  console.log(memberInfo);

  return memberInfo;
};

//key : 이름, default: 초기값
const signinState = atom({
  key: "signinState",
  default: loadMemberCookie() || initState,
});

export default signinState;
