/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateAttendeeByTrainingId = /* GraphQL */ `
  subscription OnUpdateAttendeeByTrainingId($trainingId: ID!) {
    onUpdateAttendeeByTrainingId(trainingId: $trainingId) {
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
export const onCreateChatMessageByTrainingId = /* GraphQL */ `
  subscription OnCreateChatMessageByTrainingId($trainingId: ID!) {
    onCreateChatMessageByTrainingId(trainingId: $trainingId) {
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
export const onCreateTraining = /* GraphQL */ `
  subscription OnCreateTraining {
    onCreateTraining {
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
export const onUpdateTraining = /* GraphQL */ `
  subscription OnUpdateTraining {
    onUpdateTraining {
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
export const onDeleteTraining = /* GraphQL */ `
  subscription OnDeleteTraining {
    onDeleteTraining {
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
export const onCreateAttendee = /* GraphQL */ `
  subscription OnCreateAttendee {
    onCreateAttendee {
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
export const onUpdateAttendee = /* GraphQL */ `
  subscription OnUpdateAttendee {
    onUpdateAttendee {
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
export const onDeleteAttendee = /* GraphQL */ `
  subscription OnDeleteAttendee {
    onDeleteAttendee {
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
export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll {
    onCreatePoll {
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
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll {
    onUpdatePoll {
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
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll {
    onDeletePoll {
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
export const onCreatePollResponse = /* GraphQL */ `
  subscription OnCreatePollResponse {
    onCreatePollResponse {
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
export const onUpdatePollResponse = /* GraphQL */ `
  subscription OnUpdatePollResponse {
    onUpdatePollResponse {
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
export const onDeletePollResponse = /* GraphQL */ `
  subscription OnDeletePollResponse {
    onDeletePollResponse {
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
export const onCreateChatMessage = /* GraphQL */ `
  subscription OnCreateChatMessage {
    onCreateChatMessage {
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
export const onUpdateChatMessage = /* GraphQL */ `
  subscription OnUpdateChatMessage {
    onUpdateChatMessage {
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
export const onDeleteChatMessage = /* GraphQL */ `
  subscription OnDeleteChatMessage {
    onDeleteChatMessage {
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
