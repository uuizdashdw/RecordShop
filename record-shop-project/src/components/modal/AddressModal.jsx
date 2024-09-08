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

const AddressModal = ({ isOpen, setIsOpen, onCompleteHandle }) => {
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
