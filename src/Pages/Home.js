import React, { useState,useEffect } from 'react'
import Axios from "axios"

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  ChakraProvider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  FormLabel,
  Input,
  ModalBody,
  FormControl,
  ModalFooter,
  Textarea,
  Grid,
  GridItem,
  SimpleGrid,
  Portal,

} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'

import background from "../images/Food-Blogs-5.jpeg"
import BlogCard from '../components/BlogCard'
import AccountCard from '../components/AccountCard'
import DetailsEditCard from '../components/DetailsEditCard'

import logo from "../images/logo.png"
import { Navigate, useNavigate, useLocation } from "react-router-dom"





export default function Home() {
  const navigate = useNavigate();

  const location = useLocation();
  const { email} = location.state;

  const [bio,setBio] = useState(null);
  const [password,setPassword] = useState(null);
  const [imageUrl,setImageUrl] = useState(null);
  const [username,setUsername] = useState(null);
  console.log(username,email,password);
  // console.log(email,username,password,imageUrl,bio);

  const [name,setName] = useState(null);
  const [blog,setBlog] = useState(null);
  const [image,setImage] = useState(null);

  const [recent,setRecent] = useState(true);

  const [allBlogs,setAllBlogs] = useState([]);
  // console.log(allBlogs);

  const [allUsers,setAllUsers] = useState([]);
  //console.log(allUsers);




  // const { isOpen, onOpen, onClose } = useDisclosure()

  const [isOpenModal1,setIsOpenModal1] = useState(false);
  const [isOpenModal2,setIsOpenModal2] = useState(false);
  const [isOpenModal3,setIsOpenModal3] = useState(false);


  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const openModal1 = ()=>{
    setIsOpenModal1(true);
  }
  const closeModal1 = ()=>{
    setIsOpenModal1(false);
    window.location.reload();
  }
  const openModal2 = ()=>{
    setIsOpenModal2(true);
  }
  const closeModal2 = ()=>{
    setIsOpenModal2(false);
    window.location.reload();
  }

  const openModal3 = ()=>{
    setIsOpenModal3(true);
  }
  const closeModal3 = ()=>{
    setIsOpenModal3(false);
  }

  useEffect(()=>{
    const fetchData = async()=>{

      try{
        const res2 = await Axios.get("https://tasty-tales-backend-fawn.vercel.app/signup")
          setAllUsers(res2.data);
      

        for(var i=0;i<res2.data.length;i++){
          if(res2.data[i]._id == email){
            setBio(res2.data[i].bio);
            setImageUrl(res2.data[i].imageUrl);
            setPassword(res2.data[i].password);
            setUsername(res2.data[i].username);
            break;
          }
        }


        const res1 =  await Axios.get("https://tasty-tales-backend-fawn.vercel.app/blog")

          setAllBlogs(res1.data);
      




  
      }catch(e){
        console.log(e);
      }
    }

    fetchData();
  
  },[isOpenModal1,isOpenModal2]);



  const handlepost = async()=>{

    try{
      if(name==null || blog==null){
        alert("Recipe name or Blog Cnat be null");
        closeModal1();
      }else{

        await Axios.post("https://tasty-tales-backend-fawn.vercel.app/blog",{email:email,name:name,blog:blog,image:image,username:username,imageUrl:imageUrl}).then((e)=>{
          if(e.data=="Successfully Posted"){
            alert("Successfully Posted");
            closeModal1();
          }
        })
      }

    }catch(e){
      console.log(e);
    }
    
  }

  const handleRecent = ()=>[
    setRecent(!recent)
  ]

  

  return (
    <ChakraProvider>
      <>
        <Box bg={'blackAlpha.100'} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

            <HStack spacing={8} alignItems={'center'}>
              <Box fontFamily={'sans-serif'}>
                Food_Blogging
              </Box>
            </HStack>
            <Flex alignItems={'center'}>
              <Button
                variant={'solid'}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}
                leftIcon={<AddIcon />}
                onClick={openModal1}
              >
                Blog
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={imageUrl}
                  />
                </MenuButton>
                <Portal>
                <MenuList zIndex="1000">
                  <MenuItem onClick={openModal2}>Profile</MenuItem>
                  <MenuItem onClick={handleRecent}>New to Old</MenuItem>
                  <MenuItem onClick={handleRecent}>Old to New</MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Button colorScheme='teal' size='sm' onClick={() => navigate('/login')}>Signout</Button>
                  </MenuItem>
                </MenuList>
                </Portal>
              </Menu>
            </Flex>
          </Flex>


        </Box>
        <Box>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5} p={"4px"}>
            {!recent 
              ? allBlogs.map((blog)=>(
                <BlogCard 
                  name = {blog.name}
                  blog = {blog.blog}
                  image = {blog.image}
                  username = {blog.username}
                  imageUrl = {blog.imageUrl}
                  
                />
              ))
              : allBlogs.slice().reverse().map((blog)=>(
                <BlogCard 
                name = {blog.name}
                blog = {blog.blog}
                image = {blog.image}
                username = {blog.username}
                imageUrl = {blog.imageUrl}
                />
              ))

        }
            
            
          </SimpleGrid>
        </Box>


        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpenModal1}
          onClose={closeModal1}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Write Your Blog</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Enter image Link</FormLabel>
                <Input ref={initialRef} placeholder='https://image1.jpg' onChange={(e)=>setImage(e.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel>Recipe Name</FormLabel>
                <Input  placeholder='Chicken Biriyani' onChange={(e)=>setName(e.target.value)}/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Write Blog</FormLabel>
                <Textarea
                  placeholder="Start writing your blog..."
                  size="lg" // Adjust size as needed
                  rows={6} // Specify the number of rows
                  onChange={(e)=>setBlog(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handlepost}>
                Post
              </Button>
              <Button onClick={closeModal1}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        
        <Modal onClose={closeModal2} size='sm' isOpen={isOpenModal2}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton/>
            <AccountCard imageUrl ={imageUrl} username={username} bio={bio} password={password} email={email}/>
        </ModalContent>
      </Modal>

      <Modal onClose={closeModal3} size={'full'} isOpen={isOpenModal3}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Hello
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal3}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      </>
    </ChakraProvider>
  )
}