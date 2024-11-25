// Hooks
import React, {
	useState,
	useEffect,
	useCallback,
	useRef,
	SetStateAction,
	ChangeEvent,
} from 'react';

// CSS
import styles from './userPersonalInfoChange.module.css';

// Util
import phoneNumberHandler from '../../../utils/getPhoneNumber';

// Component
import AddressModal from '../modal/AddressModal';

// Type
import { UserPersnolType } from '../../types';
import { Address } from 'react-daum-postcode';
interface UserPersonalInfoChangeProps {
	formData: UserPersnolType;
	setFormData: React.Dispatch<SetStateAction<UserPersnolType>>;
	oldPhoneNumberRef: React.RefObject<HTMLInputElement>;
	setPersonalBtnDisabled: React.Dispatch<SetStateAction<boolean>>;
	handleUpdateUserPersonalInfo: () => void;
}

const UserPersonalInfoChange = React.memo(function UserPersonalInfoChange({
	formData,
	setFormData,
	oldPhoneNumberRef,
	setPersonalBtnDisabled,
	handleUpdateUserPersonalInfo,
}: UserPersonalInfoChangeProps) {
	// Modal
	const [isOpen, setIsOpen] = useState(false);
	const detailAddressRef = useRef<HTMLInputElement>(null);

	const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			userPhoneNumber: phoneNumberHandler(e),
		}));
	};

	// 개인정보 수정 버튼 Disabled 활성 및 비활성화 함수
	const checkAllFieldsFilled = useCallback(() => {
		const allFieldsFilled = Object.values(formData).every(
			(value: string) => value.trim() !== '',
		);
		setPersonalBtnDisabled(!allFieldsFilled);
	}, [formData]);

	// 우편번호 및 주소 세팅
	const onCompleteHandle = (data: Address) => {
		setFormData(prev => ({
			...prev,
			userAddress: data.address,
			zonecode: data.zonecode,
		}));
		setIsOpen(false);
	};

	// 상세주소 변경 핸들러
	const onChangeDetailAddress = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			userDetailAddress: e.target.value,
		}));
	};

	const onEnterInfoChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleUpdateUserPersonalInfo();
		}
	};

	useEffect(() => {
		if (oldPhoneNumberRef.current && formData.userPhoneNumber === '')
			oldPhoneNumberRef.current.focus();
	}, [formData.userPhoneNumber]);

	useEffect(() => {
		if (detailAddressRef.current && formData.zonecode !== '')
			detailAddressRef.current.focus();
	}, [formData.zonecode]);

	useEffect(() => {
		checkAllFieldsFilled();
	}, [checkAllFieldsFilled]);

	return (
		<div className={styles.user_wrapper}>
			<div>
				<label htmlFor="" className={styles.label}>
					이름
				</label>
				<input
					type="text"
					name="userName"
					className={styles.input}
					value={formData.userName}
					readOnly
				/>
			</div>
			<div>
				<label htmlFor="" className={styles.label}>
					성별
				</label>
				<input
					type="text"
					name="userGender"
					className={styles.input}
					value={formData.userGender === 'M' ? '남성' : '여성'}
					readOnly
				/>
			</div>
			<div>
				<label htmlFor="" className={styles.label}>
					전화번호
				</label>
				<input
					type="text"
					name="userPhoneNumber"
					className={styles.input}
					ref={oldPhoneNumberRef}
					value={formData.userPhoneNumber}
					onChange={e => onChangePhoneNumber(e)}
				/>
			</div>
			<div>
				<label htmlFor="" className={styles.label}>
					우편번호
				</label>
				<input
					type="text"
					className={styles.input}
					value={formData.zonecode}
					onClick={() => setIsOpen(true)}
					readOnly
				/>
			</div>
			<div>
				<label htmlFor="" className={styles.label}>
					주소
				</label>
				<input
					type="text"
					className={styles.input}
					value={formData.userAddress}
					onClick={() => setIsOpen(true)}
					readOnly
				/>
			</div>
			<div>
				<label htmlFor="" className={styles.label}>
					상세주소
				</label>
				<input
					type="text"
					ref={detailAddressRef}
					name="userDetailAddress"
					placeholder="상세 주소를 입력해주세요."
					className={styles.input}
					value={formData.userDetailAddress}
					onChange={e => onChangeDetailAddress(e)}
					onKeyDown={e => onEnterInfoChange(e)}
				/>
			</div>
			<AddressModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				onCompleteHandle={onCompleteHandle}
			/>
		</div>
	);
});

export default UserPersonalInfoChange;
