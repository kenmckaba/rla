import React, { useState } from 'react'
import { Table, Tr, Th, Td, Tbody, Thead, Button, Flex, useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { PollModal } from './PollModal'

export const Polls = ({ trainingId, polls, saveTraining }) => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [currentPoll, setCurrentPoll] = useState()

  const addPoll = () => {
    saveTraining()
    setCurrentPoll(null)
    onModalOpen()
  }

  const editPoll = (poll) => {
    setCurrentPoll(poll)
    onModalOpen()
  }

  return (
    <>
      <Flex marginLeft="12px" marginTop="3px" justifyContent="space-between" float="right">
        <Button
          size="xs"
          marginRight="3px"
          rightIcon={<AddIcon />}
          variant="outline"
          onClick={addPoll}
        >
          Add a poll
        </Button>
      </Flex>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th w="12rem" pb="0">
              Question
            </Th>
            <Th pb="0">Completed</Th>
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
