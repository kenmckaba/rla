/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrainer = /* GraphQL */ `
  mutation CreateTrainer(
    $input: CreateTrainerInput!
    $condition: ModelTrainerConditionInput
  ) {
    createTrainer(input: $input, condition: $condition) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const updateTrainer = /* GraphQL */ `
  mutation UpdateTrainer(
    $input: UpdateTrainerInput!
    $condition: ModelTrainerConditionInput
  ) {
    updateTrainer(input: $input, condition: $condition) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const deleteTrainer = /* GraphQL */ `
  mutation DeleteTrainer(
    $input: DeleteTrainerInput!
    $condition: ModelTrainerConditionInput
  ) {
    deleteTrainer(input: $input, condition: $condition) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const createTraining = /* GraphQL */ `
  mutation CreateTraining(
    $input: CreateTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    createTraining(input: $input, condition: $condition) {
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
          mainTrainingId
          mainTraining {
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
export const updateTraining = /* GraphQL */ `
  mutation UpdateTraining(
    $input: UpdateTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    updateTraining(input: $input, condition: $condition) {
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
          mainTrainingId
          mainTraining {
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
export const deleteTraining = /* GraphQL */ `
  mutation DeleteTraining(
    $input: DeleteTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    deleteTraining(input: $input, condition: $condition) {
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
          mainTrainingId
          mainTraining {
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
            mainTrainingId
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
      mainTrainingId
      mainTraining {
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
            mainTrainingId
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
            mainTrainingId
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
            mainTrainingId
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
      mainTrainingId
      mainTraining {
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
            mainTrainingId
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
            mainTrainingId
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
            mainTrainingId
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
      mainTrainingId
      mainTraining {
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
            mainTrainingId
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
            mainTrainingId
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
export const createSharedDoc = /* GraphQL */ `
  mutation CreateSharedDoc(
    $input: CreateSharedDocInput!
    $condition: ModelSharedDocConditionInput
  ) {
    createSharedDoc(input: $input, condition: $condition) {
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
            mainTrainingId
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
export const updateSharedDoc = /* GraphQL */ `
  mutation UpdateSharedDoc(
    $input: UpdateSharedDocInput!
    $condition: ModelSharedDocConditionInput
  ) {
    updateSharedDoc(input: $input, condition: $condition) {
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
            mainTrainingId
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
export const deleteSharedDoc = /* GraphQL */ `
  mutation DeleteSharedDoc(
    $input: DeleteSharedDocInput!
    $condition: ModelSharedDocConditionInput
  ) {
    deleteSharedDoc(input: $input, condition: $condition) {
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
            mainTrainingId
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
export const createStoredPoll = /* GraphQL */ `
  mutation CreateStoredPoll(
    $input: CreateStoredPollInput!
    $condition: ModelStoredPollConditionInput
  ) {
    createStoredPoll(input: $input, condition: $condition) {
      id
      question
      type
      answers
      createdAt
      updatedAt
    }
  }
`;
export const updateStoredPoll = /* GraphQL */ `
  mutation UpdateStoredPoll(
    $input: UpdateStoredPollInput!
    $condition: ModelStoredPollConditionInput
  ) {
    updateStoredPoll(input: $input, condition: $condition) {
      id
      question
      type
      answers
      createdAt
      updatedAt
    }
  }
`;
export const deleteStoredPoll = /* GraphQL */ `
  mutation DeleteStoredPoll(
    $input: DeleteStoredPollInput!
    $condition: ModelStoredPollConditionInput
  ) {
    deleteStoredPoll(input: $input, condition: $condition) {
      id
      question
      type
      answers
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
      createdAt
      updatedAt
    }
  }
`;
export const createStudentGroup = /* GraphQL */ `
  mutation CreateStudentGroup(
    $input: CreateStudentGroupInput!
    $condition: ModelStudentGroupConditionInput
  ) {
    createStudentGroup(input: $input, condition: $condition) {
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
export const updateStudentGroup = /* GraphQL */ `
  mutation UpdateStudentGroup(
    $input: UpdateStudentGroupInput!
    $condition: ModelStudentGroupConditionInput
  ) {
    updateStudentGroup(input: $input, condition: $condition) {
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
export const deleteStudentGroup = /* GraphQL */ `
  mutation DeleteStudentGroup(
    $input: DeleteStudentGroupInput!
    $condition: ModelStudentGroupConditionInput
  ) {
    deleteStudentGroup(input: $input, condition: $condition) {
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
export const createStudents = /* GraphQL */ `
  mutation CreateStudents(
    $input: CreateStudentsInput!
    $condition: ModelStudentsConditionInput
  ) {
    createStudents(input: $input, condition: $condition) {
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
export const updateStudents = /* GraphQL */ `
  mutation UpdateStudents(
    $input: UpdateStudentsInput!
    $condition: ModelStudentsConditionInput
  ) {
    updateStudents(input: $input, condition: $condition) {
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
export const deleteStudents = /* GraphQL */ `
  mutation DeleteStudents(
    $input: DeleteStudentsInput!
    $condition: ModelStudentsConditionInput
  ) {
    deleteStudents(input: $input, condition: $condition) {
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
export const createInvitedStudent = /* GraphQL */ `
  mutation CreateInvitedStudent(
    $input: CreateInvitedStudentInput!
    $condition: ModelInvitedStudentConditionInput
  ) {
    createInvitedStudent(input: $input, condition: $condition) {
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
export const updateInvitedStudent = /* GraphQL */ `
  mutation UpdateInvitedStudent(
    $input: UpdateInvitedStudentInput!
    $condition: ModelInvitedStudentConditionInput
  ) {
    updateInvitedStudent(input: $input, condition: $condition) {
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
export const deleteInvitedStudent = /* GraphQL */ `
  mutation DeleteInvitedStudent(
    $input: DeleteInvitedStudentInput!
    $condition: ModelInvitedStudentConditionInput
  ) {
    deleteInvitedStudent(input: $input, condition: $condition) {
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
export const createEmailContent = /* GraphQL */ `
  mutation CreateEmailContent(
    $input: CreateEmailContentInput!
    $condition: ModelEmailContentConditionInput
  ) {
    createEmailContent(input: $input, condition: $condition) {
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
export const updateEmailContent = /* GraphQL */ `
  mutation UpdateEmailContent(
    $input: UpdateEmailContentInput!
    $condition: ModelEmailContentConditionInput
  ) {
    updateEmailContent(input: $input, condition: $condition) {
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
export const deleteEmailContent = /* GraphQL */ `
  mutation DeleteEmailContent(
    $input: DeleteEmailContentInput!
    $condition: ModelEmailContentConditionInput
  ) {
    deleteEmailContent(input: $input, condition: $condition) {
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
export const createBreakoutRoom = /* GraphQL */ `
  mutation CreateBreakoutRoom(
    $input: CreateBreakoutRoomInput!
    $condition: ModelBreakoutRoomConditionInput
  ) {
    createBreakoutRoom(input: $input, condition: $condition) {
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
          mainTrainingId
          mainTraining {
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
            mainTrainingId
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
export const updateBreakoutRoom = /* GraphQL */ `
  mutation UpdateBreakoutRoom(
    $input: UpdateBreakoutRoomInput!
    $condition: ModelBreakoutRoomConditionInput
  ) {
    updateBreakoutRoom(input: $input, condition: $condition) {
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
          mainTrainingId
          mainTraining {
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
            mainTrainingId
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
export const deleteBreakoutRoom = /* GraphQL */ `
  mutation DeleteBreakoutRoom(
    $input: DeleteBreakoutRoomInput!
    $condition: ModelBreakoutRoomConditionInput
  ) {
    deleteBreakoutRoom(input: $input, condition: $condition) {
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
          mainTrainingId
          mainTraining {
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
            mainTrainingId
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
