// Hook
import React, { ChangeEvent } from 'react';

// CSS
import styles from './usercheck.module.css';

// Component
import dynamic from 'next/dynamic';
const DynamicAccountPassword = dynamic(() => import('./AccountPassword'));
interface FormData {
	userAccount: string;
	userPassword: string;
}
interface UserCheckProps {
	isDisabled: boolean;
	formData: FormData;
	onChangeFormData: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmitFormData: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onEnterSubmitFormData: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const UserCheck = React.memo(function UserCheck({
	isDisabled,
	formData,
	onChangeFormData,
	onSubmitFormData,
	onEnterSubmitFormData,
}: UserCheckProps) {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				본인 확인을 위해 아이디와 비밀번호를 입력해주세요
			</h1>
			<div className={styles.formdata_container}>
				<DynamicAccountPassword
					userAccount={formData.userAccount}
					userPassword={formData.userPassword}
					onChangeFormData={onChangeFormData}
					onEnterSubmitFormData={onEnterSubmitFormData}
				/>
				{/* <div>
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
				</div> */}

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
