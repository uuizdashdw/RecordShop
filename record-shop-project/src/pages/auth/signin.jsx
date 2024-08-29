// CSS
import styles from './signin.module.css';

// Components
import AuthLayout from '@/layouts/AuthLayout';
import Loading from '@/components/common/Loading';

// Hooks
import { useState, useEffect } from 'react';

// Router
import { useRouter } from 'next/router';

// Redux
import { useDispatch } from 'react-redux';
import { signin } from '@/store';

const SignInPage = ({ setUser }) => {
	const [formData, setFormData] = useState({
		account: '',
		password: '',
	});

	// 아이디 기억하기
	const [isRemember, setIsRemember] = useState(false);

	const router = useRouter();
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);

	// 페이지 진입 유효성 검사
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));

		user ? router.replace('/') : setIsLoading(false);
	}, [router]);

	const onChangeFormData = event => {
		const { name, value } = event.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	// 아이디 기억 로직
	const isCheckAccountRemember = checked => {
		checked && localStorage.setItem('remember', true);
		!checked && localStorage.setItem('remember', false);
	};

	useEffect(() => {
		const isCheck = JSON.parse(localStorage.getItem('remember'));
		setIsRemember(isCheck);
	}, []);

	// 로그인 유저 아이디 찾기
	const findUserIndex = userList => {
		const { account, password } = formData;

		return userList.findIndex(
			user => user.userAccount === account && user.userPassword === password,
		);
	};

	// 로그인 로직
	const onSignIn = event => {
		if (event) event.preventDefault();
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		const index = findUserIndex(userInfo);

		const { userAccount, userPassword, userName } = userInfo[index];
		const { account, password } = formData;

		if (!userInfo) return alert('사용자 정보가 없습니다');

		if (userAccount === account && userPassword === password) {
			isCheckAccountRemember(isRemember);
			dispatch(signin(userInfo));
			localStorage.setItem('user', JSON.stringify(userInfo[index]));
			setUser(userInfo[index]);
			alert(`${userName} 님 환영합니다`);
			router.replace('/');
		} else {
			alert('아이디 혹은 비밀번호를 확인해주세요');
			setFormData({
				account: '',
				password: '',
			});
		}
	};

	const onEnterSignin = event => {
		if (event.key === 'Enter') {
			event.preventDefault();
			onSignIn();
		}
	};

	useEffect(() => {
		console.log('## 로그인 정보 ==> ', formData);
	}, [formData]);

	if (isLoading) {
		return (
			<AuthLayout>
				<Loading reason={'유효하지 않은 접근입니다.'} />
			</AuthLayout>
		);
	} else {
		return (
			<AuthLayout>
				<div className={styles.container}>
					<h3 className={styles.title}>로그인</h3>
					<form onSubmit={e => e.preventDefault()} className={styles.form}>
						<div className={styles.input_wrapper}>
							<label htmlFor="userAccount" className={styles.label}>
								아이디
							</label>
							<input
								type="text"
								name="account"
								value={formData.account}
								className={styles.input}
								onChange={event => onChangeFormData(event)}
							/>
						</div>
						<div className={styles.input_wrapper}>
							<label htmlFor="userPassword" className={styles.label}>
								비밀번호
							</label>
							<input
								type="password"
								name="password"
								maxLength={12}
								value={formData.password}
								className={styles.input}
								onKeyDown={event => onEnterSignin(event)}
								onChange={event => onChangeFormData(event)}
							/>
						</div>
						<div className={styles.btn_wrapper}>
							<button className={styles.signin_button} onClick={onSignIn}>
								로그인
							</button>
							<div className={styles.checkbox_wrapper}>
								<input
									id="save_userAccount"
									type="checkbox"
									value={isRemember}
									checked={isRemember}
									className={styles.checkbox}
									onChange={() => setIsRemember(!isRemember)}
								/>
								<label
									htmlFor="save_userAccount"
									className={styles.checkbox_label}
								>
									<span>아이디 기억하기</span>
								</label>
							</div>
						</div>
					</form>
				</div>
			</AuthLayout>
		);
	}
};

export default SignInPage;
