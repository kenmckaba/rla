import { Box, Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Input, Icon } from '@chakra-ui/react'
import { Button, IconButton } from '@chakra-ui/button'
import { CloseIcon } from '@chakra-ui/icons'

export default function AddAttachmentModal({isOpen, onClose, onDelete, onSave}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" width="448px" isCentered>
      <ModalOverlay />
      <ModalContent>

        <ModalHeader>
          <Flex color="black" justifyContent="flex-start">
            <Text>
              New Document
            </Text>

            <Spacer />

            <IconButton
              variant="icon-button"
              aria-label="Close form"
              icon={<CloseIcon boxSize={3} />}
              onClick={onClose}
            />
          </Flex>
        </ModalHeader>
        <ModalBody color="black">
          <VStack align="start" spacing="4">

            <Box width="100%">
              <Text>Title</Text>
              <Input
                variant="filled"
                placeholder="Type name of document here"
                paddingLeft="2"
                width="100%" />
            </Box>

            <Box width="100%">
              <Text>URL</Text>
              <Input
                variant="filled"
                placeholder="Type url here"
                paddingLeft="2"
                width="100%"
              />
            </Box>

            <HStack paddingY="4">
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
