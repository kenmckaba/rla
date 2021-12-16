import { Heading } from '@chakra-ui/react'

export const H1Heading = (props) => {
  const { children } = props

  return (
    <Heading fontSize="5xl" fontWeight="normal" {...props} >
      {children}
    </Heading>
  )
}

export const H3Heading = (props) => {
  const { children } = props

  return (
    // TODO: Check if we can remove color from here
    <Heading fontSize="2xl" fontWeight="medium" color="blue.600" {...props}>
      {children}
    </Heading>
  )
}

