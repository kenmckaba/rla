import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Image } from '@chakra-ui/react'
import './sun.css'
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
        {hour <= 12 && (
          <Box
            w='100%'
            h='40vh'
            sx={{
              'background-color': '#FBAB7E',
              'background-image': 'linear-gradient(62deg, #F7CE68 0%, #FBAB7E 50%, #97D9E1 100%)',
              'background-size': '400% 400%',
              'animation': 'gradient 10s ease infinite',
              'height': '100vh',
            }}
          />
        )}
        {hour > 12 && (

          <Box
            w='100%'
            h='40vh'
            sx={{
              'background-color': '#D9AFD9',
              'background-image': 'linear-gradient(62deg, #D9AFD9 0%, #97D9E1 100%)',
              'background-size': '400% 400%',
              'animation': 'gradient 10s ease infinite',
              'height': '100vh',
            }}
          />
        )}
      </Box>
    </Flex>
  )
}