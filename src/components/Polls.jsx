import React, { useState } from 'react'
import { Table, Tr, Th, Td, Tbody, Thead, Button, Flex, useDisclosure } from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import { PollModal } from './PollModal'

export const Polls = ({ trainingId, polls }) => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [currentPoll, setCurrentPoll] = useState()

  const addPoll = () => {
    setCurrentPoll(null)
    onModalOpen()
  }

  const editPoll = (poll) => {
    setCurrentPoll(poll)
    onModalOpen()
  }

  return (
    <>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th w="12rem" pb="0">
              Question
            </Th>
            <Th pb="0">Completed</Th>
            <Th>
              <Button size="xs" leftIcon={<AddIcon />} variant="primary-trueblue" onClick={addPoll}>
                Add a poll
              </Button>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {polls.length === 0 ? (
            <Tr>
              <Td>*None*</Td>
            </Tr>
          ) : (
            polls.map((poll) => {
              return (
                <Tr key={poll.id} cursor="pointer" onClick={() => editPoll(poll)}>
                  <Td fontSize="12" paddingLeft="16px">
                    {poll.question}
                  </Td>
                  <Td fontSize="12" paddingLeft="16px">
                    {poll.startedAt ? '✅' : ''}
                  </Td>
                  <Td>
                    <Button
                      leftIcon={<EditIcon />}
                      variant="outline"
                      float="right"
                      color="lightslategray"
                      disabled
                      size="xs"
                      height="14px"
                      // onClick={(e) => editPoll(poll)}
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              )
            })
          )}
        </Tbody>
      </Table>

      <PollModal
        onClose={onModalClose}
        poll={currentPoll}
        isOpen={isModalOpen}
        trainingId={trainingId}
      />
    </>
  )
}
