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
  chakra,
  Tooltip,
  HStack,
} from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'
import { scrollBarStyle } from '../theme/components/scrollbar'
// import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
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

export const ClassRoster = ({ training, attendees }) => {
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
        attendeeAudio: attendee,
        attendeeVideo: attendee,
      }
    })
  }, [attendees])

  const updateAudioTrainingMute = async (state) => {
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

  const updateVideoTrainingMute = async (state) => {
    await updateCurrentTraining({
      variables: {
        input: {
          id: training.id,
          videoHardMuted: state === 'hard',
          videoStateKey: training.videoStateKey + 1,
        },
      },
    })
  }

  const lowerHand = useCallback(
    (attendeeId) => {
      updateCurrentAttendee({
        variables: {
          input: {
            id: attendeeId,
            handRaised: false,
          },
        },
      })
    },
    [updateCurrentAttendee],
  )

  const columns = useMemo(() => {
    const updateAudioAttendeeMute = async (attendee, state) => {
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

    const updateVideoAttendeeMute = async (attendee, state) => {
      await updateCurrentAttendee({
        variables: {
          input: {
            id: attendee.id,
            videoHardMuted: state === 'hard',
            videoStateKey: attendee.videoStateKey + 1,
          },
        },
      })
    }

    return [
      {
        Header: '',
        accessor: 'name',
        Cell: ({ value }) => (
          <Tooltip hasArrow placement="top" label={value}>
            {value}
          </Tooltip>
        ),
      },
      {
        accessor: 'checkIn',
        sortType: 'basic',
        Cell: ({ value }) => (
          <Tooltip hasArrow placement="top" label={value ? 'Present' : 'Absent'}>
            <Center marginRight={3}>{value ? <CheckMark /> : <XMark />}</Center>
          </Tooltip>
        ),
      },
      {
        Header: '',
        accessor: 'attendeeAudio',
        sortType: 'basic',
        Cell: ({ value }) => (
          <Center>
            <MicCamIcon
              hardMuted={!!value.audioHardMuted}
              isUnmuted={value.audioUnmuted}
              isMic={true}
              onClick={(val) => updateAudioAttendeeMute(value, val)}
            />
          </Center>
        ),
      },
      {
        Header: '',
        accessor: 'attendeeVideo',
        sortType: 'basic',
        Cell: ({ value }) => (
          <Center>
            <MicCamIcon
              hardMuted={!!value.videoHardMuted}
              isUnmuted={value.videoUnmuted}
              isMic={false}
              onClick={(val) => updateVideoAttendeeMute(value, val)}
            />
          </Center>
        ),
      },
      {
        Header: '',
        accessor: 'eye',
        Cell: ({ value }) => (
          <Tooltip hasArrow placement="top" label={value ? 'Attentive' : 'Not attentive'}>
            <Center marginRight={3}>{value ? <EyeIcon /> : <EyeIconRed />}</Center>
          </Tooltip>
        ),
      },
      {
        accessor: 'hand',
        Cell: ({ value }) => {
          return (
            <Box onClick={() => lowerHand(value.attendeeId)}>
              <Tooltip hasArrow placement="top" label={value.raised ? 'Lower hand' : 'Not raised'}>
                <Center marginRight={3}>{value.raised ? <HandIcon2 /> : <HandIcon />}</Center>
              </Tooltip>
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

        <AccordionPanel padding="0" minHeight="200px">
          <HStack height="20px" justifyContent="end" marginRight="24px" marginTop="5px">
            <MicCamIcon
              hardMuted={!!training.audioHardMuted}
              isMic={true}
              onClick={(val) => updateAudioTrainingMute(val)}
            />
            <MicCamIcon
              hardMuted={!!training.videoHardMuted}
              isMic={false}
              onClick={(val) => updateVideoTrainingMute(val)}
            />
            <Box onClick={lowerAllHands}>
              <Tooltip hasArrow placement="top" label="Lower all hands">
                {anyRaised ? <HandIconWhite /> : <HandIcon />}
              </Tooltip>
            </Box>
          </HStack>
          {attendees.length !== 0 ? (
            <Table size="sm" width="100%" margin="0" {...getTableProps()}>
              {/* <Thead
                borderBottom="1px"
                borderColor="#ffffff"
                display={'table'}
                width={'100%'}
                style={{ tableLayout: 'fixed' }}
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
              </Thead> */}
              <Tbody
                borderTop="1px"
                marginTop="5px"
                {...getTableBodyProps()}
                display={'block'}
                sx={scrollBarStyle}
              >
                {rows.map((row) => {
                  prepareRow(row)
                  return (
                    <Tr
                      className="cell-container"
                      {...row.getRowProps()}
                      display={'table'}
                      style={{ tableLayout: 'fixed' }}
                    >
                      {row.cells.map((cell) => (
                        <Td width={'100%'} {...cell.getCellProps()}>
                          <chakra.span>{cell.render('Cell')}</chakra.span>
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
