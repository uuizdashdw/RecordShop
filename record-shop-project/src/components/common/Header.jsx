// CSS
import styles from './header.module.css';

// Link
import Link from 'next/link';

const Header = () => {
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
					<li>로그인</li>
					<li>
						<Link href={'/cart'}>장바구니</Link>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
