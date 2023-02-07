import { Community } from '../../atoms/communitiesAtom';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';


type HeaderProps = {
    communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
    const isJoined = false; // read from communitySnippets

    return (
        <Flex
            direction="column"
            width="100 %"
            height="146px"
        >
            <Box height="50%" bg="blue.400" />
            <Flex
                justify="center"
                bg="white"
                flexGrow={1}
            >

                <Flex
                    width="95%"
                    maxWidth="860px"
                >
                    {communityData.imageURL ? (
                        <Image />
                    ) : (
                        <Flex>
                            <Icon as={BsCircleFill}
                                fontSize={70}
                                position="relative"
                                top={-3}
                                color="white" />
                            <Icon
                                as={FaReddit}
                                fontSize={64}
                                position="fixed"
                                top="107px"
                                ml="3px"
                                color="blue.500" />
                        </Flex>
                    )}
                    <Flex padding="5px 10px">
                        <Flex direction="column" mr={6}>
                            <Text
                                fontWeight={800}
                                fontSize="16pt"
                            >{communityData.id}</Text>
                            <Text
                                fontWeight={600}
                                fontSize="10pt"
                                color="gray.400">
                                r/{communityData.id}
                            </Text>
                        </Flex>
                        <Button
                            variant={isJoined ? "outline" : "solid"}
                            height="30px"
                            pr={6}
                            pl={6}
                            mt={2}
                            onClick={() => { }}
                        >
                            {isJoined ? "joined" : "join"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
export default Header;