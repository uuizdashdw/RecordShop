// Libraries
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import React, { SetStateAction } from 'react';

interface AddressModalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	onCompleteHandle: (address: Address) => void;
}

const AddressModal = ({
	isOpen,
	setIsOpen,
	onCompleteHandle,
}: AddressModalProps) => {
	return (
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
	);
};

export default AddressModal;
