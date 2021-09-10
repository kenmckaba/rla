import React from 'react'
import { Box, Flex, Spacer, Avatar, Heading, Text, Button, Image } from '@chakra-ui/react'

export const Splashscreen = () => {
  return (
    <>
      <Flex
        height="100%"
        minHeight="100vh"
        padding="2em"
        flexDirection="column"
        pos="relative"
        overflow="hidden"
      >
        <Box mb="auto">
          <Flex mb="16" alignItems="center" justifyContent="center">
            <Box>
              <Heading fontSize="32pt" fontWeight="medium" color="white">
                Remote Learning Platform
              </Heading>
            </Box>
            <Spacer />
            <Box>
              <Avatar name="A" bg="rgba(255, 255, 255, 0.1)" />
            </Box>
          </Flex>
        </Box>
        <Box display="flex" flexDir="row">
          <Box pos="absolute" top="40%" left="24" >
            <Heading maxW="400px" fontWeight="normal" fontSize="5xl">
              Verizon Nursing Training Session
            </Heading>
            <Text maxW="500px" mt="2" fontWeight="normal" fontSize="xl">
              Ensure your nurses feel supported and valued with tools to provide professional
              development support
            </Text>
            <Box mt="12">
              <Button variant="splashscreen-button">LAUNCH EXPERIENCE</Button>
            </Box>
          </Box>
          <Box pos="absolute" top="30%" right="24">
            <Image maxW="720px" src="/image.png"></Image>
          </Box>
        </Box>
      </Flex>
    </>
  )
}
