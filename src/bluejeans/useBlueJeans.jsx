import { useState, useEffect } from 'react'
import { BJNWebRTCSDK } from 'bluejeans-webrtc-sdk'

export const webrtcSDK = new BJNWebRTCSDK()

webrtcSDK.setLoggingMode('DEBUG')

export const useBlueJeans = () => {
  const [bjnConnectionState, setBjnConnectionState] = useState()
  const [bjnIsConnected, setBjnIsConnected] = useState(false)
  const [bjnIsInitialized, setBjnIsInitialized] = useState(false)
  const [bjnParticipants, setBjnParticipants] = useState([])
  const [bjnAvailableCameras, setBjnAvailableCameras] = useState()
  // const [bjnIsScreenShareSupported, setBjnIsScreenShareSupported] = useState()
  const [bjnAudioMuted, setBjnAudioMuted] = useState()
  const [bjnAvailableMicrophones, setBjnAvailableMicrophones] = useState()
  const [bjnMeetingHasEnded, setBjnMeetingHasEnded] = useState()
  const [bjnReceivingScreenShare, setBjnReceivingScreenShare] = useState()
  const [bjnSelectedCamera, setBjnSelectedCamera] = useState()
  const [bjnSelectedMicrophone, setBjnSelectedMicrophone] = useState()
  const [bjnSelectedSpeaker, setBjnSelectedSpeaker] = useState()
  const [bjnSelfParticipant, setBjnSelfParticipant] = useState()
  const [bjnSharingScreen, setBjnSharingScreen] = useState()
  const [bjnVideoLayout, setBjnVideoLayout] = useState()
  const [bjnVideoMuted, setBjnVideoMuted] = useState()
  const [bjnVideoState, setBjnVideoState] = useState()
  const [bjnAvailableSpeakers, setBjnAvailableSpeakers] = useState()
  // const [bjnIsSpeakerSelectionAllowed, setBjnIsSpeakerSelectionAllowed] = useState()

  const observe = (key, settingFunc) => {
    console.log('rla-log: initial state', key, webrtcSDK[key])
    try {
      webrtcSDK.observe(key, () => {
        console.log('rla-log: state change', key, webrtcSDK[key])
        settingFunc(webrtcSDK[key])
      })
    } catch (e) {
      console.error('rla-log: observe failed', e)
    }
  }

  useEffect(() => {
    webrtcSDK.initialize().then(() => {
      console.log('rla-log: initialized')
      setBjnIsInitialized(true)

      webrtcSDK.observe('connectionState', () => {
        console.log('rla-log: connectionState', webrtcSDK.connectionState)
        setBjnConnectionState(webrtcSDK.connectionState)
        setBjnIsConnected(webrtcSDK.connectionState === 'CONNECTED')
      })

      observe('participants', setBjnParticipants)
      observe('availableCameras', setBjnAvailableCameras)
      observe('audioMuted', setBjnAudioMuted)
      observe('availableMicrophones', setBjnAvailableMicrophones)
      observe('meetingHasEnded', setBjnMeetingHasEnded)
      observe('receivingScreenShare', setBjnReceivingScreenShare)
      observe('selectedCamera', setBjnSelectedCamera)
      observe('selectedMicrophone', setBjnSelectedMicrophone)
      observe('selectedSpeaker', setBjnSelectedSpeaker)
      observe('selfParticipant', setBjnSelfParticipant)
      observe('sharingScreen', setBjnSharingScreen)
      observe('videoLayout', setBjnVideoLayout)
      observe('videoMuted', setBjnVideoMuted)
      observe('videoState', setBjnVideoState)
      observe('availableSpeakers', setBjnAvailableSpeakers)

      console.log('rla-log: loggingMode', webrtcSDK.loggingMode)

      // throws an exception
      // observe('isScreenShareSupported', setBjnIsScreenShareSupported)
      // observe('isSpeakerSelectionAllowed', setBjnIsSpeakerSelectionAllowed)
    })
  }, [])

  return {
    webrtcSDK,
    bjnIsInitialized,
    bjnConnectionState,
    bjnIsConnected,
    bjnParticipants,
    bjnAvailableCameras,
    bjnAudioMuted,
    bjnAvailableMicrophones,
    bjnMeetingHasEnded,
    bjnReceivingScreenShare,
    bjnSelectedCamera,
    bjnSelectedMicrophone,
    bjnSelectedSpeaker,
    bjnSelfParticipant,
    bjnSharingScreen,
    bjnVideoLayout,
    bjnVideoMuted,
    bjnVideoState,
    bjnAvailableSpeakers,
    // bjnIsScreenShareSupported,
    // bjnIsSpeakerSelectionAllowed,
  }
}
