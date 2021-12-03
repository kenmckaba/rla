import { useState, useEffect } from 'react'
import { BJNWebClientSDK } from '@bluejeans/web-client-sdk'

const log = (...args) => {
  console.log.call(null, new Date().toISOString().substr(11, 12), 'rla-log:', ...args)
}

const webrtcSDK = new BJNWebClientSDK()

webrtcSDK.loggingService.setLoggingMode('DEBUG')

const bjnApi = {
  join: function (meetingId, passcode, name) {
    log('call join', meetingId, passcode, name)
    return webrtcSDK.meetingService.joinMeeting(meetingId, passcode, name)
  },
  setName: function (name) {
    log('call setName', name)
    return webrtcSDK.meetingService.setName(name)
  },
  attachLocalVideo: function (ref) {
    log('call attachLocalVideo', ref)
    return webrtcSDK.meetingService.attachLocalVideo(ref)
  },
  attachRemoteVideo: function (ref) {
    log('call attachRemoteVideo', ref)
    return webrtcSDK.meetingService.attachRemoteVideo(ref)
  },
  attachRemoteContent: function (ref) {
    log('call attachRemoteContent', ref)
    return webrtcSDK.meetingService.attachRemoteContent(ref)
  },
  endMeeting: function () {
    log('call endMeeting')
    return webrtcSDK.meetingService.endMeeting(true)
  },
  leave: function () {
    log('call leave')
    return webrtcSDK.meetingService.endMeeting(false)
  },
  setVideoMuted: function (val) {
    log('call setVideoMuted', val)
    return webrtcSDK.meetingService.setVideoMuted(val)
  },
  setAudioMuted: function (val) {
    log('call setAudioMuted', val)
    return webrtcSDK.meetingService.setAudioMuted(val)
  },
  startScreenShare: function () {
    log('call startScreenShare')
    return webrtcSDK.meetingService.contentService.startContentShare()
  },
  stopScreenShare: function () {
    log('call stopScreenShare')
    return webrtcSDK.meetingService.contentService.stopContentShare()
  },
  selectCamera: function (val) {
    log('call selectCamera', val)
    return webrtcSDK.videoDeviceService.selectCamera(val)
  },
  selectMicrophone: function (val) {
    log('call selectMicrophone', val)
    return webrtcSDK.audioDeviceService.selectMicrophone(val)
  },
  selectSpeaker: function (val) {
    log('call selectSpeaker', val)
    return webrtcSDK.audioDeviceService.selectSpeaker(val)
  },
  setVideoLayout: function (val) {
    log('call setVideoLayout', val)
    return webrtcSDK.meetingService.setVideoLayout(val)
  },
  requestAllPermissions: () => {
    log('call requestAllPermissions')
    return webrtcSDK.permissionService.requestAllPermissions().then(
      (result) => console.log('requestAllPermissions result', result),
      (err) => console.log('requestAllPermissions failed', err),
    )
  },
}

export const useBlueJeans = () => {
  const [bjnConnectionState, setBjnConnectionState] = useState()
  const [bjnIsConnected, setBjnIsConnected] = useState(false)
  const [bjnIsInitialized, setBjnIsInitialized] = useState(false)
  const [bjnParticipants, setBjnParticipants] = useState([])
  const [bjnAvailableCameras, setBjnAvailableCameras] = useState()
  const [bjnIsScreenShareSupported, setBjnIsScreenShareSupported] = useState()
  const [bjnAudioMuted, setBjnAudioMuted] = useState()
  const [bjnAvailableMicrophones, setBjnAvailableMicrophones] = useState()
  const [bjnMeetingHasEnded /*, setBjnMeetingHasEnded */] = useState(false)
  const [bjnReceivingScreenShare, setBjnReceivingScreenShare] = useState()
  const [bjnSelectedCamera, setBjnSelectedCamera] = useState()
  const [bjnSelectedMicrophone, setBjnSelectedMicrophone] = useState()
  const [bjnSelectedSpeaker, setBjnSelectedSpeaker] = useState()
  const [bjnSelfParticipant, setBjnSelfParticipant] = useState()
  const [bjnSharingScreen, setBjnSharingScreen] = useState()
  const [bjnVideoLayout, setBjnVideoLayout] = useState()
  const [bjnVideoMuted, setBjnVideoMuted] = useState(true)
  const [bjnVideoState, setBjnVideoState] = useState()
  const [bjnAvailableSpeakers, setBjnAvailableSpeakers] = useState()
  const [bjnSelfVideoPreviewEnabled, setBjnSelfVideoPreviewEnabled] = useState()
  const [bjnIsSpeakerSelectionAllowed, setBjnIsSpeakerSelectionAllowed] = useState()

  const observe = (service, key, settingFunc) => {
    const initial = service[key]
    log('state initial', key, initial)
    settingFunc(initial)
    try {
      service.observe(key, () => {
        log('state change', key, service[key])
        settingFunc(service[key])
      })
    } catch (e) {
      console.error('observe failed', e)
    }
  }

  useEffect(() => {
    log('initializing', bjnIsInitialized)
    if (!bjnIsInitialized) {
      log('initialized', bjnIsInitialized)
      setBjnIsInitialized(true)

      webrtcSDK.meetingService.observe('connectionState', () => {
        log('connectionState', webrtcSDK.meetingService.connectionState)
        setBjnConnectionState(webrtcSDK.meetingService.connectionState)
        setBjnIsConnected(webrtcSDK.meetingService.connectionState === 'CONNECTED')
      })

      observe(webrtcSDK.meetingService.participantService, 'participants', setBjnParticipants)
      observe(webrtcSDK.meetingService.participantService, 'selfParticipant', setBjnSelfParticipant)
      observe(webrtcSDK.audioDeviceService, 'availableMicrophones', setBjnAvailableMicrophones)
      observe(webrtcSDK.audioDeviceService, 'selectedMicrophone', setBjnSelectedMicrophone)
      observe(webrtcSDK.audioDeviceService, 'selectedSpeaker', setBjnSelectedSpeaker)
      observe(webrtcSDK.audioDeviceService, 'availableSpeakers', setBjnAvailableSpeakers)
      observe(
        webrtcSDK.audioDeviceService,
        'isSpeakerSelectionAllowed',
        setBjnIsSpeakerSelectionAllowed,
      )
      observe(webrtcSDK.videoDeviceService, 'availableCameras', setBjnAvailableCameras)
      observe(webrtcSDK.videoDeviceService, 'selectedCamera', setBjnSelectedCamera)
      observe(webrtcSDK.meetingService, 'audioMuted', setBjnAudioMuted)
      observe(webrtcSDK.meetingService, 'videoLayout', setBjnVideoLayout)
      observe(webrtcSDK.meetingService, 'videoMuted', setBjnVideoMuted)
      observe(webrtcSDK.meetingService, 'videoState', setBjnVideoState)
      observe(webrtcSDK.meetingService, 'selfVideoPreviewEnabled', setBjnSelfVideoPreviewEnabled)
      // observe('meetingHasEnded', setBjnMeetingHasEnded)
      observe(
        webrtcSDK.meetingService.contentService,
        'receivingContentShare',
        setBjnReceivingScreenShare,
      )
      observe(
        webrtcSDK.meetingService.contentService,
        'isContentShareSupported',
        setBjnIsScreenShareSupported,
      )

      webrtcSDK.meetingService.contentService.observe('contentShareState', () => {
        log('contentShareState', webrtcSDK.meetingService.contentService.contentShareState)
        setBjnSharingScreen(webrtcSDK.meetingService.contentService.contentShareState === 'started')
      })
    }
  }, [bjnIsInitialized])

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
    bjnSelfVideoPreviewEnabled,
    bjnIsScreenShareSupported,
    bjnIsSpeakerSelectionAllowed,
  }
}
