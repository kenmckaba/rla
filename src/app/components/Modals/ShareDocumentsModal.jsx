import { Flex, HStack, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Button } from '@chakra-ui/button'

import { dummyDocuments } from '../../dummyData/dummyDocuments'
import ShareDocuments from './ShareDocuments'

export default function ShareDocumentsModal({ isOpen, onClose, onSave }) {
  const documents = dummyDocuments
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" width="448px" isCentered>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>
            <Flex color="black" justifyContent="flex-start">Shared Folder</Flex>
          </ModalHeader>
          <ModalBody>
            <ShareDocuments documents={documents} isModal />
            <HStack paddingY="4">
              <Button width="194px" variant="secondary-blue-outline" onClick={onClose}>
                <Text textTransform="capitalize">Cancel</Text>
              </Button>

              <Button width="194px" variant="primary-trueblue" onClick={onSave}>
                <Text textTransform="capitalize">Save</Text>
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>

  )
}
