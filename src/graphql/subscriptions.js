/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateAttendeeByTrainingId = /* GraphQL */ `
  subscription OnUpdateAttendeeByTrainingId($trainingId: ID!) {
    onUpdateAttendeeByTrainingId(trainingId: $trainingId) {
      id
      name
      email
      classPreference
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
        seriesId
        type
        trainerId
        title
        seriesTitle
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        minInPersonAttendees
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
            classPreference
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
            multiAnswerIndexes
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
            classPreference
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
          seriesId
          type
          trainerId
          title
          seriesTitle
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          minInPersonAttendees
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
export const onCreateChatMessageByTrainingId = /* GraphQL */ `
  subscription OnCreateChatMessageByTrainingId($trainingId: ID!) {
    onCreateChatMessageByTrainingId(trainingId: $trainingId) {
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
export const onCreateTrainer = /* GraphQL */ `
  subscription OnCreateTrainer {
    onCreateTrainer {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrainer = /* GraphQL */ `
  subscription OnUpdateTrainer {
    onUpdateTrainer {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTrainer = /* GraphQL */ `
  subscription OnDeleteTrainer {
    onDeleteTrainer {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTraining = /* GraphQL */ `
  subscription OnCreateTraining {
    onCreateTraining {
      id
      seriesId
      type
      trainerId
      title
      seriesTitle
      description
      trainerName
      trainerEmail
      registrationUrl
      maxAttendees
      minInPersonAttendees
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
          classPreference
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
          multiAnswerIndexes
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
export const onUpdateTraining = /* GraphQL */ `
  subscription OnUpdateTraining {
    onUpdateTraining {
      id
      seriesId
      type
      trainerId
      title
      seriesTitle
      description
      trainerName
      trainerEmail
      registrationUrl
      maxAttendees
      minInPersonAttendees
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
          classPreference
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
          multiAnswerIndexes
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
export const onDeleteTraining = /* GraphQL */ `
  subscription OnDeleteTraining {
    onDeleteTraining {
      id
      seriesId
      type
      trainerId
      title
      seriesTitle
      description
      trainerName
      trainerEmail
      registrationUrl
      maxAttendees
      minInPersonAttendees
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
          classPreference
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
          multiAnswerIndexes
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
export const onCreateAttendee = /* GraphQL */ `
  subscription OnCreateAttendee {
    onCreateAttendee {
      id
      name
      email
      classPreference
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
        seriesId
        type
        trainerId
        title
        seriesTitle
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        minInPersonAttendees
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
            classPreference
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
            multiAnswerIndexes
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
            classPreference
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
          seriesId
          type
          trainerId
          title
          seriesTitle
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          minInPersonAttendees
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
export const onUpdateAttendee = /* GraphQL */ `
  subscription OnUpdateAttendee {
    onUpdateAttendee {
      id
      name
      email
      classPreference
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
        seriesId
        type
        trainerId
        title
        seriesTitle
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        minInPersonAttendees
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
            classPreference
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
            multiAnswerIndexes
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
            classPreference
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
          seriesId
          type
          trainerId
          title
          seriesTitle
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          minInPersonAttendees
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
export const onDeleteAttendee = /* GraphQL */ `
  subscription OnDeleteAttendee {
    onDeleteAttendee {
      id
      name
      email
      classPreference
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
        seriesId
        type
        trainerId
        title
        seriesTitle
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        minInPersonAttendees
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
            classPreference
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
            multiAnswerIndexes
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
            classPreference
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
          seriesId
          type
          trainerId
          title
          seriesTitle
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          minInPersonAttendees
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
export const onCreateSharedDoc = /* GraphQL */ `
  subscription OnCreateSharedDoc {
    onCreateSharedDoc {
      id
      title
      type
      url
      shared
      trainingId
      training {
        id
        seriesId
        type
        trainerId
        title
        seriesTitle
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        minInPersonAttendees
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
            classPreference
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
            multiAnswerIndexes
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
export const onUpdateSharedDoc = /* GraphQL */ `
  subscription OnUpdateSharedDoc {
    onUpdateSharedDoc {
      id
      title
      type
      url
      shared
      trainingId
      training {
        id
        seriesId
        type
        trainerId
        title
        seriesTitle
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        minInPersonAttendees
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
            classPreference
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
            multiAnswerIndexes
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
export const onDeleteSharedDoc = /* GraphQL */ `
  subscription OnDeleteSharedDoc {
    onDeleteSharedDoc {
      id
      title
      type
      url
      shared
      trainingId
      training {
        id
        seriesId
        type
        trainerId
        title
        seriesTitle
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        minInPersonAttendees
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
            classPreference
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
            multiAnswerIndexes
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
export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll {
    onCreatePoll {
      id
      question
      type
      answers
      correctAnswerIndex
      trainingId
      startedAt
      stoppedAt
      multiAnswerIndexes
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
            multiAnswerIndexes
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
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll {
    onUpdatePoll {
      id
      question
      type
      answers
      correctAnswerIndex
      trainingId
      startedAt
      stoppedAt
      multiAnswerIndexes
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
            multiAnswerIndexes
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
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll {
    onDeletePoll {
      id
      question
      type
      answers
      correctAnswerIndex
      trainingId
      startedAt
      stoppedAt
      multiAnswerIndexes
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
            multiAnswerIndexes
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
export const onCreateStoredPoll = /* GraphQL */ `
  subscription OnCreateStoredPoll {
    onCreateStoredPoll {
      id
      tags
      question
      type
      answers
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStoredPoll = /* GraphQL */ `
  subscription OnUpdateStoredPoll {
    onUpdateStoredPoll {
      id
      tags
      question
      type
      answers
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStoredPoll = /* GraphQL */ `
  subscription OnDeleteStoredPoll {
    onDeleteStoredPoll {
      id
      tags
      question
      type
      answers
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
        correctAnswerIndex
        trainingId
        startedAt
        stoppedAt
        multiAnswerIndexes
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
        correctAnswerIndex
        trainingId
        startedAt
        stoppedAt
        multiAnswerIndexes
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
        correctAnswerIndex
        trainingId
        startedAt
        stoppedAt
        multiAnswerIndexes
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
export const onCreateChatMessage = /* GraphQL */ `
  subscription OnCreateChatMessage {
    onCreateChatMessage {
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
export const onUpdateChatMessage = /* GraphQL */ `
  subscription OnUpdateChatMessage {
    onUpdateChatMessage {
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
export const onDeleteChatMessage = /* GraphQL */ `
  subscription OnDeleteChatMessage {
    onDeleteChatMessage {
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
export const onCreateStudentGroup = /* GraphQL */ `
  subscription OnCreateStudentGroup {
    onCreateStudentGroup {
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
export const onUpdateStudentGroup = /* GraphQL */ `
  subscription OnUpdateStudentGroup {
    onUpdateStudentGroup {
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
export const onDeleteStudentGroup = /* GraphQL */ `
  subscription OnDeleteStudentGroup {
    onDeleteStudentGroup {
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
export const onCreateStudents = /* GraphQL */ `
  subscription OnCreateStudents {
    onCreateStudents {
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
export const onUpdateStudents = /* GraphQL */ `
  subscription OnUpdateStudents {
    onUpdateStudents {
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
export const onDeleteStudents = /* GraphQL */ `
  subscription OnDeleteStudents {
    onDeleteStudents {
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
export const onCreateInvitedStudent = /* GraphQL */ `
  subscription OnCreateInvitedStudent {
    onCreateInvitedStudent {
      id
      trainingId
      timeSent
      name
      email
      attendeeId
      attendee {
        id
        name
        email
        classPreference
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
          seriesId
          type
          trainerId
          title
          seriesTitle
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          minInPersonAttendees
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInvitedStudent = /* GraphQL */ `
  subscription OnUpdateInvitedStudent {
    onUpdateInvitedStudent {
      id
      trainingId
      timeSent
      name
      email
      attendeeId
      attendee {
        id
        name
        email
        classPreference
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
          seriesId
          type
          trainerId
          title
          seriesTitle
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          minInPersonAttendees
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInvitedStudent = /* GraphQL */ `
  subscription OnDeleteInvitedStudent {
    onDeleteInvitedStudent {
      id
      trainingId
      timeSent
      name
      email
      attendeeId
      attendee {
        id
        name
        email
        classPreference
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
          seriesId
          type
          trainerId
          title
          seriesTitle
          description
          trainerName
          trainerEmail
          registrationUrl
          maxAttendees
          minInPersonAttendees
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEmailContent = /* GraphQL */ `
  subscription OnCreateEmailContent {
    onCreateEmailContent {
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
export const onUpdateEmailContent = /* GraphQL */ `
  subscription OnUpdateEmailContent {
    onUpdateEmailContent {
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
export const onDeleteEmailContent = /* GraphQL */ `
  subscription OnDeleteEmailContent {
    onDeleteEmailContent {
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
export const onCreateBreakoutRoom = /* GraphQL */ `
  subscription OnCreateBreakoutRoom {
    onCreateBreakoutRoom {
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
          classPreference
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
        seriesId
        type
        trainerId
        title
        seriesTitle
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        minInPersonAttendees
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
            classPreference
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
            multiAnswerIndexes
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
export const onUpdateBreakoutRoom = /* GraphQL */ `
  subscription OnUpdateBreakoutRoom {
    onUpdateBreakoutRoom {
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
          classPreference
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
        seriesId
        type
        trainerId
        title
        seriesTitle
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        minInPersonAttendees
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
            classPreference
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
            multiAnswerIndexes
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
export const onDeleteBreakoutRoom = /* GraphQL */ `
  subscription OnDeleteBreakoutRoom {
    onDeleteBreakoutRoom {
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
          classPreference
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
            seriesId
            type
            trainerId
            title
            seriesTitle
            description
            trainerName
            trainerEmail
            registrationUrl
            maxAttendees
            minInPersonAttendees
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
        seriesId
        type
        trainerId
        title
        seriesTitle
        description
        trainerName
        trainerEmail
        registrationUrl
        maxAttendees
        minInPersonAttendees
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
            classPreference
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
            multiAnswerIndexes
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
