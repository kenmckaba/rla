import { useState, useEffect } from 'react'
import { BJNWebRTCSDK } from 'bluejeans-webrtc-sdk'

const log = (...args) => {
  console.log.call(null, new Date().toISOString().substr(11, 12), 'rla-log:', ...args)
}

const webrtcSDK = new BJNWebRTCSDK()

webrtcSDK.setLoggingMode('DEBUG')

const bjnApi = {
  join: function (meetingId, passcode, name) {
    log('call join', meetingId, passcode, name)
    return webrtcSDK.join(meetingId, passcode, name)
  },
  setName: function (name) {
    log('call setName', name)
    return webrtcSDK.setName(name)
  },
  attachLocalVideo: function (ref) {
    log('call attachLocalVideo', ref)
    return webrtcSDK.attachLocalVideo(ref)
  },
  attachRemoteVideo: function (ref) {
    log('call attachRemoteVideo', ref)
    return webrtcSDK.attachRemoteVideo(ref)
  },
  attachRemoteContent: function (ref) {
    log('call attachRemoteContent', ref)
    return webrtcSDK.attachRemoteContent(ref)
  },
  leave: function (end) {
    log('call leave', end)
    return webrtcSDK.leave(end)
  },
  setVideoMuted: function (val) {
    log('call setVideoMuted', val)
    return webrtcSDK.setVideoMuted(val)
  },
  setAudioMuted: function (val) {
    log('call setAudioMuted', val)
    return webrtcSDK.setAudioMuted(val)
  },
  startScreenShare: function () {
    log('call startScreenShare')
    return webrtcSDK.startScreenShare()
  },
  stopScreenShare: function () {
    log('call stopScreenShare')
    return webrtcSDK.stopScreenShare()
  },
  selectCamera: function (val) {
    log('call selectCamera', val)
    return webrtcSDK.selectCamera(val)
  },
  selectMicrophone: function (val) {
    log('call selectMicrophone', val)
    return webrtcSDK.selectMicrophone(val)
  },
  setVideoLayout: function (val) {
    log('call setVideoLayout', val)
    return webrtcSDK.setVideoLayout(val)
  },
  setSelfVideoPreviewEnabled: function (val) {
    log('call setSelfVideoPreviewEnabled', val)
    return webrtcSDK.setSelfVideoPreviewEnabled(val)
  },
}

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
  const [bjnCamInUseError, setBjnCamInUseError] = useState(0)

  // const [bjnSelfVideoPreviewEnabled, setBjnSelfVideoPreviewEnabled] = useState()
  // const [bjnIsSpeakerSelectionAllowed, setBjnIsSpeakerSelectionAllowed] = useState()

  const observe = (key, settingFunc) => {
    log('state initial', key, webrtcSDK[key])
    settingFunc(webrtcSDK[key])
    try {
      webrtcSDK.observe(key, () => {
        log('state change', key, webrtcSDK[key])
        settingFunc(webrtcSDK[key])
      })
    } catch (e) {
      console.error('observe failed', e)
    }
  }

  useEffect(() => {
    webrtcSDK.initialize().then(
      () => {
        log('initialized')
        setBjnIsInitialized(true)

        webrtcSDK.observe('connectionState', () => {
          log('connectionState', webrtcSDK.connectionState)
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
        // observe('selfVideoPreviewEnabled', setBjnSelfVideoPreviewEnabled)

        log('loggingMode', webrtcSDK.loggingMode)

        // throws an exception
        // observe('isScreenShareSupported', setBjnIsScreenShareSupported)
        // observe('isSpeakerSelectionAllowed', setBjnIsSpeakerSelectionAllowed)
      },
      (error) => {
        log('error bluejeans initialize', error)
        setBjnCamInUseError(error.code)
      },
    )
  }, [])

  const bjnWebcamLayouts = ['FILMSTRIP', 'GALLERY', 'PEOPLE', 'SPEAKER']

  return {
    // webrtcSDK,
    bjnApi,
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
    bjnWebcamLayouts,
    bjnCamInUseError,

    // bjnSelfVideoPreviewEnabled,
    // bjnIsScreenShareSupported,
    // bjnIsSpeakerSelectionAllowed,
  }
}
