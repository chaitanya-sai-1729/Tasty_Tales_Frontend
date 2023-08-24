
import React,{useState} from 'react';
import AccountDetailsEdit from './AccountDetailsEdit';

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  ChakraProvider,
  Textarea,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Modal,
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';

export default function AccountCard(props) {

  const [isOpenModal,setIsOpenModal] = useState(false);

  const openModal =()=>{
    setIsOpenModal(true);
  }

  const closeModal = ()=>{
    setIsOpenModal(false);
  }



  return (
    <ChakraProvider>
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={props.imageUrl}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {props.username}
            </Heading>
            <Textarea
              textAlign={"center"}
              color={'gray.500'}
              value={props.bio}
              isReadOnly
              resize="none"
            />
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>20k</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Following
              </Text>
            </Stack>
          </Stack>
          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={openModal}
            >
            Edit
          </Button>
        </Box>
      </Box>
    </Center>

    <Modal onClose={closeModal} size='full' isOpen={isOpenModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton/>
            <AccountDetailsEdit imageUrl={props.imageUrl} username={props.username} password={props.password} email={props.email} bio={props.bio} />
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}