import PageContent from '../../../components/Layout/PageContent';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import NewPostForm from '../../../components/Posts/NewPostForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';

const submit: React.FC = () => {
    const [user] = useAuthState(auth);
    return (
        <PageContent>
            <>
                <Box
                    p="14px 0px"
                    borderBottom="1px soild"
                    borderColor="white"
                >
                    <Text>Create a post</Text>
                </Box>
                {user && <NewPostForm user={user} />}
            </>
            <>
                {/* About */}
            </>
        </PageContent>
    )
}
export default submit;