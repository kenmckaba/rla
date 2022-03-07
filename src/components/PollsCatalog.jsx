import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { createStoredPoll, updateStoredPoll } from '../graphql/mutations'

import OurModal from './OurModal'
import { PollForm } from './PollForm'
import { StoredPolls } from './StoredPolls'

export const PollsCatalog = ({ isOpen, onClose }) => {
  const [addNewStoredPoll] = useMutation(gql(createStoredPoll))
  const [editStoredPoll] = useMutation(gql(updateStoredPoll))
  const [addPollModalOpen, setAddPollModalOpen] = useState(false)
  const [pollToEdit, setPollToEdit] = useState()

  const addPoll = () => {
    setPollToEdit(null)
    setAddPollModalOpen(true)
  }

  const savePoll = async ({ pollId, question, type, answers, tags }) => {
    if (pollId) {
      await editStoredPoll({
        variables: {
          input: {
            id: pollId,
            question,
            type,
            answers,
            tags,
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
            tags,
          },
        },
      })
    }
  }

  const editPoll = (poll) => {
    setPollToEdit(poll)
    setAddPollModalOpen(true)
  }

  return (
    <>
      <StoredPolls
        header="Manage polls catalog"
        onPollClick={editPoll}
        isOpen={isOpen}
        onClose={onClose}
        onAddPoll={addPoll}
      />

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
