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
  Textarea,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import OurModal from './OurModal'
import { useStoredPolls } from './useStoredPolls'

const SingleChoice = 'SINGLECHOICE'
const MultiChoice = 'MULTICHOICE'

export const PollForm = ({ poll, onClose, onSave, showCatalog }) => {
  const [catalogModalOpen, setCatalogModalOpen] = useState(false)
  const [question, setQuestion] = useState(poll?.question || '')
  const [answers, setAnswers] = useState(poll?.answers || ['', ''])
  const [type, setType] = useState(poll?.type || SingleChoice)

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

    // TODO: add correctAnswerIndex (can be null)
    onSave({ pollId: poll?.id, question, type, answers: ans })
    onClose()
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

  const chooseStoredPoll = (poll) => {
    console.log('poll', poll)
    setQuestion(poll.question)
    setAnswers(poll.answers)
    setType(poll.type)
  }

  const storedPolls = useStoredPolls(chooseStoredPoll)

  return (
    <>
      <Box backgroundColor="aliceblue">
        {showCatalog && (
          <Flex justifyContent="right">
            <Button
              size="xs"
              variant="outline"
              height="15px"
              paddingLeft="3px"
              paddingRight="3px"
              onClick={() => setCatalogModalOpen(true)}
            >
              Choose from polls catalog
            </Button>
          </Flex>
        )}
        <FormControl pb={1} isRequired>
          <FormLabel fontWeight="bold" textTransform="uppercase">
            Question
          </FormLabel>
          <Textarea variant="filled" type="text" value={question} onChange={onChangeQuestion} />
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
            <RadioGroup onChange={setType} value={type}>
              <HStack direction="row">
                <Radio value={SingleChoice}>Single choice</Radio>
                <Radio value={MultiChoice}>Multiple choice</Radio>
              </HStack>
            </RadioGroup>
          </Flex>
        </FormControl>
        <FormControl pb={1} isRequired>
          <FormLabel fontWeight="bold" textTransform="uppercase">
            Answers
          </FormLabel>
          <Box
            justifyContent="center"
            alignItems="center"
            border="1px solid lightgrey"
            borderRadius="4px"
            height="fit-content"
            padding="4px"
          >
            {answers.map((answer, index) => {
              // TODO: add checkbox or radio to choose correct answer and set poll.correctAnswerIndex
              // should be able to choose none
              return (
                <Input
                  key={index}
                  height="24px"
                  marginBottom="2px"
                  value={answer}
                  onChange={(e) => {
                    onChangeAnswer(index, e)
                  }}
                />
              )
            })}
            <Button
              minW="128px"
              onClick={addAnswer}
              size="xs"
              icon={<AddIcon />}
              variant="primary-trueblue"
              borderRadius="6px"
            >
              Add an answer
            </Button>
          </Box>
        </FormControl>
      </Box>
      <HStack float="right" mt="3" mb="3" width="100%" justifyContent="space-between">
        <Button size="md" onClick={handleSubmit}>
          Save
        </Button>
        <Button size="md" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </HStack>
      <OurModal
        isOpen={catalogModalOpen}
        header="Choose poll to copy"
        footer={<Button onClick={() => setCatalogModalOpen(false)}>OK</Button>}
      >
        {storedPolls}
      </OurModal>
    </>
  )
}
