import React, { ChangeEvent, useEffect } from 'react';

// CSS
import styles from './newpassword.module.css';

interface NewPasswordProps {
	oldPasswordRef: React.RefObject<HTMLInputElement>;
	isTypingPasswords: (e: ChangeEvent<HTMLInputElement>) => void;
	onEnterToUpdatePassword: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	passwordChange: boolean;
	userPassword: string;
	oldPassword: string;
	newPassword: string;
	newPasswordCheck: string;
}

const NewPassword = React.memo(function NewPassword({
	oldPasswordRef,
	isTypingPasswords,
	onEnterToUpdatePassword,
	passwordChange,
	userPassword,
	oldPassword,
	newPassword,
	newPasswordCheck,
}: NewPasswordProps) {
	useEffect(() => {
		if (oldPasswordRef.current) oldPasswordRef.current.focus();
	}, [passwordChange]);

	return (
		<>
			<div>
				<div>
					<label htmlFor="" className={styles.label}>
						기존 비밀번호
					</label>
					<input
						type="password"
						name="oldPassword"
						className={styles.input}
						ref={oldPasswordRef}
						value={oldPassword}
						onChange={e => isTypingPasswords(e)}
					/>
				</div>
				{userPassword !== oldPassword && oldPassword && (
					<p className={styles.wrong_password}>비밀번호가 일치하지 않습니다.</p>
				)}
			</div>
			<div>
				<div>
					<label htmlFor="" className={styles.label}>
						새 비밀번호
					</label>
					<input
						type="password"
						name="newPassword"
						className={styles.input}
						value={newPassword}
						onChange={e => isTypingPasswords(e)}
					/>
				</div>
				{newPassword && oldPassword === newPassword && (
					<p className={styles.wrong_password}>잘못된 비밀번호 입니다.</p>
				)}
			</div>
			<div>
				<div>
					<label htmlFor="" className={styles.label}>
						새 비밀번호 확인
					</label>
					<input
						type="password"
						name="newPasswordCheck"
						className={styles.input}
						value={newPasswordCheck}
						onChange={e => isTypingPasswords(e)}
						onKeyDown={e => onEnterToUpdatePassword(e)}
					/>
				</div>
				{newPasswordCheck && newPassword !== newPasswordCheck && (
					<p className={styles.wrong_password}>새 비밀번호를 확인해주세요</p>
				)}
			</div>
		</>
	);
});

export default NewPassword;
