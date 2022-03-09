import { useMutation, gql } from '@apollo/client'
import { Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody } from '@chakra-ui/react'
import { useState } from 'react'
import { createPoll, updatePoll } from '../graphql/mutations'
import { PollForm } from './PollForm'
import { StoredPolls } from './StoredPolls'

const FORM_MODAL = 'formModal'
const CATALOG_MODAL = 'catalogModal'

export const PollModal = ({ poll, isOpen, trainingId, onClose }) => {
  const [openForm, setOpenForm] = useState(FORM_MODAL)
  const [addNewPoll] = useMutation(gql(createPoll))
  const [updateCurrentPoll] = useMutation(gql(updatePoll))

  const onSave = async ({ pollId, question, type, answers, correctAnswerIndex }) => {
    // TODO: add correctAnswerIndex to input for both add and update
    if (pollId) {
      await updateCurrentPoll({
        variables: {
          input: {
            id: poll.id,
            question,
            trainingId,
            type,
            answers,
            correctAnswerIndex,
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
            correctAnswerIndex,
          },
        },
      })
    }
  }

  const onCopyPolls = (polls) => {
    polls.forEach(async (poll) => {
      await addNewPoll({
        variables: {
          input: {
            question: poll.question,
            trainingId: trainingId,
            type: poll.type,
            answers: poll.answers,
          },
        },
      })
    })
    onModalClose()
  }

  const onModalClose = () => {
    setOpenForm(FORM_MODAL)
    onClose()
  }

  return (
    isOpen && (
      <>
        <Modal isOpen={openForm === FORM_MODAL} scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent color="darkKnight.700">
            <ModalHeader>{poll ? 'Poll' : 'New poll'}</ModalHeader>
            <ModalBody>
              <PollForm
                poll={poll}
                onClose={onModalClose}
                onSave={onSave}
                onShowCatalog={() => setOpenForm(CATALOG_MODAL)}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
        <StoredPolls
          header="Choose poll(s) to copy"
          isOpen={openForm === CATALOG_MODAL}
          onCopy={onCopyPolls}
          onClose={onModalClose}
        />
      </>
    )
  )
}
