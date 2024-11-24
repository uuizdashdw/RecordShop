import React, { ChangeEvent, useEffect, useRef } from 'react';

// CSS
import styles from './accountpassword.module.css';

interface AccountPasswordProps {
	userAccount: string;
	userPassword: string;
	onChangeFormData: (e: ChangeEvent<HTMLInputElement>) => void;
	onEnterSubmitFormData: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const AccountPassword = ({
	userAccount,
	userPassword,
	onChangeFormData,
	onEnterSubmitFormData,
}: AccountPasswordProps) => {
	const userAccountRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (userAccountRef.current) userAccountRef.current.focus();
	}, [userAccountRef.current]);

	return (
		<>
			<div className={styles.input_wrapper}>
				<label htmlFor="" className={styles.label}>
					아이디
				</label>
				<input
					type="text"
					ref={userAccountRef}
					name="userAccount"
					className={styles.input}
					value={userAccount}
					onChange={e => onChangeFormData(e)}
				/>
			</div>

			<div className={styles.input_wrapper}>
				<label htmlFor="" className={styles.label}>
					비밀번호
				</label>
				<input
					type="password"
					name="userPassword"
					value={userPassword}
					className={styles.input}
					onChange={e => onChangeFormData(e)}
					onKeyDown={e => onEnterSubmitFormData(e)}
				/>
			</div>
		</>
	);
};

export default AccountPassword;
