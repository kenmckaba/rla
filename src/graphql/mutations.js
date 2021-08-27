/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTraining = /* GraphQL */ `
  mutation CreateTraining(
    $input: CreateTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    createTraining(input: $input, condition: $condition) {
      id
      title
      description
      trainerName
      meetingId
      moderatorPasscode
      participantPasscode
      scheduledTime
      startedAt
      endedAt
      pollMode
      currentPollId
      attendees {
        items {
          id
          name
          email
          bluejeansName
          handRaised
          joinedTime
          leftTime
          trainingId
          createdAt
          updatedAt
        }
        nextToken
      }
      chatMessages {
        items {
          id
          content
          timeSent
          fromId
          toId
          trainingId
          createdAt
          updatedAt
        }
        nextToken
      }
      polls {
        items {
          id
          question
          type
          answers
          trainingId
          startedAt
          stoppedAt
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTraining = /* GraphQL */ `
  mutation UpdateTraining(
    $input: UpdateTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    updateTraining(input: $input, condition: $condition) {
      id
      title
      description
      trainerName
      meetingId
      moderatorPasscode
      participantPasscode
      scheduledTime
      startedAt
      endedAt
      pollMode
      currentPollId
      attendees {
        items {
          id
          name
          email
          bluejeansName
          handRaised
          joinedTime
          leftTime
          trainingId
          createdAt
          updatedAt
        }
        nextToken
      }
      chatMessages {
        items {
          id
          content
          timeSent
          fromId
          toId
          trainingId
          createdAt
          updatedAt
        }
        nextToken
      }
      polls {
        items {
          id
          question
          type
          answers
          trainingId
          startedAt
          stoppedAt
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTraining = /* GraphQL */ `
  mutation DeleteTraining(
    $input: DeleteTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    deleteTraining(input: $input, condition: $condition) {
      id
      title
      description
      trainerName
      meetingId
      moderatorPasscode
      participantPasscode
      scheduledTime
      startedAt
      endedAt
      pollMode
      currentPollId
      attendees {
        items {
          id
          name
          email
          bluejeansName
          handRaised
          joinedTime
          leftTime
          trainingId
          createdAt
          updatedAt
        }
        nextToken
      }
      chatMessages {
        items {
          id
          content
          timeSent
          fromId
          toId
          trainingId
          createdAt
          updatedAt
        }
        nextToken
      }
      polls {
        items {
          id
          question
          type
          answers
          trainingId
          startedAt
          stoppedAt
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createAttendee = /* GraphQL */ `
  mutation CreateAttendee(
    $input: CreateAttendeeInput!
    $condition: ModelAttendeeConditionInput
  ) {
    createAttendee(input: $input, condition: $condition) {
      id
      name
      email
      bluejeansName
      handRaised
      joinedTime
      leftTime
      trainingId
      training {
        id
        title
        description
        trainerName
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        attendees {
          nextToken
        }
        chatMessages {
          nextToken
        }
        polls {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAttendee = /* GraphQL */ `
  mutation UpdateAttendee(
    $input: UpdateAttendeeInput!
    $condition: ModelAttendeeConditionInput
  ) {
    updateAttendee(input: $input, condition: $condition) {
      id
      name
      email
      bluejeansName
      handRaised
      joinedTime
      leftTime
      trainingId
      training {
        id
        title
        description
        trainerName
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        attendees {
          nextToken
        }
        chatMessages {
          nextToken
        }
        polls {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAttendee = /* GraphQL */ `
  mutation DeleteAttendee(
    $input: DeleteAttendeeInput!
    $condition: ModelAttendeeConditionInput
  ) {
    deleteAttendee(input: $input, condition: $condition) {
      id
      name
      email
      bluejeansName
      handRaised
      joinedTime
      leftTime
      trainingId
      training {
        id
        title
        description
        trainerName
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        attendees {
          nextToken
        }
        chatMessages {
          nextToken
        }
        polls {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPoll = /* GraphQL */ `
  mutation CreatePoll(
    $input: CreatePollInput!
    $condition: ModelPollConditionInput
  ) {
    createPoll(input: $input, condition: $condition) {
      id
      question
      type
      answers
      trainingId
      startedAt
      stoppedAt
      training {
        id
        title
        description
        trainerName
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        attendees {
          nextToken
        }
        chatMessages {
          nextToken
        }
        polls {
          nextToken
        }
        createdAt
        updatedAt
      }
      responses {
        items {
          id
          attendeeId
          pollId
          response
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePoll = /* GraphQL */ `
  mutation UpdatePoll(
    $input: UpdatePollInput!
    $condition: ModelPollConditionInput
  ) {
    updatePoll(input: $input, condition: $condition) {
      id
      question
      type
      answers
      trainingId
      startedAt
      stoppedAt
      training {
        id
        title
        description
        trainerName
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        attendees {
          nextToken
        }
        chatMessages {
          nextToken
        }
        polls {
          nextToken
        }
        createdAt
        updatedAt
      }
      responses {
        items {
          id
          attendeeId
          pollId
          response
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePoll = /* GraphQL */ `
  mutation DeletePoll(
    $input: DeletePollInput!
    $condition: ModelPollConditionInput
  ) {
    deletePoll(input: $input, condition: $condition) {
      id
      question
      type
      answers
      trainingId
      startedAt
      stoppedAt
      training {
        id
        title
        description
        trainerName
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        attendees {
          nextToken
        }
        chatMessages {
          nextToken
        }
        polls {
          nextToken
        }
        createdAt
        updatedAt
      }
      responses {
        items {
          id
          attendeeId
          pollId
          response
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPollResponse = /* GraphQL */ `
  mutation CreatePollResponse(
    $input: CreatePollResponseInput!
    $condition: ModelPollResponseConditionInput
  ) {
    createPollResponse(input: $input, condition: $condition) {
      id
      attendeeId
      pollId
      response
      poll {
        id
        question
        type
        answers
        trainingId
        startedAt
        stoppedAt
        training {
          id
          title
          description
          trainerName
          meetingId
          moderatorPasscode
          participantPasscode
          scheduledTime
          startedAt
          endedAt
          pollMode
          currentPollId
          createdAt
          updatedAt
        }
        responses {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePollResponse = /* GraphQL */ `
  mutation UpdatePollResponse(
    $input: UpdatePollResponseInput!
    $condition: ModelPollResponseConditionInput
  ) {
    updatePollResponse(input: $input, condition: $condition) {
      id
      attendeeId
      pollId
      response
      poll {
        id
        question
        type
        answers
        trainingId
        startedAt
        stoppedAt
        training {
          id
          title
          description
          trainerName
          meetingId
          moderatorPasscode
          participantPasscode
          scheduledTime
          startedAt
          endedAt
          pollMode
          currentPollId
          createdAt
          updatedAt
        }
        responses {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePollResponse = /* GraphQL */ `
  mutation DeletePollResponse(
    $input: DeletePollResponseInput!
    $condition: ModelPollResponseConditionInput
  ) {
    deletePollResponse(input: $input, condition: $condition) {
      id
      attendeeId
      pollId
      response
      poll {
        id
        question
        type
        answers
        trainingId
        startedAt
        stoppedAt
        training {
          id
          title
          description
          trainerName
          meetingId
          moderatorPasscode
          participantPasscode
          scheduledTime
          startedAt
          endedAt
          pollMode
          currentPollId
          createdAt
          updatedAt
        }
        responses {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChatMessage = /* GraphQL */ `
  mutation CreateChatMessage(
    $input: CreateChatMessageInput!
    $condition: ModelChatMessageConditionInput
  ) {
    createChatMessage(input: $input, condition: $condition) {
      id
      content
      timeSent
      fromId
      toId
      trainingId
      training {
        id
        title
        description
        trainerName
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        attendees {
          nextToken
        }
        chatMessages {
          nextToken
        }
        polls {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChatMessage = /* GraphQL */ `
  mutation UpdateChatMessage(
    $input: UpdateChatMessageInput!
    $condition: ModelChatMessageConditionInput
  ) {
    updateChatMessage(input: $input, condition: $condition) {
      id
      content
      timeSent
      fromId
      toId
      trainingId
      training {
        id
        title
        description
        trainerName
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        attendees {
          nextToken
        }
        chatMessages {
          nextToken
        }
        polls {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatMessage = /* GraphQL */ `
  mutation DeleteChatMessage(
    $input: DeleteChatMessageInput!
    $condition: ModelChatMessageConditionInput
  ) {
    deleteChatMessage(input: $input, condition: $condition) {
      id
      content
      timeSent
      fromId
      toId
      trainingId
      training {
        id
        title
        description
        trainerName
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        attendees {
          nextToken
        }
        chatMessages {
          nextToken
        }
        polls {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
