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
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getPoll } from '../graphql/queries'

export const PollChoices = ({ pollId, onSubmit, pollMode }) => {
  const [value, setValue] = useState()
  const [poll, setPoll] = useState()
  const [disabled, setDisabled] = useState(false)
  const [responseCounts, setResponseCounts] = useState({})

  const {
    data: pollData,
    error,
    loading,
  } = useQuery(gql(getPoll), {
    variables: { id: pollId },
  })

  useEffect(() => {
    if (pollData) {
      const p = pollData.getPoll
      setPoll(p)
      const counts = p.responses.items.reduce((acc, resp) => {
        if (acc[resp.response] === undefined) {
          acc[resp.response] = 0
        }
        acc[resp.response] += 1
        return acc
      }, {})
      setResponseCounts(counts)
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
    onSubmit(value)
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
      <Box fontWeight="medium">{poll.question}</Box>
      {poll.type === 'SINGLECHOICE' ? (
        <RadioGroup onChange={setValue} value={value}>
          <VStack alignItems="baseline">
            {poll.answers.map((answer) => {
              if (pollMode === 'POLL') {
                return (
                  <Radio key={answer} value={answer} isDisabled={disabled}>
                    {answer}
                  </Radio>
                )
              } else {
                return (
                  <Box key={answer}>
                    {answer} {answerCount(answer)}
                  </Box>
                )
              }
            })}
          </VStack>
        </RadioGroup>
      ) : (
        <CheckboxGroup onChange={setValue} value={value}>
          <VStack alignItems="baseline">
            {poll.answers.map((answer) => {
              return (
                <Checkbox key={answer} value={answer} isDisabled={disabled}>
                  {answer}
                </Checkbox>
              )
            })}
          </VStack>
        </CheckboxGroup>
      )}
      {pollMode === 'POLL' && (
        <HStack>
          <Button size="xs" onClick={submit} isDisabled={disabled || !value}>
            Submit
          </Button>
          {disabled && <Box>Thanks for your response!</Box>}
        </HStack>
      )}
    </VStack>
  )
}
