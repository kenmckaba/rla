import { Center, Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Button } from '@chakra-ui/button'
import { Table, Tr, Th, Td, Tbody, Thead } from '@chakra-ui/react'
import { dummyDocuments } from '../../dummyData/dummyDocuments'
import { useState } from 'react'
import AddAttachmentModal from './AddAttachmentModal'

export default function ShareDocumentsModal({ isOpen, onClose, onSave }) {
  const [showAddAttachmentModal, setShowAddAttachmentModal]  = useState(false)
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
            <Center borderRadius="5px" border="1px solid #444444" width="400px" padding="2" >
              <VStack width="100%" align="start" spacing="4" paddingBottom="2">
                <HStack width="100%" justifyContent="flex-end">

                  <Button
                    size="xs"
                    variant="primary-trueblue"
                    onClick={() => setShowAddAttachmentModal(true)}>+ add attachment</Button>
                </HStack>

                <Table>
                  <Thead>
                    <Tr>
                      <Th paddingX="2" whiteSpace="nowrap">DOCUMENT NAME</Th>
                      <Th paddingX="2">TYPE</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {!documents.length ? (
                      <Tr>
                        <Td maxWidth="100px" paddingX="2" color="#808080">*None*</Td>
                      </Tr>
                    ) : (
                      documents.map((document) => (
                        <Tr key={document.id} cursor="pointer">
                          <Td maxWidth="150px" paddingX="2" color="#808080">{document.name}</Td>
                          <Td maxWidth="150px" paddingX="2" color="#808080">{document.type}</Td>
                          <Spacer />
                          <Td fontSize="12" >
                            <HStack>

                              <Button
                                variant="outline"
                                float="right"
                                size="xs"
                                height="14px"
                                color={document.share ? 'lightslategray' : '#FF4E4E'}
                                isDisabled={!document.share}
                                style={{opacity:'1'}}
                              >
                            Hide
                              </Button>

                              <Button
                                variant="outline"
                                float="right"
                                size="xs"
                                height="14px"
                                color={document.share ? '#0DC557' : 'lightslategray'}
                                isDisabled={document.share}
                                style={{opacity:'1'}}
                              >
                            Share
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>


              </VStack>
            </Center>
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
      
      <AddAttachmentModal 
        isOpen={showAddAttachmentModal}
        onClose={() => setShowAddAttachmentModal(false)}
        onSave={() => setShowAddAttachmentModal(false)}
      />

    </>

  )
}
