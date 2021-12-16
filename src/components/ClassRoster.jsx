import {
  Box,
  Flex,
  Table,
  Tbody,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Center,
  Tr,
  Td,
  Thead,
  Th,
  chakra,
  Tooltip,
  HStack,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { scrollBarStyle } from '../theme/components/scrollbar'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { ReactComponent as HandIcon } from '../assets/icons/hand-icon.svg'
import { ReactComponent as HandIconWhite } from '../assets/icons/hand-icon-white.svg'
import { ReactComponent as HandIcon2 } from '../assets/icons/hand-icon-2.svg'
import { ReactComponent as EyeIcon } from '../assets/icons/eye-icon.svg'
import { ReactComponent as EyeIconRed } from '../assets/icons/eye-icon-red.svg'
import { ReactComponent as CheckMark } from '../assets/icons/check-mark.svg'
import { ReactComponent as XMark } from '../assets/icons/x-mark.svg'
import { MicCamIcon } from './MicCamIcon'
import { gql, useMutation } from '@apollo/client'
import { updateAttendee, updateTraining } from '../graphql/mutations'
import './class-roster.css'

export const ClassRoster = ({ training, attendees, lowerHand, ...props }) => {
  const [anyRaised, setAnyRaised] = useState(false)
  const [updateCurrentTraining] = useMutation(gql(updateTraining))
  const [updateCurrentAttendee] = useMutation(gql(updateAttendee))

  const data = useMemo(() => {
    setAnyRaised(false)
    return attendees.map((attendee) => {
      const attendeePresent = attendee.joinedTime && !attendee.leftTime
      const attendeeFacingCam = attendee.posePitch < 15 && attendee.poseYaw < 15

      if (attendee.handRaised) {
        setAnyRaised(true)
      }

      return {
        name: attendee.name,
        checkIn: attendeePresent,
        eye: attendeeFacingCam,
        hand: { raised: attendee.handRaised, attendeeId: attendee.id },
        attendee,
      }
    })
  }, [attendees])

  const updateTrainingMute = async (state) => {
    await updateCurrentTraining({
      variables: {
        input: {
          id: training.id,
          audioHardMuted: state === 'hard',
          audioStateKey: training.audioStateKey + 1,
        },
      },
    })
  }

  const columns = useMemo(() => {
    const updateAttendeeMute = async (attendee, state) => {
      await updateCurrentAttendee({
        variables: {
          input: {
            id: attendee.id,
            audioHardMuted: state === 'hard',
            audioStateKey: attendee.audioStateKey + 1,
          },
        },
      })
    }

    return [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value }) => (
          <Tooltip hasArrow placement="right" label={value}>
            {value}
          </Tooltip>
        ),
      },
      {
        accessor: 'checkIn',
        sortType: 'basic',
        Cell: ({ value }) => <Center>{value ? <CheckMark /> : <XMark />}</Center>,
      },
      {
        Header: 'Muted',
        accessor: 'attendee',
        sortType: 'basic',
        Cell: ({ value }) => (
          <Center>
            <MicCamIcon              
              hardMuted={value.audioHardMuted}
              isUnmuted={value.audioUnmuted}
              isMic={true}
              onClick={(val) => updateAttendeeMute(value, val)}
            />
          </Center>
        ),
      },
      {
        Header: 'Attentive',
        accessor: 'eye',
        Cell: ({ value }) => <Center>{value ? <EyeIcon /> : <EyeIconRed />}</Center>,
      },
      {
        accessor: 'hand',
        Cell: ({ value }) => {
          return (
            <Box onClick={() => lowerHand(value.attendeeId)}>
              <Center>{value.raised ? <HandIcon2 /> : <HandIcon />}</Center>
            </Box>
          )
        },
      },
    ]
  }, [lowerHand, updateCurrentAttendee])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy,
  )

  const lowerAllHands = (e) => {
    e.preventDefault()
    e.stopPropagation()
    attendees.forEach((attendee) => {
      if (attendee.handRaised) {
        lowerHand(attendee.id)
      }
    })
  }

  return (
    <Accordion allowMultiple width="100%" defaultIndex={0} allowToggle>
      <AccordionItem p={0} m={0} border="none">
        <AccordionButton p="2">
          <Flex
            justifyContent="space-between"
            marginLeft="2"
            flex="1"
            textAlign="left"
            fontWeight="semibold"
            fontSize="0.9em"
          >
            Attendees
          </Flex>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel
          overflowY="auto"
          padding="0"
          sx={scrollBarStyle}
          minHeight="200px"
          maxHeight="40vh"
        >
          <HStack height="20px" justifyContent="end" marginRight="24px" marginTop="5px">
            <MicCamIcon
              hardMuted={training.audioHardMuted}
              isMic={true}
              onClick={(val) => updateTrainingMute(val)}
            />
            <Box onClick={lowerAllHands}>
              <Tooltip hasArrow placement="top" label="Lower all hands">
                <HandIconWhite />
              </Tooltip>
            </Box>
          </HStack>
          {attendees.length !== 0 ? (
            <Table size="sm" width="100%" margin="0" overflow={'scroll'} {...getTableProps()}>
              <Thead
                bg="#455f8f"
                borderBottom="1px"
                borderColor="#ffffff"
                top={0}
                position={'sticky'}
                zIndex={3}
              >
                {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <Th
                        paddingLeft="5px"
                        paddingRight="5px"
                        color="white"
                        cursor="pointer"
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {column.render('Header')}
                        {column.Header === 'Name' ||
                          (column.Header === 'Check-in' && (
                            <chakra.span pl="4">
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <TriangleDownIcon aria-label="sorted descending" />
                                ) : (
                                  <TriangleUpIcon aria-label="sorted ascending" />
                                )
                              ) : null}
                            </chakra.span>
                          ))}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row)
                  return (
                    <Tr className="cell-container" {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <Td {...cell.getCellProps()}>
                          <span>{cell.render('Cell')}</span>
                        </Td>
                      ))}
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          ) : (
            <Tr>
              <Td>*None*</Td>
            </Tr>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
