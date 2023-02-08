import PageContent from '../../../components/Layout/PageContent';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import NewPostForm from '../../../components/Posts/NewPostForm';

const submit: React.FC = () => {

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
                <NewPostForm />
            </>
            <>
                {/* About */}
            </>
        </PageContent>
    )
}
export default submit;