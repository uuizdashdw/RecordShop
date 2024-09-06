// CSS
import styles from './signin.module.css';

// Components
import AuthLayout from '@/layouts/AuthLayout';
import Loading from '@/components/common/Loading';

// Hooks
import { useState, useEffect, useRef } from 'react';

// Router
import { useRouter } from 'next/router';

// API
import { fetchUserLogin } from '../api';

// Redux 
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store';

const SignInPage = ({ setUser }) => {
	const [formData, setFormData] = useState({
		account: '',
		password: '',
	});

	// 아이디 기억하기
	const [isRemember, setIsRemember] = useState(false);

	const accountRef = useRef(null);

	const router = useRouter();
	const dispatch = useDispatch();

	// 페이지 진입 유효성 검사
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));

		if(user) router.replace('/')
	}, [router]);

	const onChangeFormData = event => {
		const { name, value } = event.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	// 아이디 기억 로직
	const isCheckAccountRemember = (checked, userAccount) => {
		const rememberInfo = {
			remember: true,
			userAccount,
		};

		localStorage.setItem(
			'remember',
			JSON.stringify(
				checked ? rememberInfo : { remember: false, userAccount: '' },
			),
		);
	};

	// 첫 마운트
	useEffect(() => {
		const rememberInfo = JSON.parse(localStorage.getItem('remember')) || {
			remember: false,
			userAccout: '',
		};
		setIsRemember(rememberInfo.remember);
		setFormData(prev => ({
			...prev,
			account: rememberInfo.userAccount,
		}));
	}, []);

	// 아이디 focusing
	useEffect(() => {
		if (accountRef.current) accountRef.current.focus();
	}, [formData.account]);

	// 로그인 로직
	const onSignIn = async event => {
		if (event) event.preventDefault();

		const { account, password } = formData;

		if (!account || !password)
			return alert('아이디와 비밀번호를 입력해 주세요.');

		try {
			const userInfo = await fetchUserLogin(account, password);

			if (userInfo) {
				isCheckAccountRemember(isRemember, account);
				dispatch(setUserInfo(userInfo));
				setUser(JSON.parse(localStorage.getItem('user')));
				alert(`${userInfo.userName} 님 환영합니다!`);
				setTimeout(() => router.replace('/'), 0);
			} else {
				alert('아이디 혹은 비밀번호를 확인해주세요!');
				setFormData({
					account: '',
					password: '',
				});
			}
		} catch (reason) {
			console.error('로그인 중 오류 발생 ::: ', reason);
			alert('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
		}
	};

	const onEnterSignin = event => {
		if (event.key === 'Enter') {
			event.preventDefault();
			onSignIn();
		}
	};

	
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
								ref={accountRef}
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
	
};

export default SignInPage;
