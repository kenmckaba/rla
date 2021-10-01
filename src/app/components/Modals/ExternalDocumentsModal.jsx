import { Center, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Button, IconButton } from '@chakra-ui/button'
import { Table, Tr, Th, Td, Tbody, Thead } from '@chakra-ui/react'
import { dummyDocuments } from '../../dummyData/dummyDocuments'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function ExternalDocumentsModal({ isOpen, onClose, onSave }) {
  const documents = dummyDocuments
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" width="448px" isCentered>
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>
          <Flex color="black" justifyContent="flex-start">Shared Documents</Flex>
        </ModalHeader>
        <ModalBody>
          <Center borderRadius="5px" border="1px solid #444444" width="400px" padding="2" >
            <VStack width="100%" align="start" spacing="4" paddingBottom="2">
              <Table>
                <Thead>
                  <Tr>
                    <Th paddingX="2" whiteSpace="nowrap">DOCUMENT NAME</Th>
                    <Th paddingX="2">TYPE</Th>

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
                        <Td maxWidth="150px" paddingX="2" color="#808080">
                          <HStack>
                            <Text
                              overflow="hidden"
                              whiteSpace="nowrap"
                              textOverflow="ellipsis"
                              width="100px"
                            >
                              {document.name}
                            </Text>
                            <IconButton
                              variant="link"
                              aria-label="Open document"
                              icon={<ExternalLinkIcon />}
                              size="xs"
                              color="#0D62C5"
                              onClick={() => window.open(document.url)}
                            />
                          </HStack>
                        </Td>
                        <Td maxWidth="150px" paddingX="2" color="#808080">{document.type}</Td>
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
  )
}
