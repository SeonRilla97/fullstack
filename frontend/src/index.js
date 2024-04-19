import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  // Redux
  //Store 설정 완료 , 상태 데이터 관리를 위한 리듀서가 필요
  //Store : 창고
  //Reducer : 창고 지킴이

  //Recoil
  //Atoms : 데이터 , useRecoilState : useState 확장판
  // <Provider store={store}>
  <RecoilRoot>
    <App />
  </RecoilRoot>
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
