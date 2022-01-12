import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Image } from '@chakra-ui/react'

export default function SunBackground({hour}) {
  return (
    <Flex>
      <Box
        id="sun"
        pos="absolute"
        top="0"
        left="0%"
        width="100%"
        height="380px"
        overflow="hidden"
      > 
        <Image src='./images/bg.jpg' alt='Sun' width="100%" marginTop={`${hour < 12 && -650 || hour < 18 && -450 || -2000}`}/>
      </Box>
    </Flex>
  )
}