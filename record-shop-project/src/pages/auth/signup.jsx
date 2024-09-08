// CSS
import styles from './signup.module.css';

// Components
import AuthLayout from '@/layouts/AuthLayout';
import Loading from '@/components/common/Loading';

// Util
import phoneNumberHandler from '../../../utils/getPhoneNumber';

// Dynamic Component
import dynamic from 'next/dynamic';
const DynamicAddressSearch = dynamic(
	() => import('@/components/address/AddressSearch'),
);

// Hooks
import { useState, useEffect, useRef } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Router
import { useRouter } from 'next/router';

// API
import { fetchUserSignUp } from '@/pages/api';

const SignUpPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [formData, setFormData] = useState({
		id: 1,
		userAccount: '',
		userPassword: '',
		userName: '',
		userGender: '',
		zonecode: '',
		userPhoneNumber: '',
		userAddress: '',
		userDetailAddress: '',
		createdDate: new Date().toLocaleDateString('kr-KR', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}),
	});

	const [isLoading, setIsLoading] = useState(true);

	// 페이지 진입 유효성 검사
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));

		user ? router.replace('/') : setIsLoading(false);
	}, [router]);

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

	//  Form Data 확인 및 회원가입 버튼 활성화 변경
	useEffect(() => {
		// console.log('### formData ===> ', formData);
		const allFieldsFilled = Object.values(formData).every(
			data => data.toString().trim() !== '',
		);
		// console.log('### allFieldsFilled ==> ', allFieldsFilled);

		allFieldsFilled ? setIsAbleBtn(false) : setIsAbleBtn(true);
	}, [formData]);

	// Submit Logic
	const onSubmitToSignUp = async e => {
		e.preventDefault();

		const emptyField = [];

		for (const key in formData) {
			if (formData[key].toString().trim() === '') emptyField.push(key);
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

		const resultAction = await dispatch(fetchUserSignUp(formData));

		if (fetchUserSignUp.fulfilled.match(resultAction)) {
			alert(`${formData.userName} 님 회원가입을 축하드립니다!`);
			setFormData({
				id: resultAction.payload.id,
				userAccount: '',
				userPassword: '',
				userName: '',
				userGender: '',
				zonecode: '',
				userPhoneNumber: '',
				userAddress: '',
				userDetailAddress: '',
				createdDate: '',
			});
			router.replace('/auth/signin');
		} else {
			alert(`회원가입 실패 : ${resultAction.payload}`);
		}
	};

	if (isLoading) {
		return (
			<>
				<Loading reason={'유효하지 않은 접근입니다'} />
			</>
		);
	} else {
		return (
			<div className={styles.container}>
				<h3 className={styles.title}>회원가입</h3>

				<div className={styles.form_container}>
					<form className={styles.form_list} onSubmit={e => e.preventDefault()}>
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
							<DynamicAddressSearch
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
		);
	}
};

SignUpPage.getLayout = function getLayout(page) {
	return <AuthLayout>{page}</AuthLayout>;
};

export default SignUpPage;
