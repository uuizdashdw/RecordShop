// CSS
import styles from './signup.module.css';

// Components
import AuthLayout from '@/layouts/AuthLayout';
import AddressSearch from '@/components/address/AddressSearch';

// Hooks
import { useState, useEffect } from 'react';

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		userAccount: '',
		userPassword: '',
		userName: '',
		zonecode: '',
		userPhoneNumber: '',
		userAddress: '',
		userDetailAddress: '',
	});

	const [isWrongPassword, setIsWrongPassword] = useState(false);

	useEffect(() => {
		console.log('### formData ===> ', formData);
	}, [formData]);

	useEffect(() => {
		setUserZonecode(formData.zonecode);
	}, [formData.zonecode]);

	const onChangeUserInfo = event => {
		const { name, value } = event.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const isCheckingUserPassword = event => {
		const { value: password } = event.target;
		const { userPassword } = formData;

		userPassword !== password && password
			? setIsWrongPassword(true)
			: setIsWrongPassword(false);
	};

	const setUserZonecode = zonecode => {
		setFormData(prev => ({
			...prev,
			zonecode,
		}));
	};

	const onSubmitToSignUp = e => {
		e.preventDefault();

		const emptyField = [];
		for (const key in formData) {
			if (formData[key].trim() === '') emptyField.push(key);
		}

		if (emptyField.length) {
			console.log('비어있는 필드 ### => ', `${emptyField.join(', ')}`);
			return;
		}
	};

	return (
		<AuthLayout>
			<div className={styles.container}>
				<h3 className={styles.title}>회원가입</h3>

				<div className={styles.form_container}>
					<form className={styles.form_list}>
						<div>
							<label htmlFor="userAccount" className={styles.label}>
								아이디
							</label>
							<input
								type="text"
								name="userAccount"
								className={styles.form_data}
								value={formData.userAccount}
								onChange={event => onChangeUserInfo(event)}
							/>
						</div>
						<div>
							<label htmlFor="userPassword" className={styles.label}>
								비밀번호
							</label>
							<input
								type="text"
								name="userPassword"
								className={styles.form_data}
								value={formData.userPassword}
								onChange={event => onChangeUserInfo(event)}
							/>
						</div>
						<div>
							<label htmlFor="userPasswordCheck" className={styles.label}>
								비밀번호 확인
							</label>
							<input
								type="text"
								className={styles.form_data}
								onChange={event => isCheckingUserPassword(event)}
							/>
							{isWrongPassword && (
								<p className={styles.check_password}>
									비밀번호를 확인해주세요!
								</p>
							)}
						</div>
						<div>
							<label htmlFor="userName" className={styles.label}>
								이름
							</label>
							<input
								type="text"
								name="userName"
								className={styles.form_data}
								value={formData.userName}
								onChange={event => onChangeUserInfo(event)}
							/>
						</div>
						<div>
							<label htmlFor="userPhoneNumber" className={styles.label}>
								전화번호
							</label>
							<input
								type="text"
								name="userPhoneNumber"
								className={styles.form_data}
								value={formData.userPhoneNumber}
								onChange={event => onChangeUserInfo(event)}
							/>
						</div>
						<div>
							<label htmlFor="userAddress" className={styles.label}>
								주소
							</label>
							<AddressSearch
								address={formData.userAddress}
								setFormData={setFormData}
								onChangeUserInfo={onChangeUserInfo}
							/>
						</div>
						<div>
							<button
								className={styles.signup_button}
								onClick={e => onSubmitToSignUp(e)}
							>
								회원가입
							</button>
						</div>
					</form>
				</div>
			</div>
		</AuthLayout>
	);
};

export default SignUpPage;
