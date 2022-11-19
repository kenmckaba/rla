/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTrainer = /* GraphQL */ `
  subscription OnCreateTrainer($filter: ModelSubscriptionTrainerFilterInput) {
    onCreateTrainer(filter: $filter) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrainer = /* GraphQL */ `
  subscription OnUpdateTrainer($filter: ModelSubscriptionTrainerFilterInput) {
    onUpdateTrainer(filter: $filter) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTrainer = /* GraphQL */ `
  subscription OnDeleteTrainer($filter: ModelSubscriptionTrainerFilterInput) {
    onDeleteTrainer(filter: $filter) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTraining = /* GraphQL */ `
  subscription OnCreateTraining($filter: ModelSubscriptionTrainingFilterInput) {
    onCreateTraining(filter: $filter) {
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
      maxInPersonAttendees
      maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
  subscription OnUpdateTraining($filter: ModelSubscriptionTrainingFilterInput) {
    onUpdateTraining(filter: $filter) {
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
      maxInPersonAttendees
      maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
  subscription OnDeleteTraining($filter: ModelSubscriptionTrainingFilterInput) {
    onDeleteTraining(filter: $filter) {
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
      maxInPersonAttendees
      maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
  subscription OnCreateAttendee($filter: ModelSubscriptionAttendeeFilterInput) {
    onCreateAttendee(filter: $filter) {
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
        maxInPersonAttendees
        maxOnlineAttendees
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
          maxInPersonAttendees
          maxOnlineAttendees
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
  subscription OnUpdateAttendee($filter: ModelSubscriptionAttendeeFilterInput) {
    onUpdateAttendee(filter: $filter) {
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
        maxInPersonAttendees
        maxOnlineAttendees
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
          maxInPersonAttendees
          maxOnlineAttendees
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
  subscription OnDeleteAttendee($filter: ModelSubscriptionAttendeeFilterInput) {
    onDeleteAttendee(filter: $filter) {
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
        maxInPersonAttendees
        maxOnlineAttendees
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
          maxInPersonAttendees
          maxOnlineAttendees
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
  subscription OnCreateSharedDoc(
    $filter: ModelSubscriptionSharedDocFilterInput
  ) {
    onCreateSharedDoc(filter: $filter) {
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
        maxInPersonAttendees
        maxOnlineAttendees
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
  subscription OnUpdateSharedDoc(
    $filter: ModelSubscriptionSharedDocFilterInput
  ) {
    onUpdateSharedDoc(filter: $filter) {
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
        maxInPersonAttendees
        maxOnlineAttendees
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
  subscription OnDeleteSharedDoc(
    $filter: ModelSubscriptionSharedDocFilterInput
  ) {
    onDeleteSharedDoc(filter: $filter) {
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
        maxInPersonAttendees
        maxOnlineAttendees
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
  subscription OnCreatePoll($filter: ModelSubscriptionPollFilterInput) {
    onCreatePoll(filter: $filter) {
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
  subscription OnUpdatePoll($filter: ModelSubscriptionPollFilterInput) {
    onUpdatePoll(filter: $filter) {
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
  subscription OnDeletePoll($filter: ModelSubscriptionPollFilterInput) {
    onDeletePoll(filter: $filter) {
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
  subscription OnCreateStoredPoll(
    $filter: ModelSubscriptionStoredPollFilterInput
  ) {
    onCreateStoredPoll(filter: $filter) {
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
  subscription OnUpdateStoredPoll(
    $filter: ModelSubscriptionStoredPollFilterInput
  ) {
    onUpdateStoredPoll(filter: $filter) {
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
  subscription OnDeleteStoredPoll(
    $filter: ModelSubscriptionStoredPollFilterInput
  ) {
    onDeleteStoredPoll(filter: $filter) {
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
  subscription OnCreatePollResponse(
    $filter: ModelSubscriptionPollResponseFilterInput
  ) {
    onCreatePollResponse(filter: $filter) {
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
  subscription OnUpdatePollResponse(
    $filter: ModelSubscriptionPollResponseFilterInput
  ) {
    onUpdatePollResponse(filter: $filter) {
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
  subscription OnDeletePollResponse(
    $filter: ModelSubscriptionPollResponseFilterInput
  ) {
    onDeletePollResponse(filter: $filter) {
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
  subscription OnCreateChatMessage(
    $filter: ModelSubscriptionChatMessageFilterInput
  ) {
    onCreateChatMessage(filter: $filter) {
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
  subscription OnUpdateChatMessage(
    $filter: ModelSubscriptionChatMessageFilterInput
  ) {
    onUpdateChatMessage(filter: $filter) {
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
  subscription OnDeleteChatMessage(
    $filter: ModelSubscriptionChatMessageFilterInput
  ) {
    onDeleteChatMessage(filter: $filter) {
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
  subscription OnCreateStudentGroup(
    $filter: ModelSubscriptionStudentGroupFilterInput
  ) {
    onCreateStudentGroup(filter: $filter) {
      id
      name
      numStudents
      students {
        items {
          id
          groupId
          group {
            id
            name
            numStudents
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
  subscription OnUpdateStudentGroup(
    $filter: ModelSubscriptionStudentGroupFilterInput
  ) {
    onUpdateStudentGroup(filter: $filter) {
      id
      name
      numStudents
      students {
        items {
          id
          groupId
          group {
            id
            name
            numStudents
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
  subscription OnDeleteStudentGroup(
    $filter: ModelSubscriptionStudentGroupFilterInput
  ) {
    onDeleteStudentGroup(filter: $filter) {
      id
      name
      numStudents
      students {
        items {
          id
          groupId
          group {
            id
            name
            numStudents
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
  subscription OnCreateStudents($filter: ModelSubscriptionStudentsFilterInput) {
    onCreateStudents(filter: $filter) {
      id
      groupId
      group {
        id
        name
        numStudents
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
  subscription OnUpdateStudents($filter: ModelSubscriptionStudentsFilterInput) {
    onUpdateStudents(filter: $filter) {
      id
      groupId
      group {
        id
        name
        numStudents
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
  subscription OnDeleteStudents($filter: ModelSubscriptionStudentsFilterInput) {
    onDeleteStudents(filter: $filter) {
      id
      groupId
      group {
        id
        name
        numStudents
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
  subscription OnCreateInvitedStudent(
    $filter: ModelSubscriptionInvitedStudentFilterInput
  ) {
    onCreateInvitedStudent(filter: $filter) {
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
          maxInPersonAttendees
          maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
  subscription OnUpdateInvitedStudent(
    $filter: ModelSubscriptionInvitedStudentFilterInput
  ) {
    onUpdateInvitedStudent(filter: $filter) {
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
          maxInPersonAttendees
          maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
  subscription OnDeleteInvitedStudent(
    $filter: ModelSubscriptionInvitedStudentFilterInput
  ) {
    onDeleteInvitedStudent(filter: $filter) {
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
          maxInPersonAttendees
          maxOnlineAttendees
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
            maxInPersonAttendees
            maxOnlineAttendees
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
  subscription OnCreateEmailContent(
    $filter: ModelSubscriptionEmailContentFilterInput
  ) {
    onCreateEmailContent(filter: $filter) {
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
  subscription OnUpdateEmailContent(
    $filter: ModelSubscriptionEmailContentFilterInput
  ) {
    onUpdateEmailContent(filter: $filter) {
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
  subscription OnDeleteEmailContent(
    $filter: ModelSubscriptionEmailContentFilterInput
  ) {
    onDeleteEmailContent(filter: $filter) {
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
  subscription OnCreateBreakoutRoom(
    $filter: ModelSubscriptionBreakoutRoomFilterInput
  ) {
    onCreateBreakoutRoom(filter: $filter) {
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
            maxInPersonAttendees
            maxOnlineAttendees
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
        maxInPersonAttendees
        maxOnlineAttendees
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
  subscription OnUpdateBreakoutRoom(
    $filter: ModelSubscriptionBreakoutRoomFilterInput
  ) {
    onUpdateBreakoutRoom(filter: $filter) {
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
            maxInPersonAttendees
            maxOnlineAttendees
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
        maxInPersonAttendees
        maxOnlineAttendees
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
  subscription OnDeleteBreakoutRoom(
    $filter: ModelSubscriptionBreakoutRoomFilterInput
  ) {
    onDeleteBreakoutRoom(filter: $filter) {
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
            maxInPersonAttendees
            maxOnlineAttendees
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
        maxInPersonAttendees
        maxOnlineAttendees
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
