import {
  Box,
  Center,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  IconButton,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { dummyPoll } from '../../dummyData/dummyPolls'
import StudentCompletePollModal from './StudentCompletePollModal'
import { useState } from 'react'

const Divider = () => <Box width="100%" height="0" border="1px solid #CBD2D2" />

const RadioChoice = ({ children, ...props }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <>
      <Divider />
      <HStack justifyContent="flex-start" as="label" width="100%" paddingX="4">
        <Text>{children}</Text>
        <Spacer />
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
          ></Box>
        </Center>
      </HStack>
    </>
  )
}

export default function AnswerPollModal({ isOpen, onClose, onAnswer }) {
  const [showStudentCompletePollModal, setShowStudentCompletePollModal] = useState(false)
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'poll',
    defaultValue: '1',
  })
  const poll = dummyPoll
  const group = getRootProps()

  const handleOnCompletePoll = () => {
    setShowStudentCompletePollModal(false)
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
        <ModalOverlay />
        <ModalContent background="transparent" width="442px">
          <ModalHeader
            height="24px"
            paddingY="3px"
            paddingX="4"
            fontWeight="700"
            bgGradient="linear(to-b, #284A83 0%, #396AA1 100%)"
          >
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
          <ModalBody
            paddingX="0"
            paddingTop="0"
            bgGradient="linear(to-b, rgba(40,74,131,0.9) 0%, rgba(57,106,161, 0.9) 100%)"
          >
            <VStack align="start" spacing="4" paddingBottom="2">
              <Text paddingX="4" paddingTop="5" fontSize="12" color="white" marginBottom="17">
                {poll.question}
              </Text>

              <VStack align="start" {...group} width="100%">
                {poll.options.map((option) => {
                  const radio = getRadioProps({ value: option.description })
                  return (
                    <RadioChoice key={option.description} {...radio}>
                      {option.description}
                    </RadioChoice>
                  )
                })}
              </VStack>

              <Center width="100%">
                <Button
                  width="90%"
                  marginY="2"
                  variant="primary-button"
                  onClick={() => {
                    setShowStudentCompletePollModal(true)
                    onAnswer()
                  }}
                >
                  <Text textTransform="capitalize" marginY="4">
                    Submit
                  </Text>
                </Button>
              </Center>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <StudentCompletePollModal
        isOpen={showStudentCompletePollModal}
        onClose={handleOnCompletePoll}
      />
    </>
  )
}
