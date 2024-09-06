// Hooks
import React, { useState, useEffect, useRef } from 'react';

// API
import { updateUserPassword, updateUserPersonalInfo } from '@/pages/api';

// Redux
import { useDispatch } from 'react-redux';
import { signout } from '@/store';

// Router
import { useRouter } from 'next/router';

// CSS
import styles from './useraccountinfo.module.css';

// Component
import dynamic from 'next/dynamic';
const DynamicPasswordUpdateBtn = dynamic(
	() => import('../buttons/PasswordUpdateBtn'),
);
const DynamicUserPersonalInfo = dynamic(() => import('./UserPersonalInfo'));
const DynamicUserPersonalInfoChange = dynamic(() => import ('./UserPersonalInfoChange'));
const DynamicUserPersonalInfoUpdateBtn = dynamic(() => import ('../buttons/UserPersonalInfoUpdateBtn'));
import NewPassword from './NewPassword';

const UserAccountInfo = React.memo(function UserAccountInfo({
	userInfo,
	DynamicUserInfoButton,
	setUser,
}) {
	const [passwords, setPasswords] = useState({
		userPassword: userInfo.userPassword,
		oldPassword: '',
		newPassword: '',
		newPasswordCheck: '',
	});

	const [passwordChange, setPasswordChange] = useState(false);
	const [personalInfoChange, setPersonalInfoChange] = useState(false);
	const [allClear, setAllClear] = useState(false);
	const [personalBtnDisabled, setPersonalBtnDisabled] = useState(true);

	const [formData, setFormData] = useState({
		userName: userInfo.userName,
        userGender: userInfo.userGender,
        userPhoneNumber: '',
        zonecode: '',
        userAddress: '',
        userDetailAddress: '',
	});

	const oldPasswordRef = useRef(null);
	const oldPhoneNumberRef = useRef(null);
	const dispatch = useDispatch();
	const router = useRouter();

	const isTypingPasswords = (e) => {
		const { name, value } = e.target;
		setPasswords(prev => ({
			...prev,
			[name]: value,
		}))
	};

	const onUpdatePassword = async () => {
        if (confirm('비밀번호를 정말 바꾸시겠습니까?')) {
            try {
			
				const { userAccount } = userInfo;
				const { newPassword } = passwords;

                await dispatch(updateUserPassword({ userAccount, newPassword })).unwrap();
                
                dispatch(signout());
                localStorage.removeItem('user');
                setUser(null)
                alert('변경 완료되었습니다.');
                router.replace('/');
            } catch (error) {
                console.error("오류 발생:", error);
                alert('비밀번호 변경 중 오류가 발생했습니다.');
            }
        }
    };

	const onEnterToUpdatePassword = (e) => {
		if(e.key === 'Enter'){
			e.preventDefault();
			onUpdatePassword();
		}
	}

	useEffect(() => {
		const { oldPassword, newPassword, newPasswordCheck } = passwords;
		if (
			oldPassword !== '' &&
			oldPassword === userInfo.userPassword &&
			newPassword !== '' &&
			newPassword !== oldPassword &&
			newPasswordCheck !== '' &&
			newPasswordCheck === newPassword
		) {
			setAllClear(true);
		}
	}, [passwords]);

	const handleUpdateUserPersonalInfo = () => {
		if(confirm('개인 정보를 수정하시겠습니까?')) {
			const { userAccount } = userInfo;

			dispatch(updateUserPersonalInfo({ userAccount, userInfo: formData }));
			dispatch(signout());

            localStorage.removeItem('user');
            setUser(null)

            alert('변경 완료되었습니다.');
            router.replace('/');
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.userInfo_container}>
				<div className={styles.auth_container}>
					<div>
						{!passwordChange && (
							<>
								<div className={styles.auth_wrapper}>
									<div>
										<label htmlFor="" className={styles.label}>
											아이디
										</label>
										<input
											type="text"
											className={styles.input}
											value={userInfo.userAccount}
											readOnly
										/>
									</div>
									<div>
										<label htmlFor="" className={styles.label}>
											비밀번호
										</label>
										<input
											type="password"
											className={styles.input}
											value={userInfo.userPassword}
											readOnly
										/>
									</div>
								</div>
								<DynamicUserInfoButton
									type={'account'}
									setPasswordChange={setPasswordChange}
								/>
							</>
						)}
						{passwordChange && (
							<div className={styles.auth_wrapper_flex}>
								<NewPassword 
									oldPasswordRef={oldPasswordRef}
									isTypingPasswords={isTypingPasswords}
									onEnterToUpdatePassword={onEnterToUpdatePassword}
									passwordChange={passwordChange}
									{...passwords}
								/>
								
								<DynamicPasswordUpdateBtn
									allClear={allClear}
									onUpdatePassword={onUpdatePassword}
								/>
							</div>
						)}
					</div>
				</div>
				<div className={styles.user_container}>
					{!personalInfoChange&& (
						<>
							<DynamicUserPersonalInfo userInfo={userInfo} />
							<DynamicUserInfoButton 
								type={'userInfo'} 
								setPersonalInfoChange={setPersonalInfoChange} 
							/>
						</>
						
					)}
					{personalInfoChange && (
						<>
							<DynamicUserPersonalInfoChange 
								formData={formData}
								setFormData={setFormData}
								oldPhoneNumberRef={oldPhoneNumberRef}
								setPersonalBtnDisabled={setPersonalBtnDisabled}
								handleUpdateUserPersonalInfo={handleUpdateUserPersonalInfo}
							/>
							<DynamicUserPersonalInfoUpdateBtn
							 	personalInfoChange={personalInfoChange}
								personalBtnDisabled={personalBtnDisabled}
								handleUpdateUserPersonalInfo={handleUpdateUserPersonalInfo} />
						</>
					)}
				</div>
			</div>
		</div>
	);
});

export default UserAccountInfo;
