// CSS
import styles from './header.module.css';

// Hooks
import { useEffect, useState } from 'react';

// Link
import Link from 'next/link';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, signout } from '@/store';

const Header = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.userInfo.userInfo);
	const [isUserInfo, setUserInfo] = useState({});
	const [isUser, setIsUser] = useState(false);

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
		// const userInfo = localStorage.getItem('userInfo');
		// if (userInfo) {
		// 	setUserInfo(userInfo);
		// 	setIsUser(true);
		// } else {
		// 	setUserInfo({});
		// 	setIsUser(false);
		// }
		dispatch(getUserInfo());
	}, [dispatch]);

	const isSignOut = () => {
		dispatch(signout());
	};

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<Link className={styles.logo} href={'/'}></Link>
				<ul className={styles.gnb}>
					{gnbItem.map((item, index) => (
						<li key={index}>
							<Link href={item.link}>{item.name}</Link>
						</li>
					))}
				</ul>
				<ul className={styles.auth}>
					{!isUser ? (
						<>
							<li>
								<Link href={'/'}>로그인</Link>
							</li>
							<li>
								<Link href={'/auth/signup'}>회원가입</Link>
							</li>
						</>
					) : (
						<>
							<li>{userInfo.userName} 님 환영합니다!</li>
							<li>
								<Link href={'/'}>로그아웃</Link>
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
};

export default Header;
