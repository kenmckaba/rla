import React, { useState } from 'react'
import {
  Box,
  Flex,
  Spacer,
  Avatar,
  Heading,
  Text,
  Button,
  Image,
  Container,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'
import LoginModal from './LoginModal'
import { H1Heading, H3Heading } from '../../components/shared/Heading'

export const Splashscreen = () => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [isLogin, setIsLogin] = useState(false)

  const handleButtonClick = async (isLogin) => {
    setIsLogin(!!isLogin)
    onModalOpen()
  }

  return (
    <>
      <Container maxW="container.xl">
        <Flex
          height="100%"
          minHeight="100vh"
          padding="2em"
          flexDirection="column"
          justifyContent="center"
          pos="relative"
          overflow="hidden"
        >
          <Box pos="absolute" top="8" left="8">
            <H3Heading>
              Remote Learning Platform
            </H3Heading>
          </Box>
          <Flex dir="row" w="100%" alignItems="center">
            <Box>
              <H1Heading>
                Verizon Nursing Training Session
              </H1Heading>
              <Text maxW="450px" mt="2" fontWeight="normal" fontSize="lg">
                Ensure your nurses feel supported and valued with tools to provide professional
                development support
              </Text>
              <HStack mt="12" spacing="4">
                <Button
                  onClick={() => handleButtonClick(false)}
                  variant="secondary-ghost-outline"
                  minH="50px"
                  minW="200px"
                >
                  SIGN UP
                </Button>
                <Button
                  onClick={() => handleButtonClick(true)}
                  variant="splashscreen-login-button"
                  minH="50px"
                  minW="200px"
                >
                  LOGIN
                </Button>
              </HStack>
            </Box>
            <Spacer />
            <Box>
              <Image maxW="640px" src="/image.png"></Image>
            </Box>
          </Flex>
        </Flex>
      </Container>
      <LoginModal isModalOpen={isModalOpen} onModalClose={onModalClose} isLogin={isLogin} />
    </>
  )
}
