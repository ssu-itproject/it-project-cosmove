import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="Background"> {/* 배경 클래스 적용 */}
      <header className="barheader">
        <div className="price">
          <span className="pricetext">가격플랜</span>
          <Link to="/login" className="logintext">로그인</Link>
        </div>

        {/* 회원가입 버튼 */}
        <Link to="/signup" className="signuptext">
          회원가입
        </Link>
      </header>

      <main>
        <h1 className="bigtext">웹서비스 핵심 카피라이팅</h1>
        <Link to="/signup">
          <button className="signupbutton">회원가입</button>
        </Link>
      </main>

      <section className="feature-section">
        <h2 className="text1">이러한 효과를 경험할 수 있으실 겁니다.</h2>
        <ul className="feature-list">
          <li>할 일의 시각화</li>
          <li>생산성 향상</li>
          <li>시간 관리 능력 향상</li>
        </ul>
      </section>
    </div>
  );
}

export default LandingPage;