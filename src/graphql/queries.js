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
      type
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
      audioHardMuted
      videoHardMuted
      audioStateKey
      videoStateKey
      pollMode
      currentPollId
      whiteboardUrl
      whiteboardShared
      breakoutInProgress
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
          audioUnmuted
          videoUnmuted
          audioStateKey
          videoStateKey
          audioHardMuted
          videoHardMuted
          trainingId
          training {
            id
            type
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
            audioHardMuted
            videoHardMuted
            audioStateKey
            videoStateKey
            pollMode
            currentPollId
            whiteboardUrl
            whiteboardShared
            breakoutInProgress
            createdAt
            updatedAt
          }
          breakoutRoomId
          breakoutRoom {
            id
            name
            bluejeansMeetingId
            bluejeansModeratorPasscode
            bluejeansParticipantPasscode
            trainingId
            breakoutTrainingId
            createdAt
            updatedAt
          }
          breakoutRoomAttendeeId
          mainTrainingAttendeeId
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
          correctAnswerIndex
          trainingId
          startedAt
          stoppedAt
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
            type
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
            audioHardMuted
            videoHardMuted
            audioStateKey
            videoStateKey
            pollMode
            currentPollId
            whiteboardUrl
            whiteboardShared
            breakoutInProgress
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      breakoutRooms {
        items {
          id
          name
          bluejeansMeetingId
          bluejeansModeratorPasscode
          bluejeansParticipantPasscode
          attendees {
            nextToken
          }
          trainingId
          training {
            id
            type
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
            audioHardMuted
            videoHardMuted
            audioStateKey
            videoStateKey
            pollMode
            currentPollId
            whiteboardUrl
            whiteboardShared
            breakoutInProgress
            createdAt
            updatedAt
          }
          breakoutTrainingId
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
        type
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
        audioHardMuted
        videoHardMuted
        audioStateKey
        videoStateKey
        pollMode
        currentPollId
        whiteboardUrl
        whiteboardShared
        breakoutInProgress
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
            audioUnmuted
            videoUnmuted
            audioStateKey
            videoStateKey
            audioHardMuted
            videoHardMuted
            trainingId
            breakoutRoomId
            breakoutRoomAttendeeId
            mainTrainingAttendeeId
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
            correctAnswerIndex
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
        breakoutRooms {
          items {
            id
            name
            bluejeansMeetingId
            bluejeansModeratorPasscode
            bluejeansParticipantPasscode
            trainingId
            breakoutTrainingId
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
      audioUnmuted
      videoUnmuted
      audioStateKey
      videoStateKey
      audioHardMuted
      videoHardMuted
      trainingId
      training {
        id
        type
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
        audioHardMuted
        videoHardMuted
        audioStateKey
        videoStateKey
        pollMode
        currentPollId
        whiteboardUrl
        whiteboardShared
        breakoutInProgress
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
            audioUnmuted
            videoUnmuted
            audioStateKey
            videoStateKey
            audioHardMuted
            videoHardMuted
            trainingId
            breakoutRoomId
            breakoutRoomAttendeeId
            mainTrainingAttendeeId
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
            correctAnswerIndex
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
        breakoutRooms {
          items {
            id
            name
            bluejeansMeetingId
            bluejeansModeratorPasscode
            bluejeansParticipantPasscode
            trainingId
            breakoutTrainingId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      breakoutRoomId
      breakoutRoom {
        id
        name
        bluejeansMeetingId
        bluejeansModeratorPasscode
        bluejeansParticipantPasscode
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
            audioUnmuted
            videoUnmuted
            audioStateKey
            videoStateKey
            audioHardMuted
            videoHardMuted
            trainingId
            breakoutRoomId
            breakoutRoomAttendeeId
            mainTrainingAttendeeId
            createdAt
            updatedAt
          }
          nextToken
        }
        trainingId
        training {
          id
          type
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
          audioHardMuted
          videoHardMuted
          audioStateKey
          videoStateKey
          pollMode
          currentPollId
          whiteboardUrl
          whiteboardShared
          breakoutInProgress
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
          breakoutRooms {
            nextToken
          }
          createdAt
          updatedAt
        }
        breakoutTrainingId
        createdAt
        updatedAt
      }
      breakoutRoomAttendeeId
      mainTrainingAttendeeId
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
        audioUnmuted
        videoUnmuted
        audioStateKey
        videoStateKey
        audioHardMuted
        videoHardMuted
        trainingId
        training {
          id
          type
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
          audioHardMuted
          videoHardMuted
          audioStateKey
          videoStateKey
          pollMode
          currentPollId
          whiteboardUrl
          whiteboardShared
          breakoutInProgress
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
          breakoutRooms {
            nextToken
          }
          createdAt
          updatedAt
        }
        breakoutRoomId
        breakoutRoom {
          id
          name
          bluejeansMeetingId
          bluejeansModeratorPasscode
          bluejeansParticipantPasscode
          attendees {
            nextToken
          }
          trainingId
          training {
            id
            type
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
            audioHardMuted
            videoHardMuted
            audioStateKey
            videoStateKey
            pollMode
            currentPollId
            whiteboardUrl
            whiteboardShared
            breakoutInProgress
            createdAt
            updatedAt
          }
          breakoutTrainingId
          createdAt
          updatedAt
        }
        breakoutRoomAttendeeId
        mainTrainingAttendeeId
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
        type
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
        audioHardMuted
        videoHardMuted
        audioStateKey
        videoStateKey
        pollMode
        currentPollId
        whiteboardUrl
        whiteboardShared
        breakoutInProgress
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
            audioUnmuted
            videoUnmuted
            audioStateKey
            videoStateKey
            audioHardMuted
            videoHardMuted
            trainingId
            breakoutRoomId
            breakoutRoomAttendeeId
            mainTrainingAttendeeId
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
            correctAnswerIndex
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
        breakoutRooms {
          items {
            id
            name
            bluejeansMeetingId
            bluejeansModeratorPasscode
            bluejeansParticipantPasscode
            trainingId
            breakoutTrainingId
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
          type
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
          audioHardMuted
          videoHardMuted
          audioStateKey
          videoStateKey
          pollMode
          currentPollId
          whiteboardUrl
          whiteboardShared
          breakoutInProgress
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
          breakoutRooms {
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
      correctAnswerIndex
      trainingId
      startedAt
      stoppedAt
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
            correctAnswerIndex
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
        correctAnswerIndex
        trainingId
        startedAt
        stoppedAt
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
export const getStoredPoll = /* GraphQL */ `
  query GetStoredPoll($id: ID!) {
    getStoredPoll(id: $id) {
      id
      question
      type
      answers
      createdAt
      updatedAt
    }
  }
`;
export const listStoredPolls = /* GraphQL */ `
  query ListStoredPolls(
    $filter: ModelStoredPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStoredPolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        type
        answers
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
        correctAnswerIndex
        trainingId
        startedAt
        stoppedAt
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
          correctAnswerIndex
          trainingId
          startedAt
          stoppedAt
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
export const getInvitedStudent = /* GraphQL */ `
  query GetInvitedStudent($id: ID!) {
    getInvitedStudent(id: $id) {
      id
      trainingId
      timeSent
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const listInvitedStudents = /* GraphQL */ `
  query ListInvitedStudents(
    $filter: ModelInvitedStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvitedStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        trainingId
        timeSent
        name
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
export const getBreakoutRoom = /* GraphQL */ `
  query GetBreakoutRoom($id: ID!) {
    getBreakoutRoom(id: $id) {
      id
      name
      bluejeansMeetingId
      bluejeansModeratorPasscode
      bluejeansParticipantPasscode
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
          audioUnmuted
          videoUnmuted
          audioStateKey
          videoStateKey
          audioHardMuted
          videoHardMuted
          trainingId
          training {
            id
            type
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
            audioHardMuted
            videoHardMuted
            audioStateKey
            videoStateKey
            pollMode
            currentPollId
            whiteboardUrl
            whiteboardShared
            breakoutInProgress
            createdAt
            updatedAt
          }
          breakoutRoomId
          breakoutRoom {
            id
            name
            bluejeansMeetingId
            bluejeansModeratorPasscode
            bluejeansParticipantPasscode
            trainingId
            breakoutTrainingId
            createdAt
            updatedAt
          }
          breakoutRoomAttendeeId
          mainTrainingAttendeeId
          createdAt
          updatedAt
        }
        nextToken
      }
      trainingId
      training {
        id
        type
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
        audioHardMuted
        videoHardMuted
        audioStateKey
        videoStateKey
        pollMode
        currentPollId
        whiteboardUrl
        whiteboardShared
        breakoutInProgress
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
            audioUnmuted
            videoUnmuted
            audioStateKey
            videoStateKey
            audioHardMuted
            videoHardMuted
            trainingId
            breakoutRoomId
            breakoutRoomAttendeeId
            mainTrainingAttendeeId
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
            correctAnswerIndex
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
        breakoutRooms {
          items {
            id
            name
            bluejeansMeetingId
            bluejeansModeratorPasscode
            bluejeansParticipantPasscode
            trainingId
            breakoutTrainingId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      breakoutTrainingId
      createdAt
      updatedAt
    }
  }
`;
export const listBreakoutRooms = /* GraphQL */ `
  query ListBreakoutRooms(
    $filter: ModelBreakoutRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBreakoutRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        bluejeansMeetingId
        bluejeansModeratorPasscode
        bluejeansParticipantPasscode
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
            audioUnmuted
            videoUnmuted
            audioStateKey
            videoStateKey
            audioHardMuted
            videoHardMuted
            trainingId
            breakoutRoomId
            breakoutRoomAttendeeId
            mainTrainingAttendeeId
            createdAt
            updatedAt
          }
          nextToken
        }
        trainingId
        training {
          id
          type
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
          audioHardMuted
          videoHardMuted
          audioStateKey
          videoStateKey
          pollMode
          currentPollId
          whiteboardUrl
          whiteboardShared
          breakoutInProgress
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
          breakoutRooms {
            nextToken
          }
          createdAt
          updatedAt
        }
        breakoutTrainingId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
