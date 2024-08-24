// CSS
import Link from 'next/link';
import styles from './footer.module.css';

// Link

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<ul className={styles.list}>
					<li>
						<Link href={'/'}>STORE</Link>
					</li>
					<li>
						<Link href={'/'}>이용약관</Link>
					</li>
					<li>
						<Link href={'/'}>개인정보처리방침</Link>
					</li>
					<li>
						<Link href={'/'}>사업자정보확인</Link>
					</li>
				</ul>
				<address className={styles.address}>
					상호 : 주식회사 위즈레코즈 | 주소 : 경기도 군포시 금정동 |
					개인정보관리책임자 : 강 찬웅 | 전화 : 010-7644-9492 | 이메일 :
					chany920@gmail.com
				</address>
				<div className={styles.about_company}>
					대표 : 강 찬웅 | 사업자등록번호 : 111-11-11111 | 통신판매 : 처리중 |
					호스팅제공자 : 강 찬웅
				</div>
			</div>
		</footer>
	);
};

export default Footer;
