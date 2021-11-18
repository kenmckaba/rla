import { useMutation, gql } from '@apollo/client'
import { Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody } from '@chakra-ui/react'
import { createPoll, updatePoll } from '../graphql/mutations'
import { PollForm } from './PollForm'

export const PollModal = ({ poll, isOpen, trainingId, onClose }) => {
  const [addNewPoll] = useMutation(gql(createPoll))
  const [updateCurrentPoll] = useMutation(gql(updatePoll))

  const onSave = async ({ pollId, question, type, answers }) => {
    if (pollId) {
      await updateCurrentPoll({
        variables: {
          input: {
            id: poll.id,
            question,
            trainingId,
            type,
            answers,
          },
        },
      })
    } else {
      await addNewPoll({
        variables: {
          input: {
            question,
            trainingId,
            type,
            answers,
          },
        },
      })
    }
  }

  return (
    <Modal isOpen={isOpen} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent color="darkKnight.700">
        <ModalHeader>{poll ? 'Poll' : 'New poll'}</ModalHeader>
        <ModalBody>
          <PollForm poll={poll} onClose={onClose} onSave={onSave} showCatalog={true} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
