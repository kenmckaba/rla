import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Image } from '@chakra-ui/react'
// import './sun.css'
export default function SunBackground({hour}) {
  return (
    <Flex>
      <Image mt='-35em' mb='-18em'
        src={`${hour < 12 && './images/image_part_001.jpeg' || hour < 18 && './images/image_part_002.jpeg' || './images/image_part_003.jpeg'}`}
        alt='Sun' width="100%" />
    </Flex>
  )
}