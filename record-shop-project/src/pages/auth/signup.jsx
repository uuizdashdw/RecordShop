// CSS
import styles from './signup.module.css';

// Components
import AuthLayout from '@/layouts/AuthLayout';

import { useState, useEffect } from 'react';

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		userAccount: '',
		userPassword: '',
		userName: '',
		userPhoneNumber: '',
		// userAddress: '',
	});

	const [isWrongPassword, setIsWrongPassword] = useState(false);

	useEffect(() => {
		console.log('### formData ===> ', formData);
	}, [formData]);

	const onChangeUserAccount = event => {
		const { value: userAccount } = event.target;
		setFormData(prev => ({
			...prev,
			userAccount,
		}));
	};

	const onChangeUserPassword = event => {
		const { value: userPassword } = event.target;
		setFormData(prev => ({
			...prev,
			userPassword,
		}));
	};

	const isCheckingUserPassword = event => {
		const { value: password } = event.target;
		const { userPassword } = formData;

		userPassword !== password
			? setIsWrongPassword(true)
			: setIsWrongPassword(false);
	};

	const onChangeUserName = event => {
		const { value: userName } = event.target;
		setFormData(prev => ({
			...prev,
			userName,
		}));
	};

	const onChangeUserPhoneNumber = event => {
		const { value: userPhoneNumber } = event.target;
		setFormData(prev => ({
			...prev,
			userPhoneNumber,
		}));
	};

	return (
		<AuthLayout>
			<div className={styles.container}>
				<h3 className={styles.title}>회원가입</h3>

				<div className={styles.form_container}>
					<ul className={styles.form_list}>
						<li>
							<label htmlFor="userAccount" className={styles.label}>
								아이디
							</label>
							<input
								type="text"
								className={styles.form_data}
								value={formData.userAccount}
								onChange={event => onChangeUserAccount(event)}
							/>
						</li>
						<li>
							<label htmlFor="userPassword" className={styles.label}>
								비밀번호
							</label>
							<input
								type="text"
								className={styles.form_data}
								value={formData.userPassword}
								onChange={event => onChangeUserPassword(event)}
							/>
						</li>
						<li>
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
						</li>
						<li>
							<label htmlFor="userName" className={styles.label}>
								이름
							</label>
							<input
								type="text"
								className={styles.form_data}
								value={formData.userName}
								onChange={event => onChangeUserName(event)}
							/>
						</li>
						<li>
							<label htmlFor="userPhoneNumber" className={styles.label}>
								전화번호
							</label>
							<input
								type="text"
								className={styles.form_data}
								value={formData.userPhoneNumber}
								onChange={event => onChangeUserPhoneNumber(event)}
							/>
						</li>
						<li>주소 :</li>
					</ul>
				</div>
			</div>
		</AuthLayout>
	);
};

export default SignUpPage;
