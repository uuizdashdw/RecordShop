// CSS
import styles from '../css/addressSearch.module.css';

// Hooks
import { useEffect, useState } from 'react';

// Library
import DaumPostcodeEmbed from 'react-daum-postcode';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';

const AddressSearch = ({ address, setFormData, onUpdateUserInfo }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [postalCode, setPostalCode] = useState('');

	const onCompleteHandle = data => {
		setFormData(prev => ({
			...prev,
			userAddress: data.address,
			zonecode: data.zonecode,
		}));

		setPostalCode(data.zonecode);
		setIsOpen(false);
	};

	return (
		<>
			<div className={styles.postal_code_wrapper}>
				<input
					type="text"
					name="zonecode"
					className={styles.postal_code}
					placeholder="우편번호"
					readOnly
					value={postalCode}
					onChange={e => onUpdateUserInfo(e)}
					onClick={() => setIsOpen(true)}
				/>
				<button
					className={styles.postal_code_button}
					onClick={e => {
						e.preventDefault();
						setIsOpen(true);
					}}
				>
					우편번호 찾기
				</button>
			</div>
			<input
				type="text"
				name="userAddress"
				className={styles.form_data}
				placeholder="주소"
				readOnly
				value={address}
				onClick={() => setIsOpen(true)}
			/>
			<input
				type="text"
				name="userDetailAddress"
				placeholder="상세주소를 입력해주세요"
				autoComplete="off"
				className={styles.form_data}
				onChange={e => onUpdateUserInfo(e)}
			/>

			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>주소 검색</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<DaumPostcodeEmbed onComplete={onCompleteHandle} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddressSearch;
