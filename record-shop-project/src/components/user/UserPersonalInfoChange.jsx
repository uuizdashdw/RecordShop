// Hooks
import React, { useState, useEffect, useCallback, useRef } from 'react'

// CSS
import styles from './userPersonalInfoChange.module.css'

// Util
import phoneNumberHandler from '../../../utils/getPhoneNumber';

// Libraries
import DaumPostcodeEmbed from 'react-daum-postcode';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';

const UserPersonalInfoChange = React.memo(function UserPersonalInfoChange({ 
    formData,
    setFormData,
    oldPhoneNumberRef,
    setPersonalBtnDisabled,
    handleUpdateUserPersonalInfo
 }) {

    // Modal
    const [isOpen, setIsOpen] = useState(false);
    const detailAddressRef = useRef(null);

    const onChangePhoneNumber = (e) => {
        setFormData(prev => ({
            ...prev,
            userPhoneNumber: phoneNumberHandler(e)
        }));
    };

    // 개인정보 수정 버튼 Disabled 활성 및 비활성화 함수
    const checkAllFieldsFilled = useCallback(() => {
        const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
        setPersonalBtnDisabled(!allFieldsFilled);
    }, [formData]);

    // 우편번호 및 주소 세팅
    const onCompleteHandle = data => {
        setFormData(prev => ({
            ...prev,
			userAddress: data.address,
			zonecode: data.zonecode,
        }));
        setIsOpen(false);
    };

    // 상세주소 변경 핸들러
    const onChangeDetailAddress = e => {
        setFormData(prev => ({
            ...prev,
            userDetailAddress: e.target.value,
        }));
    };

    const onEnterInfoChange = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            handleUpdateUserPersonalInfo();
        }
    }

    useEffect(() => {
        if(oldPhoneNumberRef.current && formData.userPhoneNumber === '') oldPhoneNumberRef.current.focus();
    }, [formData.userPhoneNumber]);

    useEffect(() => {
        if(detailAddressRef.current && formData.zonecode !== '') detailAddressRef.current.focus();
    }, [formData.zonecode])

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
                    name='userName'
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
                    name='userGender'
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
                    name='userPhoneNumber'
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
                    name='userDetailAddress'
                    placeholder='상세 주소를 입력해주세요.'
                    className={styles.input}
                    value={formData.userDetailAddress}
                    onChange={e => onChangeDetailAddress(e)}
                    onKeyDown={e => onEnterInfoChange(e)}
                />
            </div>
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
        </div>
    )
});

export default UserPersonalInfoChange
