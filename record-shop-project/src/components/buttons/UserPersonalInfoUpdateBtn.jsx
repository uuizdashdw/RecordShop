// CSS
import styles from '../css/userPersonalInfoUpdateBtn.module.css';

const UserPersonalInfoUpdateBtn = ({
	personalBtnDisabled,
	handleUpdateUserPersonalInfo,
}) => {
	return (
		<div className={styles.button_wrapper}>
			<button
				className={personalBtnDisabled ? styles.button_disabled : styles.button}
				disabled={personalBtnDisabled}
				onClick={handleUpdateUserPersonalInfo}
			>
				개인정보 수정
			</button>
		</div>
	);
};

export default UserPersonalInfoUpdateBtn;
