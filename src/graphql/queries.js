/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTraining = /* GraphQL */ `
  query GetTraining($id: ID!) {
    getTraining(id: $id) {
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
export const listTrainings = /* GraphQL */ `
  query ListTrainings(
    $filter: ModelTrainingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrainings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAttendee = /* GraphQL */ `
  query GetAttendee($id: ID!) {
    getAttendee(id: $id) {
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
export const listAttendees = /* GraphQL */ `
  query ListAttendees(
    $filter: ModelAttendeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttendees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPoll = /* GraphQL */ `
  query GetPoll($id: ID!) {
    getPoll(id: $id) {
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
export const listPolls = /* GraphQL */ `
  query ListPolls(
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPollResponse = /* GraphQL */ `
  query GetPollResponse($id: ID!) {
    getPollResponse(id: $id) {
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
export const listPollResponses = /* GraphQL */ `
  query ListPollResponses(
    $filter: ModelPollResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPollResponses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatMessage = /* GraphQL */ `
  query GetChatMessage($id: ID!) {
    getChatMessage(id: $id) {
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
export const listChatMessages = /* GraphQL */ `
  query ListChatMessages(
    $filter: ModelChatMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
