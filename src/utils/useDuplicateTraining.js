import { useMutation, gql } from '@apollo/client'
import { createPoll, createSharedDoc, createTraining } from '../graphql/mutations'

export const useDuplicateTraining = () => {
  const [addTraining] = useMutation(gql(createTraining))
  const [addNewPoll] = useMutation(gql(createPoll))
  const [addNewSharedDoc] = useMutation(gql(createSharedDoc))

  const duplicateTraining = async (training) => {
    const now = new Date()
    const tr = await addTraining({
      variables: {
        input: {
          trainerName: training.trainerName,
          title: training.title + ' - copy',
          type: 'TRAINING',
          scheduledTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12, 0, 0), // noon tomorrow
          meetingId: training.meetingId,
          moderatorPasscode: training.moderatorPasscode,
          participantPasscode: training.participantPasscode,
          audioStateKey: 1,
          videoStateKey: 1,
          description: training.description,
          trainerId: training.trainerId,
          trainerEmail: training.trainerEmail,
          maxAttendees: training.maxAttendees,
          whiteboardShared: training.whiteboardShared,
        },
      },
    })
    const newTraining = tr.data.createTraining
    training.polls.items.forEach(async (poll) => {
      await addNewPoll({
        variables: {
          input: {
            question: poll.question,
            trainingId: newTraining.id,
            type: poll.type,
            answers: poll.answers,
          },
        },
      })
    })
    training.sharedDocs.items.forEach(async (sharedDoc) => {
      await addNewSharedDoc({
        variables: {
          input: {
            title: sharedDoc.title,
            trainingId: newTraining.id,
            type: sharedDoc.type,
            url: sharedDoc.url,
          },
        },
      })
    })

    console.log('@ken duplicated', newTraining)
    return tr
  }

  return { duplicateTraining }
}
