import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  FormControl,
  Select,
  Flex,
  FormLabel,
} from '@chakra-ui/react'
import { useBlueJeans } from '../bluejeans/useBlueJeans'
import { Selections } from './Selections'

export const MicCamControls = ({ localVideoRef, isModerator }) => {
  const {
    bjnApi,
    bjnVideoMuted,
    bjnAudioMuted,
    bjnAvailableCameras,
    bjnAvailableMicrophones,
    bjnSelectedCamera,
    bjnSelectedMicrophone,
    bjnWebcamLayouts,
    bjnVideoLayout,
    bjnIsConnected,
    bjnSharingScreen,
  } = useBlueJeans()

  const muteCam = (e) => {
    bjnApi.setVideoMuted(e.target.checked)
  }

  const muteMic = (e) => {
    bjnApi.setAudioMuted(e.target.checked)
  }

  const setLayout = (e) => {
    bjnApi.setVideoLayout(e.target.value)
  }

  const shareScreen = (e) => {
    if (e.target.checked) {
      bjnApi.startScreenShare()
    } else {
      bjnApi.stopScreenShare()
    }
  }

  return (
    <>
      {/*       {isModerator && (
        <FormControl borderRadius="5px" p="5px">
          <Box marginLeft="5px">
            <Checkbox size="sm" onChange={shareScreen} isChecked={!!bjnSharingScreen}>
              Share my screen
            </Checkbox>
          </Box>
        </FormControl>
      )} */}
      {/*       <FormControl pb={2} isRequired>
        <FormLabel mb={1} fontWeight="bold" textTransform="uppercase">
          Poll type
        </FormLabel>
        <Select>
          <option>Single choice</option>
          <option>Multiple choice</option>
        </Select>
      </FormControl> */}
      <FormControl pt="8">
        <FormLabel mb={1} fontWeight="bold" textTransform="uppercase">
          Microphone
        </FormLabel>
        {/*         <Checkbox
          size="sm"
          onChange={muteMic}
          isChecked={!!bjnAudioMuted}
          marginTop="5px"
          marginLeft="5px"
        >
          Mute my microphone
        </Checkbox> */}
        <Selections
          choices={bjnAvailableMicrophones}
          selectedId={bjnSelectedMicrophone?.id}
          changeSelection={bjnApi.selectMicrophone}
        />
      </FormControl>
      {/*       <FormControl borderRadius="5px" p="5px" paddingTop="0">
        <Box fontSize="14px" paddingLeft="5px">
          Webcam layout
        </Box>
        <Select size="xs" onChange={setLayout} value={bjnVideoLayout || ''}>
          {bjnWebcamLayouts.map((layout, index) => {
            return <option key={index}>{layout}</option>
          })}
        </Select>
      </FormControl> */}
      <FormControl pt="2">
        {/*         <Checkbox
          size="sm"
          onChange={muteCam}
          isChecked={!!bjnVideoMuted}
          marginTop="5px"
          marginLeft="5px"
        >
          Mute my camera
        </Checkbox> */}
        <FormLabel mb={1} fontWeight="bold" textTransform="uppercase">
          Camera
        </FormLabel>
        <Selections
          choices={bjnAvailableCameras}
          selectedId={bjnSelectedCamera?.id}
          changeSelection={bjnApi.selectCamera}
        />
        <Accordion
          allowMultiple
          width="100%"
          allowToggle
          background="white"
          style={bjnVideoMuted || !bjnIsConnected ? { display: 'none' } : {}}
          defaultIndex={0}
          marginTop="5px"
          borderRadius="5px"
        >
          <AccordionItem border="none">
            <AccordionButton padding="0px" paddingLeft="5px">
              <Box flex="1" textAlign="left">
                My camera
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel padding="0" pb={4}>
              <video ref={localVideoRef} border-radius="10px" background="lightblue" width="100%" />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </FormControl>
    </>
  )
}
