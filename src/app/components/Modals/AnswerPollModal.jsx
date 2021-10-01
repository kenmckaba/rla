import { Box, Center, Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Button, IconButton } from '@chakra-ui/button'
import { CloseIcon } from '@chakra-ui/icons'
import { Radio, useRadio, useRadioGroup } from '@chakra-ui/radio'
import { dummyPoll } from '../../dummyData/dummyPolls'
import { RadioGroup } from '@chakra-ui/react'
import { useState } from 'react'

const RadioOption = ({children, ...props}) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <HStack as="label">
      <Text>{children}</Text>
      <Center
        cursor="pointer"
        borderWidth="1px"
        borderRadius="full"
        borderColor="rgba(255, 255, 255, 0.25)"
        _focus={{
          boxShadow: 'outline',
        }}
          
        height="16px"
        width="16px"
      >
        <input {...input} />
        <Box
          {...checkbox}
          _checked={{
            backgroundColor: 'white',
          }}
          borderRadius="full"
          height="8px"
          width="8px"
        >
        </Box>
      </Center>
    </HStack>
  )
}


const Option = ({description, value}) => {
  console.log(value)
  return <Radio size="sm" value={value}>{description}</Radio>
}

export default function AnswerPollModal({ isOpen, onClose }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'poll',
    defaultValue: '1'
  })
  const [answer, setAnswer] = useState(dummyPoll.options[0])
  const poll = dummyPoll
  
  const group = getRootProps()

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent background="transparent" width="442px">
        <ModalHeader height="24px" paddingY="3px" fontWeight="700" bgGradient="linear(to-b, #284A83 0%, #396AA1 100%)">
          <Flex justifyContent="flex-start">
            <Center>
              <Text fontSize="xs" color="white">
            Questions
              </Text>
            </Center>

            <Spacer />

            <IconButton
              size="xs"
              variant="unstyled"
              aria-label="Close form"
              icon={<CloseIcon boxSize={3} />}
              onClick={onClose}
            />
          </Flex>
        </ModalHeader>
        <ModalBody paddingTop="0" bgGradient="linear(to-b, rgba(40,74,131,0.5) 0%, rgba(57,106,161, 0.5) 100%)">
          <VStack align="start" spacing="4" paddingBottom="2">
            <Text paddingTop="20px" fontSize="12" color="white">{poll.question}</Text>

            <VStack {...group}>
              {/* {poll.options.map((option, index) => <Option description={option.description} value={(index+1).toString()} />)} */}
              {poll.options.map((option) => {
                const radio = getRadioProps({ value: option.description })
                return (
                  <RadioOption key={option.description} {...radio}>
                    {option.description}
                  </RadioOption>
                )
              })
              }
            </VStack>
            
            <Button width="100%" variant="primary-trueblue" >
              <Text textTransform="capitalize">Return to Homepage</Text>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
