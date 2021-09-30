import { Image } from '@chakra-ui/image'
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Select } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'

export default function SettingsModal({isOpen, onClose, onSave}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent >

        <ModalHeader>
          <Flex color="black" justifyContent="flex-start">Settings</Flex>
        </ModalHeader>
        <ModalBody color="#444444">
          <VStack align="start" spacing="4">
            <Image src="/images/cams/settings-cam.png" />

            <Box width="100%">
              <Text>Camera</Text>
              <Select width="100%">
                <option value="default-macbook">Default-MacBook</option>
                <option value="usb-external-cam">USB External Cam</option>
              </Select>
            </Box>

            <Box width="100%">
              <Text>Microphone</Text>
              <Select width="100%">
                <option value="default-macbook">Default-MacBook</option>
                <option value="usb-external-cam">External Headphones</option>
              </Select>
            </Box>

            <HStack paddingBottom="2">
              <Button width="194px" variant="secondary-blue-outline" onClick={onClose}>
                <Text textTransform="capitalize">Cancel</Text>
              </Button>

              <Button width="194px" variant="primary-trueblue" onClick={onSave}>
                <Text textTransform="capitalize">Save</Text>
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
