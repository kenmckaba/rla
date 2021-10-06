import React, { useState } from 'react'
import {
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  Image,
  Container,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'
import LoginModal from './LoginModal'
import { H1Heading, H3Heading } from '../../components/shared/Heading'
import { PrimaryButton } from '../../components/shared/Buttons'

export const Splashscreen = () => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [isLogin, setIsLogin] = useState(false)

  const handleButtonClick = async (isLogin) => {
    setIsLogin(!!isLogin)
    onModalOpen()
  }

  return (
    <>
      <Box>
        <Flex
          justify="flex-start"
          align="center"
          paddingX="32"
          width="100%"
          height="85px"
          pos="absolute"
          bgGradient="linear(to-b, rgba(40,74,131,0.9) 0%, rgba(57,106,161, 0.9) 100%)"
        >
          <H3Heading>Remote Learning Platform</H3Heading>
        </Flex>
        <Container maxW="container.xl" >
          <Flex
            height="100%"
            minHeight="100vh"
            padding="2em"
            flexDirection="column"
            justifyContent="center"
            pos="relative"
            overflow="hidden"
          >
            
            <Flex dir="row" w="100%" alignItems="center">
              <Box>
                <H1Heading>Verizon Nursing Training Session</H1Heading>
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
                  <PrimaryButton
                    onClick={() => handleButtonClick(true)}
                    variant="primary-button"
                    minH="50px"
                    minW="200px"
                  >
                  LOGIN
                  </PrimaryButton>
                </HStack>
              </Box>
              <Spacer />
              <Box>
                <Image maxW="640px" src="/image.png"></Image>
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <LoginModal isModalOpen={isModalOpen} onModalClose={onModalClose} isLogin={isLogin} />
    </>
  )
}
