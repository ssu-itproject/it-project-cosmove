import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="leftbackground">
      <div className="login-container">
        <div className="teamName">CosMove</div>
        <div className="logtext">로그인</div>

        <form>
          <div className="emailin">
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className="inputfield"
            />
          </div>

          <div className="numberin">
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="inputfield"
            />
          </div>

          <div className="login-options">
            <label className="keep-logged-in">
              <input type="checkbox" className="checkbox" />
              <span>로그인 유지</span>
            </label>
            <button type="button" className="numberfind">
              비밀번호 찾기
            </button>
          </div>

          <div className="LoginButton" onClick={() => navigate("/home")}>로그인</div>

          <div className="bottom-links">
            <span
              className="signupbutton"
              onClick={() => navigate("/signup")}
            >
              회원 가입
            </span>
            <span className="emailfind">이메일 찾기</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;