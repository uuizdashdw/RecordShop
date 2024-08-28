// CSS
import styles from './signup.module.css';

// Components
import AuthLayout from '@/layouts/AuthLayout';
import AddressSearch from '@/components/address/AddressSearch';

// Hooks
import { useState, useEffect, useRef } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { singup } from '../../store';

// Router
import { useRouter } from 'next/router';

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		userAccount: '',
		userPassword: '',
		userName: '',
		userGender: '',
		zonecode: '',
		userPhoneNumber: '',
		userAddress: '',
		userDetailAddress: '',
	});

	// 비밀번호 유효성
	const [passwordError, setPasswordError] = useState(false);

	// Password Check State
	const [isWrongPassword, setIsWrongPassword] = useState(false);

	// Sign-Up Button Disabled State
	const [isAbleBtn, setIsAbleBtn] = useState(true);

	// input references
	const inputRefs = {
		userAccount: useRef(null),
		userPassword: useRef(null),
		userName: useRef(null),
		zonecode: useRef(null),
		userPhoneNumber: useRef(null),
		userAddress: useRef(null),
		userDetailAddress: useRef(null),
	};

	const dispatch = useDispatch();
	const router = useRouter();

	// 비밀번호 유효성 검사
	const validatePassword = password => {
		const passwordRegex =
			/^(?=.*[a-zA-Z])(?=.*\d)(?=(.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]){2,}).{8,}$/;
		return passwordRegex.test(password);
	};

	// 동일 비밀번호 확인
	const isCheckingUserPassword = event => {
		const { value: password } = event.target;
		const { userPassword } = formData;

		userPassword !== password && password
			? setIsWrongPassword(true)
			: setIsWrongPassword(false);
	};

	// Phone Number Logic
	const phoneNumberHandler = e => {
		const { value } = e.target;

		let formattedValue = '';

		// Only Numbers
		const cleanedValue = value.replace(/\D/g, '');

		// Formatting Value Logic
		if (cleanedValue.length > 0) formattedValue += cleanedValue.substring(0, 3);

		if (cleanedValue.length >= 4)
			formattedValue += '-' + cleanedValue.substring(3, 7);

		if (cleanedValue.length >= 7)
			formattedValue += '-' + cleanedValue.substring(7, 11);

		return formattedValue;
	};

	// Update User Zonecode(postal code)
	const onUpdateUserZonecode = zonecode => {
		setFormData(prev => ({
			...prev,
			zonecode,
		}));
	};

	useEffect(() => {
		onUpdateUserZonecode(formData.zonecode);
	}, [formData.zonecode]);

	// 유저 정보 업데이트
	const onUpdateUserInfo = event => {
		const { name, value } = event.target;

		if (name === 'userPhoneNumber') {
			const formattedNumber = phoneNumberHandler(event);
			setFormData(prev => ({
				...prev,
				[name]: formattedNumber,
			}));
			return;
		}

		setFormData(prev => ({
			...prev,
			[name]: value,
		}));

		if (name === 'userPassword') {
			!validatePassword(value)
				? setPasswordError(true)
				: setPasswordError(false);
		}
	};

	// Form Data Check & Sign-Up Button Disabled State Change
	useEffect(() => {
		console.log('### formData ===> ', formData);
		const allFieldsFilled = Object.values(formData).every(
			data => data.trim() !== '',
		);
		console.log('### allFieldsFilled ==> ', allFieldsFilled);

		allFieldsFilled ? setIsAbleBtn(false) : setIsAbleBtn(true);
	}, [formData]);

	// Submit Logic
	const onSubmitToSignUp = e => {
		e.preventDefault();

		const emptyField = [];

		for (const key in formData) {
			if (formData[key].trim() === '') emptyField.push(key);
		}

		// 필드 검증
		if (emptyField.length) {
			alert('양식을 모두 채워주세요!');
			const firstEmptyField = emptyField[0];

			if (firstEmptyField && inputRefs[firstEmptyField]) {
				inputRefs[firstEmptyField].current.focus();
			}
			return;
		}

		dispatch(singup(formData));
		alert('회원가입을 축하드립니다');
		setFormData({
			userAccount: '',
			userPassword: '',
			userName: '',
			userGender: '',
			zonecode: '',
			userPhoneNumber: '',
			userAddress: '',
			userDetailAddress: '',
		});
		router.replace('/');
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
								ref={inputRefs.userAccount}
								placeholder="아이디를 입력해주세요"
								autoComplete="off"
								name="userAccount"
								className={styles.form_data}
								value={formData.userAccount}
								onChange={event => onUpdateUserInfo(event)}
							/>
						</div>
						<div>
							<label htmlFor="userPassword" className={styles.label}>
								비밀번호
							</label>
							<input
								type="password"
								ref={inputRefs.userPassword}
								placeholder="비밀번호를 입력해주세요"
								minLength={8}
								maxLength={12}
								autoComplete="off"
								name="userPassword"
								className={styles.form_data}
								value={formData.userPassword}
								onChange={event => onUpdateUserInfo(event)}
							/>
							{passwordError && (
								<p className={styles.check_password}>
									영문과 숫자, 특수문자 2개 이상을 포함 해야합니다.
								</p>
							)}
						</div>
						<div>
							<label htmlFor="userPasswordCheck" className={styles.label}>
								비밀번호 확인
							</label>
							<input
								type="password"
								className={styles.form_data}
								placeholder="비밀번호를 확인해주세요"
								autoComplete="off"
								minLength={8}
								maxLength={12}
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
								ref={inputRefs.userName}
								name="userName"
								autoComplete="off"
								placeholder="이름을 입력해주세요"
								className={styles.form_data}
								value={formData.userName}
								onChange={event => onUpdateUserInfo(event)}
							/>
						</div>
						<div>
							<label htmlFor="userGender" className={styles.label}>
								성별
							</label>
							<div className={styles.gender_wrapper}>
								<label
									htmlFor="Male"
									className={
										formData.userGender === 'M'
											? `${styles.radioLabel} ${styles.radio_checked}`
											: `${styles.radioLabel}`
									}
								>
									남성
									<input
										type="radio"
										id="Male"
										name="userGender"
										value={'M'}
										checked={formData.userGender === 'M'}
										className={styles.radio}
										onChange={event => onUpdateUserInfo(event)}
									/>
								</label>
								<label
									htmlFor="Female"
									className={
										formData.userGender === 'F'
											? `${styles.radioLabel} ${styles.radio_checked}`
											: `${styles.radioLabel}`
									}
								>
									여성
									<input
										type="radio"
										id="Female"
										name="userGender"
										value={'F'}
										checked={formData.userGender === 'F'}
										className={styles.radio}
										onChange={event => onUpdateUserInfo(event)}
									/>
								</label>
							</div>
						</div>
						<div>
							<label htmlFor="userPhoneNumber" className={styles.label}>
								전화번호
							</label>
							<input
								type="text"
								ref={inputRefs.userPhoneNumber}
								name="userPhoneNumber"
								placeholder="전화번호를 입력해주세요"
								autoComplete="off"
								className={styles.form_data}
								value={formData.userPhoneNumber}
								onChange={event => onUpdateUserInfo(event)}
							/>
						</div>
						<div>
							<label htmlFor="userAddress" className={styles.label}>
								주소
							</label>
							<AddressSearch
								address={formData.userAddress}
								setFormData={setFormData}
								onUpdateUserInfo={onUpdateUserInfo}
							/>
						</div>
						<div>
							<button
								className={
									isAbleBtn
										? `${styles.signup_button} ${styles.signup_button_disabled}`
										: `${styles.signup_button} ${styles.signup_button_abled}`
								}
								onClick={e => onSubmitToSignUp(e)}
								disabled={isAbleBtn}
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
