import { API_SERVER_HOST } from "./todoApi";
import Axios from "axios";

const host = `${API_SERVER_HOST}/api/member`;

// 비동기 로그인 처리
export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();

  form.append("username", loginParam.email);
  form.append("password", loginParam.pw);

  const res = await Axios.post(`${host}/login`, form, header);

  return res.data;
};
