import React from "react";

// CSS
import styles from "./header.module.css";

// Hooks
import { useEffect } from "react";

// Component
import Logo from "./Logo";

// Link
import Link from "next/link";

// Redux
import { useDispatch } from "react-redux";
import { signout } from "@/store";

import { useRouter } from "next/router";

const Header = React.memo(function Header({ user, setUser }) {
  const dispatch = useDispatch();

  const router = useRouter();

  const gnbItem = [
    { name: "Korean", link: "/product/korean" },
    { name: "Hip Hop / R&B", link: "/product/hiphop&rnb" },
    { name: "Beats / Instrumental", link: "/product/beats&instrumental" },
    { name: "Jazz", link: "/product/jazz" },
    { name: "Nu Disco / Modern Funk", link: "/product/nu_disco&modern_funk" },
    { name: "Soul / Funk / Disco", link: "/product/soul&funk&disco" },
    { name: "Rock / Pop", link: "/product/rock&pop" },
    { name: "Soundtrack", link: "/product/soundtrack" },
  ];

  const isSignOut = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      dispatch(signout());
      alert("로그아웃 되었습니다");
      setUser(null);
      router.replace("/auth/signin");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={"/"}>
          <Logo />
        </Link>
        <ul className={styles.gnb}>
          {gnbItem.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <ul className={styles.auth}>
          {!user ? (
            <>
              <li>
                <Link href={"/auth/signin"}>로그인</Link>
              </li>
              <li>
                <Link href={"/auth/signup"}>회원가입</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link style={{ fontSize: "14px" }} href={"/mypage"}>
                  {user.userName} 님
                </Link>
              </li>
              <li>
                <button className={styles.signout_button} onClick={isSignOut}>
                  로그아웃
                </button>
              </li>
            </>
          )}
          <li>
            <Link href={"/cart"}>장바구니</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});

export default Header;
