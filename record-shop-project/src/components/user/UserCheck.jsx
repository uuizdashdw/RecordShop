// Hook
import React, { useEffect, useRef } from 'react';

// CSS
import styles from './usercheck.module.css';

const UserCheck = React.memo(function UserCheck({
	isDisabled,
	formData,
	onChangeFormData,
	onSubmitFormData,
	onEnterSubmitFormData,
}) {
	const userAccountRef = useRef(null);

	useEffect(() => {
		if (userAccountRef.current) userAccountRef.current.focus();
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				본인 확인을 위해 아이디와 비밀번호를 입력해주세요
			</h1>
			<div className={styles.formdata_container}>
				<div>
					<label htmlFor="" className={styles.label}>
						아이디
					</label>
					<input
						type="text"
						ref={userAccountRef}
						name="userAccount"
						className={styles.input}
						value={formData.userAccount}
						onChange={e => onChangeFormData(e)}
					/>
				</div>

				<div>
					<label htmlFor="" className={styles.label}>
						비밀번호
					</label>
					<input
						type="password"
						name="userPassword"
						value={formData.userPassword}
						className={styles.input}
						onChange={e => onChangeFormData(e)}
						onKeyDown={e => onEnterSubmitFormData(e)}
					/>
				</div>

				<div>
					<button
						className={isDisabled ? styles.button_disabled : styles.button}
						disabled={isDisabled}
						onClick={e => onSubmitFormData(e)}
					>
						제출
					</button>
				</div>
			</div>
		</div>
	);
});

export default UserCheck;
