import React, { useState } from "react";  // ✅ 추가
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");  // ✅ 비밀번호 상태
  const [passwordConfirm, setPasswordConfirm] = useState("");  // ✅ 비밀번호 확인 상태
  const [passwordError, setPasswordError] = useState(false);  // ✅ 에러 표시 여부

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setPasswordError(true);       // 에러 상태로 전환
      setPasswordConfirm("");       // 비밀번호 확인 입력값 초기화
      return;                       // 이동 중단
    }

    // 비밀번호가 일치할 경우 페이지 이동
    navigate("/");
  };

  return (
    <div className="BackgroundSign">
      <div className="parent">
        <div className="signup-wrapper">
          <h2 className="welcometext">회원가입</h2>

          <form 
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} 
            onSubmit={handleSubmit}
          >
            <div className="id">
              <input type="text" placeholder="아이디" />
            </div> 

            <div className="password">
              <input 
                type="password" 
                placeholder="비밀번호" 
                value={password} 
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);  // 입력 시 에러 메시지 제거
                }} 
              />
            </div>

            <div className="password1">
              <input 
                type="password" 
                placeholder={passwordError ? "비밀번호가 일치하지 않습니다." : "비밀번호 확인"} 
                value={passwordConfirm} 
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                  setPasswordError(false);  // 입력 시 에러 메시지 제거
                }} 
                style={passwordError ? { color: 'red' } : {}}  // 에러 시 빨간 글씨
              />
            </div>

            <div className="signup-name">
              <input type="text" placeholder="이름" />
            </div>

            <div className="email">
              <input type="email" placeholder="이메일" />
            </div>

            <div>
              <button type="submit" className="signbutton">회원가입 완료</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;