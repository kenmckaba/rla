import {
  Avatar,
  HStack,
  Tr,
  Td,
  Stat,
  StatLabel,
  StatHelpText,
} from '@chakra-ui/react'
import { prettyTime } from '../../pretty-time'
import { TrainingToolbar } from '../Trainings/TrainingToolbar'

const MAX_ATTENDEE_ICONS = 5

export default function O3TrainingTable({
  past,
  trainings,
  setTrainingHovered,
  trainingHovered,
  handleTrainingClick,
  openRegPage
}) {
  if (!trainings || trainings.length === 0) {
    return (
      <Tr>
        <Td>*None*</Td>
      </Tr>
    )
  }
  const selected = trainings.filter((training) => {
    return past === !!training.startedAt
  })

  if (selected?.length === 0) {
    return (
      <Tr>
        <Td>*None*</Td>
      </Tr>
    )
  }

  return selected.map((training) => (
    <Tr
      key={training.id}
      _hover={{
        bg: 'rgba(255, 255, 255, 0.1)',
      }}
      onMouseEnter={() => {
        setTrainingHovered(training.id)
      }}
      onMouseLeave={() => {
        setTrainingHovered(-1)
      }}
      cursor="pointer"
    >
      <Td>
        <Stat>
          <StatLabel fontSize="1.25em" fontWeight="semibold" textTransform="capitalize">
            {training.title}
          </StatLabel>
          <StatHelpText fontSize="0.75em" textTransform="uppercase">
            trainer: {training.trainerName}
          </StatHelpText>
        </Stat>
      </Td>
      <Td>
        <HStack>
          {training.attendees.items.slice(0, MAX_ATTENDEE_ICONS).map((attendee) => (
            <Avatar
              key={attendee.id}
              name={attendee.name}
              color="white"
              bg="rgba(255, 255, 255, 0.25)"
            />
          ))}
          {training.attendees.items.length > MAX_ATTENDEE_ICONS && (
            <Avatar
              getInitials={(name) => name}
              name={`+${training.attendees.items.length - MAX_ATTENDEE_ICONS}`}
              color="white"
              bg="rgba(255, 255, 255, 0.1)"
            />
          )}
        </HStack>
      </Td>
      <Td></Td>
      <Td>
        {trainingHovered === training.id ? (
          <TrainingToolbar
            editTraining={() => handleTrainingClick(training)}
            startTraining={() => openRegPage(training.id)}
          />
        ) : (
          prettyTime(new Date(Number(training.scheduledTime)))
        )}
      </Td>
    </Tr>
  ))
}
