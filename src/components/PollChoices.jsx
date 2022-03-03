import { gql, useQuery } from '@apollo/client'
import {
  Box,
  CheckboxGroup,
  Radio,
  RadioGroup,
  VStack,
  Checkbox,
  Button,
  HStack,
  Flex,
  Input,
  InputGroup,
} from '@chakra-ui/react'
import { ReactComponent as CheckMark } from '../assets/icons/check-mark.svg'
import { useEffect, useState } from 'react'
import { getPoll } from '../graphql/queries'
import { usePollResponses } from './usePollResponses'

export const PollChoices = ({ pollId, onSubmit, pollMode }) => {
  const [response, setResponse] = useState()
  const [poll, setPoll] = useState()
  const [disabled, setDisabled] = useState(false)
  const responseCounts = usePollResponses(poll)
  const setAnswer = (answer) => {
    setResponse(answer)
  }

  const {
    data: pollData,
    error,
    loading,
  } = useQuery(gql(getPoll), {
    variables: { id: pollId },
  })

  useEffect(() => {
    // duplicated in trainerpoll, make a custom hook
    if (pollData) {
      const p = pollData.getPoll
      setPoll(p)
    }
  }, [pollData])

  if (loading || !poll) {
    return <p>Please wait...</p>
  }

  if (error) {
    console.log('rla-log: Error', error)
    return <p>Error!</p>
  }

  const submit = () => {
    setDisabled(true)
    onSubmit(response)
  }

  const answerCount = (answer) => {
    if (!poll.startedAt) {
      return ''
    }
    if (!responseCounts[answer]) {
      return '(0)'
    }
    return `(${responseCounts[answer]})`
  }

  return (
    <VStack alignItems="baseline">
      <Box fontWeight="bold">{poll.question}</Box>
      <Box paddingLeft="10px">
        {poll.type === 'SINGLECHOICE' ? (
          <RadioGroup onChange={setAnswer} value={response}>
            <VStack alignItems="baseline">
              {poll.answers.map((answer, index) => {
                if (pollMode === 'POLL') {
                  return (
                    <Radio key={answer} value={answer} isDisabled={disabled}>
                      {answer}
                    </Radio>
                  )
                } else {
                  return (
                    // TODO: if (index === poll.correctAnswerIndex) show bold/checkmark or whatever
                    <Flex id="@ken hstack" key={answer}>
                      {answer} {answerCount(answer)}
                      {poll.correctAnswerIndex === index && (
                        <Box marginLeft="10px" marginTop="3px">
                          <CheckMark />
                        </Box>
                      )}
                    </Flex>
                  )
                }
              })}
            </VStack>
          </RadioGroup>
        ) : poll.type === 'MULTICHOICE' ? (
          <CheckboxGroup onChange={setAnswer} value={response}>
            <VStack alignItems="baseline">
              {poll.answers.map((answer) => {
                return pollMode === 'POLL' ? (
                  <Checkbox key={answer} value={answer} isDisabled={disabled}>
                    {answer}
                  </Checkbox>
                ) : (
                  <Box key={answer}>
                    {answer} {answerCount(answer)}
                  </Box>
                )
              })}
            </VStack>
          </CheckboxGroup>
        ) : (
          // <InputGroup onChange={setResponse} value={response}>
          <VStack alignItems="baseline">
            {/* <Input placeholder="Type your answer here" size="sm" key={answer} value={answer}>
                {answer}
              </Input> */}
            <Input
              placeholder="Type your answer here"
              size="sm"
              onChange={(event) => {
                setAnswer(event.target.value)
              }}
              value={response}
            />
          </VStack>
          // </InputGroup>
        )}
      </Box>
      {pollMode === 'POLL' && (
        <HStack>
          <Button size="xs" onClick={submit} isDisabled={disabled || !response}>
            Submit
          </Button>
          {disabled && <Box>Thanks for your response!</Box>}
        </HStack>
      )}
    </VStack>
  )
}
