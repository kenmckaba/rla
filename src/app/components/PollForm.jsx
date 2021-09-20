import React, { useState } from 'react'
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Box,
  RadioGroup,
  Radio,
  Flex,
  Select,
  IconButton,
} from '@chakra-ui/react'
import { useMutation, gql } from '@apollo/client'
import { createPoll, updatePoll } from '../../graphql/mutations'
import { AddIcon } from '@chakra-ui/icons'

const SingleChoice = 'SINGLECHOICE'
const MultiChoice = 'MULTICHOICE'

export const PollForm = ({ trainingId, onClose, poll }) => {
  const [question, setQuestion] = useState(poll?.question || '')
  const [answers, setAnswers] = useState(poll?.answers || [''])
  const [type, setType] = useState(poll?.type || SingleChoice)

  const [addNewPoll, { error }] = useMutation(gql(createPoll))
  const [updateCurrentPoll, { error: updateError }] = useMutation(gql(updatePoll))

  if (error || updateError) {
    return <p>Error!</p>
  }

  if (!answers) {
    return <p>Please wait...</p>
  }

  const onChangeQuestion = (event) => {
    setQuestion(event.target.value)
  }

  const handleSubmit = async () => {
    const ans = answers.reduce((acc, answer) => {
      const a = answer.trim()
      if (a) {
        acc.push(a)
      }
      return acc
    }, [])

    if (poll?.id) {
      updateCurrentPoll({
        variables: {
          input: {
            id: poll.id,
            question,
            trainingId,
            type,
            answers: ans,
          },
        },
      })
      onClose()
    } else {
      await addNewPoll({
        variables: {
          input: {
            question,
            trainingId,
            type,
            answers: ans,
          },
        },
      })
      onClose()
    }
  }

  const onChangeAnswer = (index, e) => {
    setAnswers((prev) => {
      const ans = [...prev]
      ans[index] = e.target.value
      return ans
    })
  }

  const addAnswer = () => {
    setAnswers((prev) => [...prev, ''])
  }
  const handleCancel = () => {
    onClose()
  }

  return (
    <>
      <Box>
        <FormControl pb={1} isRequired>
          <FormLabel fontWeight="bold" textTransform="uppercase">
            Question
          </FormLabel>
          <Input
            variant="filled"
            placeholder="Type question here"
            type="text"
            value={question}
            onChange={onChangeQuestion}
          />
        </FormControl>
        <FormControl pb={1} isRequired>
          <FormLabel fontWeight="bold" textTransform="uppercase">
            Poll type
          </FormLabel>
          <Flex
            justifyContent="center"
            alignItems="center"
            border="1px solid lightgrey"
            borderRadius="4px"
            height="36px"
          >
            <Select onChange={(e) => setType(e.target.value)} value={type}>
              <option value={SingleChoice}>Single choice</option>
              <option value={MultiChoice}>Multiple choice</option>
            </Select>
          </Flex>
        </FormControl>
        <FormControl pb={1} isRequired>
          <FormLabel fontWeight="bold" textTransform="uppercase">
            Answers
          </FormLabel>
          <Box
            justifyContent="center"
            alignItems="center"
            height="fit-content"
            padding="4px"
            marginBottom="2"
          >
            {answers.map((answer, index) => {
              return (
                <Input
                  variant="filled"
                  placeholder="Type answer here"
                  key={index}
                  marginBottom="2"
                  value={answer}
                  onChange={(e) => {
                    onChangeAnswer(index, e)
                  }}
                />
              )
            })}
          </Box>
          <Button
            minW="128px"
            size="xs"
            leftIcon={<AddIcon />}
            variant="primary-trueblue"
            onClick={addAnswer}
          >
            Add answer
          </Button>
        </FormControl>
      </Box>
      <HStack spacing="3" marginBlock="3">
        <Button w="100%" size="md" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button w="100%" size="md" onClick={handleSubmit}>
          Save
        </Button>
      </HStack>
    </>
  )
}
