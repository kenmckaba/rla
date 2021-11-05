/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrainer = /* GraphQL */ `
  query GetTrainer($id: ID!) {
    getTrainer(id: $id) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const listTrainers = /* GraphQL */ `
  query ListTrainers(
    $filter: ModelTrainerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrainers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTraining = /* GraphQL */ `
  query GetTraining($id: ID!) {
    getTraining(id: $id) {
      id
      trainerId
      title
      description
      trainerName
      trainerEmail
      registrationUrl
      maxAttendees
      meetingId
      moderatorPasscode
      participantPasscode
      scheduledTime
      startedAt
      endedAt
      pollMode
      currentPollId
      whiteboardUrl
      whiteboardShared
      attendees {
        items {
          id
          name
          email
          bluejeansName
          handRaised
          joinedTime
          leftTime
          currentMood
          posePitch
          poseYaw
          poseRole
          trainingId
          training {
            id
            trainerId
            title
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            meetingId
            moderatorPasscode
            participantPasscode
            scheduledTime
            startedAt
            endedAt
            pollMode
            currentPollId
            whiteboardUrl
            whiteboardShared
            createdAt
            updatedAt
          }
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
          training {
            id
            trainerId
            title
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            meetingId
            moderatorPasscode
            participantPasscode
            scheduledTime
            startedAt
            endedAt
            pollMode
            currentPollId
            whiteboardUrl
            whiteboardShared
            createdAt
            updatedAt
          }
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
          training {
            id
            trainerId
            title
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            meetingId
            moderatorPasscode
            participantPasscode
            scheduledTime
            startedAt
            endedAt
            pollMode
            currentPollId
            whiteboardUrl
            whiteboardShared
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
      sharedDocs {
        items {
          id
          title
          type
          url
          shared
          trainingId
          training {
            id
            trainerId
            title
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            meetingId
            moderatorPasscode
            participantPasscode
            scheduledTime
            startedAt
            endedAt
            pollMode
            currentPollId
            whiteboardUrl
            whiteboardShared
            createdAt
            updatedAt
          }
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
        trainerId
        title
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        whiteboardUrl
        whiteboardShared
        attendees {
          items {
            id
            name
            email
            bluejeansName
            handRaised
            joinedTime
            leftTime
            currentMood
            posePitch
            poseYaw
            poseRole
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
        sharedDocs {
          items {
            id
            title
            type
            url
            shared
            trainingId
            createdAt
            updatedAt
          }
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
      currentMood
      posePitch
      poseYaw
      poseRole
      trainingId
      training {
        id
        trainerId
        title
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        whiteboardUrl
        whiteboardShared
        attendees {
          items {
            id
            name
            email
            bluejeansName
            handRaised
            joinedTime
            leftTime
            currentMood
            posePitch
            poseYaw
            poseRole
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
        sharedDocs {
          items {
            id
            title
            type
            url
            shared
            trainingId
            createdAt
            updatedAt
          }
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
        currentMood
        posePitch
        poseYaw
        poseRole
        trainingId
        training {
          id
          trainerId
          title
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          meetingId
          moderatorPasscode
          participantPasscode
          scheduledTime
          startedAt
          endedAt
          pollMode
          currentPollId
          whiteboardUrl
          whiteboardShared
          attendees {
            nextToken
          }
          chatMessages {
            nextToken
          }
          polls {
            nextToken
          }
          sharedDocs {
            nextToken
          }
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
export const getSharedDoc = /* GraphQL */ `
  query GetSharedDoc($id: ID!) {
    getSharedDoc(id: $id) {
      id
      title
      type
      url
      shared
      trainingId
      training {
        id
        trainerId
        title
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        whiteboardUrl
        whiteboardShared
        attendees {
          items {
            id
            name
            email
            bluejeansName
            handRaised
            joinedTime
            leftTime
            currentMood
            posePitch
            poseYaw
            poseRole
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
        sharedDocs {
          items {
            id
            title
            type
            url
            shared
            trainingId
            createdAt
            updatedAt
          }
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
export const listSharedDocs = /* GraphQL */ `
  query ListSharedDocs(
    $filter: ModelSharedDocFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSharedDocs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        type
        url
        shared
        trainingId
        training {
          id
          trainerId
          title
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          meetingId
          moderatorPasscode
          participantPasscode
          scheduledTime
          startedAt
          endedAt
          pollMode
          currentPollId
          whiteboardUrl
          whiteboardShared
          attendees {
            nextToken
          }
          chatMessages {
            nextToken
          }
          polls {
            nextToken
          }
          sharedDocs {
            nextToken
          }
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
        trainerId
        title
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        whiteboardUrl
        whiteboardShared
        attendees {
          items {
            id
            name
            email
            bluejeansName
            handRaised
            joinedTime
            leftTime
            currentMood
            posePitch
            poseYaw
            poseRole
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
        sharedDocs {
          items {
            id
            title
            type
            url
            shared
            trainingId
            createdAt
            updatedAt
          }
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
          trainerId
          title
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          meetingId
          moderatorPasscode
          participantPasscode
          scheduledTime
          startedAt
          endedAt
          pollMode
          currentPollId
          whiteboardUrl
          whiteboardShared
          attendees {
            nextToken
          }
          chatMessages {
            nextToken
          }
          polls {
            nextToken
          }
          sharedDocs {
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
          trainerId
          title
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          meetingId
          moderatorPasscode
          participantPasscode
          scheduledTime
          startedAt
          endedAt
          pollMode
          currentPollId
          whiteboardUrl
          whiteboardShared
          attendees {
            nextToken
          }
          chatMessages {
            nextToken
          }
          polls {
            nextToken
          }
          sharedDocs {
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
          training {
            id
            trainerId
            title
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            meetingId
            moderatorPasscode
            participantPasscode
            scheduledTime
            startedAt
            endedAt
            pollMode
            currentPollId
            whiteboardUrl
            whiteboardShared
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
        trainerId
        title
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        meetingId
        moderatorPasscode
        participantPasscode
        scheduledTime
        startedAt
        endedAt
        pollMode
        currentPollId
        whiteboardUrl
        whiteboardShared
        attendees {
          items {
            id
            name
            email
            bluejeansName
            handRaised
            joinedTime
            leftTime
            currentMood
            posePitch
            poseYaw
            poseRole
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
        sharedDocs {
          items {
            id
            title
            type
            url
            shared
            trainingId
            createdAt
            updatedAt
          }
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
          trainerId
          title
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          meetingId
          moderatorPasscode
          participantPasscode
          scheduledTime
          startedAt
          endedAt
          pollMode
          currentPollId
          whiteboardUrl
          whiteboardShared
          attendees {
            nextToken
          }
          chatMessages {
            nextToken
          }
          polls {
            nextToken
          }
          sharedDocs {
            nextToken
          }
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
export const getStudentGroup = /* GraphQL */ `
  query GetStudentGroup($id: ID!) {
    getStudentGroup(id: $id) {
      id
      name
      students {
        items {
          id
          groupId
          group {
            id
            name
            createdAt
            updatedAt
          }
          firstName
          lastName
          email
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
export const listStudentGroups = /* GraphQL */ `
  query ListStudentGroups(
    $filter: ModelStudentGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        students {
          items {
            id
            groupId
            firstName
            lastName
            email
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStudents = /* GraphQL */ `
  query GetStudents($id: ID!) {
    getStudents(id: $id) {
      id
      groupId
      group {
        id
        name
        students {
          items {
            id
            groupId
            firstName
            lastName
            email
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        groupId
        group {
          id
          name
          students {
            nextToken
          }
          createdAt
          updatedAt
        }
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEmailContent = /* GraphQL */ `
  query GetEmailContent($id: ID!) {
    getEmailContent(id: $id) {
      id
      registrationBody
      registrationSubject
      joinBody
      joinSubject
      cancelBody
      cancelSubject
      createdAt
      updatedAt
    }
  }
`;
export const listEmailContents = /* GraphQL */ `
  query ListEmailContents(
    $filter: ModelEmailContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        registrationBody
        registrationSubject
        joinBody
        joinSubject
        cancelBody
        cancelSubject
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
