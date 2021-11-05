import { Box, Flex, HStack, Text } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/input'
import { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/button'
import { useQuery, gql, useMutation } from '@apollo/client'
import { listStudentGroups } from '../graphql/queries'
import { FormControl } from '@chakra-ui/form-control'
import { createStudentGroup, createStudents } from '../graphql/mutations'
import OurModal from './OurModal'
import { useDisclosure } from '@chakra-ui/hooks'
import { buildSubscription } from 'aws-appsync'
import { onCreateStudentGroup } from '../graphql/subscriptions'

export const EmailListForm = ({ onClose }) => {
  const [fileName, setFileName] = useState('')
  const [groups, setGroups] = useState()
  const [groupName, setGroupName] = useState('')
  const [fileInputKey, setFileInputKey] = useState(Date.now())
  const [addNewStudent] = useMutation(gql(createStudents))
  const [addNewGroup] = useMutation(gql(createStudentGroup))
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const { data: groupListData, subscribeToMore } = useQuery(gql(listStudentGroups))

  useEffect(() => {
    if (groupListData) {
      setGroups(groupListData.listStudentGroups.items)
    }
  }, [groupListData])

  useEffect(() => {
    if (subscribeToMore) {
      return subscribeToMore(buildSubscription(gql(onCreateStudentGroup), gql(listStudentGroups)))
    }
  }, [subscribeToMore])

  const onFileChange = (e) => {
    setFileName(e.target.files[0])
  }

  const onUpload = async () => {
    if (groups.find((g) => g.name.toLowerCase() === groupName.toLowerCase())) {
      onModalOpen()
      return
    }
    const result = await addNewGroup({
      variables: {
        input: {
          name: groupName,
        },
      },
    })
    const groupId = result.data.createStudentGroup.id

    const fileReader = new FileReader()
    fileReader.onload = async (e) => {
      const lines = e.target.result.split(/\r?\n/)
      lines.forEach(async (line) => {
        const vals = line.split(',')
        const [fname, lname, email] = vals
        console.log('vals', fname, lname, email)
        if (fname && lname && email) {
          const addStudentResult = await addNewStudent({
            variables: {
              input: {
                firstName: fname.trim(),
                lastName: lname.trim(),
                email: email.trim(),
                groupId,
              },
            },
          })
          console.log(addStudentResult)
        }
      })
      setGroupName('')
      setFileInputKey(Date.now())
    }
    fileReader.readAsText(fileName)
  }

  const onGroupNameChange = (e) => {
    setGroupName(e.target.value)
  }

  const isUploadDisabled = () => {
    return !groupName || !fileName
  }

  return (
    <>
      <Box>Saved email lists:</Box>
      {groups?.length
        ? groups.map((group) => (
          <Box key={group.id} marginLeft="10px">
            {group.name}
            {' ('}
            {group.students.items.length}
            {' students)'}
          </Box>
        ))
        : '*No email lists*'}
      <FormControl border="1px solid lightgrey" padding="10px" borderRadius="6px" marginTop="15px">
        <Text>Upload CSV file</Text>
        <Text fontSize="12px">"First name, Last name, email". Remove any header line.</Text>
        <Input
          size="sm"
          type="file"
          accept=".csv"
          onChange={onFileChange}
          paddingTop="1px"
          key={fileInputKey}
        ></Input>
        <HStack marginTop="10px">
          <Box fontSize="14px" whiteSpace="nowrap">
            New list name
          </Box>
          <Input size="xs" onChange={onGroupNameChange} paddingTop="4px" value={groupName}></Input>
        </HStack>
        <Flex justifyContent="space-between" marginTop="15px">
          <Button isDisabled={isUploadDisabled()} onClick={onUpload}>
            Upload file
          </Button>
          <Button onClick={onClose}>Close</Button>
        </Flex>
      </FormControl>
      <OurModal isOpen={isModalOpen} header="List name already exists">
        <Button onClick={onModalClose}>OK</Button>
      </OurModal>
    </>
  )
}
