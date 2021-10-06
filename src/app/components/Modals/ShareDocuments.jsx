import { Center, HStack, Spacer, VStack } from '@chakra-ui/layout'

import { Button } from '@chakra-ui/button'
import { Table, Tr, Th, Td, Tbody, Thead } from '@chakra-ui/react'
import AddAttachmentModal from './AddAttachmentModal'
import { useState } from 'react'

export default function ShareDocuments({ isModal, documents }) {

  const [showAddAttachmentModal, setShowAddAttachmentModal] = useState(false)

  return (
    <>
      <Center borderRadius="5px" border="1px solid #444444" width={isModal ? '400px' : '100%'} padding="2" >
        <VStack width="100%" align="start" spacing="4" paddingBottom="2">
          <HStack width="100%" justifyContent="flex-end">

            <Button
              size="xs"
              variant="primary-trueblue"
              onClick={() => setShowAddAttachmentModal(true)}
            >
              + add attachment
            </Button>
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
                      {isModal && <HStack>

                        <Button
                          variant="outline"
                          float="right"
                          size="xs"
                          height="14px"
                          color={document.share ? 'lightslategray' : '#FF4E4E'}
                          isDisabled={!document.share}
                          style={{ opacity: '1' }}
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
                          style={{ opacity: '1' }}
                        >
                          Share
                        </Button>
                      </HStack>}
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </VStack>
      </Center>

      <AddAttachmentModal
        isOpen={showAddAttachmentModal}
        onClose={() => setShowAddAttachmentModal(false)}
        onSave={() => setShowAddAttachmentModal(false)}
      />
    </>
  )
}


