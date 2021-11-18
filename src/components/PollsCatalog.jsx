import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { createStoredPoll, updateStoredPoll } from '../graphql/mutations'

import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import OurModal from './OurModal'
import { PollForm } from './PollForm'
import { useStoredPolls } from './useStoredPolls'

export const PollsCatalog = ({ isOpen, onClose }) => {
  const [addNewStoredPoll] = useMutation(gql(createStoredPoll))
  const [editStoredPoll] = useMutation(gql(updateStoredPoll))
  const [addPollModalOpen, setAddPollModalOpen] = useState(false)
  const [pollToEdit, setPollToEdit] = useState()

  const addPoll = () => {
    setPollToEdit(null)
    setAddPollModalOpen(true)
  }

  const savePoll = async ({ pollId, question, trainingId, type, answers }) => {
    if (pollId) {
      await editStoredPoll({
        variables: {
          input: {
            id: pollId,
            question,
            type,
            answers,
          },
        },
      })
    } else {
      await addNewStoredPoll({
        variables: {
          input: {
            question,
            type,
            answers,
          },
        },
      })
    }
  }

  const editPoll = (poll) => {
    setPollToEdit(poll)
    setAddPollModalOpen(true)
  }

  const storedPolls = useStoredPolls(editPoll)

  return (
    <>
      <Modal variant="primary-transparent" isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent color="darkKnight.700">
          <ModalHeader>Manage polls catalog</ModalHeader>
          <ModalBody>{storedPolls}</ModalBody>
          <ModalFooter justifyContent="space-around">
            <Button onClick={addPoll}>Add a poll</Button>
            <Button onClick={onClose} variant="outline">
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <OurModal header={pollToEdit ? 'Poll' : 'New poll'} isOpen={addPollModalOpen}>
        <PollForm
          poll={pollToEdit}
          onClose={() => setAddPollModalOpen(false)}
          onSave={savePoll}
          showCatalog={false}
        />
      </OurModal>
    </>
  )
}
