import React, { useState } from 'react';
import Axios from "axios";
import {useNavigate} from "react-router-dom"

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    ChakraProvider,
    InputGroup,
    InputRightElement,
    Textarea,

} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function AccountDetailsEdit(props) {

    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState(props.imageUrl);
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);
    const email = props.email;
    const [bio,setBio] = useState(props.bio);




    const [image, setImage] = useState(null);

    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {
        setImage(e.target.value);
        setImageUrl(image);
    }

    const handleCancel = ()=>{
        
    }

    const handleSubmit =  async(e)=>{
        try{

            await Axios.post("https://tasty-tales-backend-fawn.vercel.app/update",{imageUrl:imageUrl,username:username,email:email,bio:bio,password:password}).then((e)=>{
                var mess = e.data;
                alert(mess);
                
            })
        }catch(e){
            console.log(e);
        }
    }


    return (
        <ChakraProvider>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                        Edit Profile
                    </Heading>
                    <FormControl id="userName">
                        <FormLabel>Profile Photo</FormLabel>
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl" src={imageUrl}>
                                    <AvatarBadge
                                        as={IconButton}
                                        size="sm"
                                        rounded="full"
                                        top="-10px"
                                        colorScheme="green"
                                        aria-label="remove Image"
                                    // icon={<SmallCloseIcon />}
                                    />
                                </Avatar>
                            </Center>
                            <Center w="full">
                                <FormControl>
                                    <FormLabel>Enter Photo Link</FormLabel>
                                    <Input
                                        placeholder="https://image1.png"
                                        onChange={(e) => setImage(e.target.value)}

                                    />

                                    <Button
                                        bg={'blue.300'}
                                        color={'white'}
                                        w="full"
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        mt={'10px'}
                                        onClick={handleChange}
                                    >
                                        Change
                                    </Button>
                                </FormControl>
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl id="userName" isRequired>
                        <FormLabel>Edit User name</FormLabel>
                        <Input
                            placeholder="UserName"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Edit Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <InputRightElement h={'full'}>
                                <Button
                                    variant={'ghost'}
                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl id="bio" isRequired>
                        <FormLabel>Edit Your Bio</FormLabel>
                        <Textarea
                            placeholder="Hello Everyone..."
                            _placeholder={{ color: 'gray.500' }}
                            rows={8}
                            size={'lg'}
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
                        />
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'blue.500',
                            }}
                            onClick={handleSubmit}
                            >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </ChakraProvider>
    )
}