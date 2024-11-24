import React, { SetStateAction } from 'react';

// CSS
import styles from '../css/userinfo.module.css';

import { UserInfoButtonProps } from '../../types';

const UserInfoButton = React.memo(function UserInfoButton({
	type,
	setPasswordChange,
	setPersonalInfoChange,
}: UserInfoButtonProps) {
	const onClickChangeBtn = () => {
		if (type === 'account' && setPasswordChange) {
			if (confirm('비밀번호를 수정 하시겠습니까?')) {
				setPasswordChange(true);
			}
		}

		if (type === 'userInfo' && setPersonalInfoChange) {
			if (confirm('개인정보를 수정하시겠습니까?')) {
				setPersonalInfoChange(true);
			}
		}
	};

	return (
		<div className={styles.button_wrapper}>
			<button className={styles.button} onClick={onClickChangeBtn}>
				변경
			</button>
		</div>
	);
});

export default UserInfoButton;
