import React, { useEffect, useState } from 'react';

// CSS
import styles from '../css/passwordUpdateBtn.module.css';

const PasswordUpdateBtn = React.memo(function PasswordUpdateBtn({
	allClear,
	onUpdatePassword,
}) {
	const [isDisabled, setIsDisabled] = useState(true);

	useEffect(() => {
		if (allClear) {
			setIsDisabled(false);
		}
	}, [allClear]);

	return (
		<div className={styles.button_wrapper}>
			<button
				className={allClear ? styles.button : styles.button_disabled}
				disabled={isDisabled}
				onClick={onUpdatePassword}
			>
				비밀번호 수정
			</button>
		</div>
	);
});

export default PasswordUpdateBtn;
