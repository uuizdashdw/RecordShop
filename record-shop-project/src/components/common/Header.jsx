import React from 'react';

// CSS
import styles from './header.module.css';

// Hooks
import { useEffect } from 'react';

// Component
import Logo from './Logo';

// Link
import Link from 'next/link';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, signout } from '@/store';

// Router
import { useRouter } from 'next/router';

const Header = React.memo(function Header({ replace, user, setUser }) {
	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.userInfo.userInfo);

	// const router = useRouter();

	const gnbItem = [
		{ name: 'Korean', link: '/product/korean' },
		{ name: 'Hip Hop / R&B', link: '/product/hiphop&rnb' },
		{ name: 'Beats / Instrumental', link: '/product/beats&instrumental' },
		{ name: 'Jazz', link: '/product/jazz' },
		{ name: 'Nu Disco / Modern Funk', link: '/product/nu_disco&modern_funk' },
		{ name: 'Soul / Funk / Disco', link: '/product/soul&funk&disco' },
		{ name: 'Rock / Pop', link: '/product/rock&pop' },
		{ name: 'Soundtrack', link: '/product/soundtrack' },
	];

	useEffect(() => {
		const users = JSON.parse(localStorage.getItem('userInfo')) || [];
		if (!userInfo && users.length) {
			dispatch(setUserInfo(users));
		}
	}, [userInfo]);

	const isSignOut = () => {
		dispatch(signout());
		alert('로그아웃 되었습니다');
		setUser(null);
		replace('/auth/signin');
	};

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<Link href={'/'}>
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
								<Link href={'/auth/signin'}>로그인</Link>
							</li>
							<li>
								<Link href={'/auth/signup'}>회원가입</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<span style={{ fontSize: '14px' }}>{user.userName} 님</span>
							</li>
							<li>
								<button className={styles.signout_button} onClick={isSignOut}>
									로그아웃
								</button>
							</li>
						</>
					)}
					<li>
						<Link href={'/cart'}>장바구니</Link>
					</li>
				</ul>
			</div>
		</header>
	);
});

export default Header;
