import { AuthModalState } from '../../../atoms/authModalAtom';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useRecoilState } from "recoil";
import React from 'react';

const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(AuthModalState)

    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false,
        }));
    };

    return (
        <>

            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Modal Body
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};
export default AuthModal;