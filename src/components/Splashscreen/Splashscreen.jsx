import React from 'react'
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
  Link,
} from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

export const Splashscreen = () => {
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
            <Heading fontSize="2xl" fontWeight="medium" color="white">
              Remote Learning Platform
            </Heading>
          </Box>
          <Flex dir="row" w="100%" alignItems="center">
            <Box>
              <Heading maxW="300px" fontWeight="normal" fontSize="4xl">
                Verizon Nursing Training Session
              </Heading>
              <Text maxW="450px" mt="2" fontWeight="normal" fontSize="lg">
                Ensure your nurses feel supported and valued with tools to provide professional
                development support
              </Text>
              <Box mt="12">
                <Link as={ReactLink} to="/dashboard">
                  <Button variant="splashscreen-button">LAUNCH EXPERIENCE</Button>
                </Link>
              </Box>
            </Box>
            <Spacer />
            <Box>
              <Image maxW="640px" src="/image.png"></Image>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
