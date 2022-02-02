import React from 'react'
import { Flex, Image} from '@chakra-ui/react'
export default function SunBackground({hour}) {
  return (
    <Flex>
      <Image 
        src={`${hour < 12 && './images/image_part_001.jpeg' || hour < 18 && './images/image_part_002.jpeg' || './images/image_part_003.jpeg'}`}
        mt={'-6em'} mb={'-10em'} height={'15em'} alt='Sun' width="100%"/>
    </Flex>
  ) 
}