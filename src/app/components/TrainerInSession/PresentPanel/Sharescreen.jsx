import { Image } from '@chakra-ui/react'

export default function Sharescreen({width, maxWidth, maxHeight}) {
  return (
    <Image src="/images/sharescreen/sharescreen.png" alt="Sharescreen" width={width} maxW={maxWidth} maxH={maxHeight} />
  )
}
