import { AuthModalState } from '../../../atoms/authModalAtom';
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useRecoilState } from "recoil";
import React from 'react';
import AuthInputs from './AuthInputs';

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
                    <ModalHeader textAlign="center">
                        {modalState.view === 'login' && 'Login'}
                        {modalState.view === 'signup' && 'Sign Up'}
                        {/*modalState.view === 'resetPassword' && 'Reset Password'*/}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        pb={6}
                    >
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            width="70%"
                        >
                            <AuthInputs />
                            {/*
                            <OAuthButtons />
                            <ResetPassword />
                            */}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};
export default AuthModal;