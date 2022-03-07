import { useState, useEffect } from 'react'
import { BJNWebClientSDK, LoggingMode, VideoLayout } from '@bluejeans/web-client-sdk'
import { singletonHook } from 'react-singleton-hook'

export const bjnLog = (...args) => {
  console.log.call(null, new Date().toISOString().substr(11, 12), 'rla-log:', ...args)
}

export const bjnWebcamLayouts = VideoLayout // GALLERY, etc.

const webrtcSDK = new BJNWebClientSDK({
  saveLogsToLocalStorage: true,
})

webrtcSDK.loggingService.setLoggingMode(LoggingMode.DEBUG)

export const bjnApi = {
  join: function (meetingId, passcode, name) {
    bjnLog('call join', meetingId, passcode, name)
    return webrtcSDK.meetingService.joinMeeting(meetingId, passcode, name)
  },
  setName: function (name) {
    bjnLog('call setName', name)
    return webrtcSDK.meetingService.setName(name)
  },
  attachLocalVideo: function (ref) {
    bjnLog('call attachLocalVideo', ref)
    return webrtcSDK.meetingService.attachLocalVideo(ref)
  },
  attachRemoteVideo: function (ref) {
    bjnLog('call attachRemoteVideo', ref)
    return webrtcSDK.meetingService.attachRemoteVideo(ref)
  },
  attachRemoteContent: function (ref) {
    bjnLog('call attachRemoteContent', ref)
    return webrtcSDK.meetingService.attachRemoteContent(ref)
  },
  endMeeting: function () {
    bjnLog('call endMeeting')
    return webrtcSDK.meetingService.endMeeting(true)
  },
  leave: function () {
    bjnLog('call leave')
    return webrtcSDK.meetingService.endMeeting(false)
  },
  setVideoMuted: function (val) {
    bjnLog('call setVideoMuted', val)
    return webrtcSDK.meetingService.setVideoMuted(val)
  },
  setAudioMuted: function (val) {
    bjnLog('call setAudioMuted', val)
    return webrtcSDK.meetingService.setAudioMuted(val)
  },
  startScreenShare: function () {
    bjnLog('call startScreenShare')
    return webrtcSDK.meetingService.contentService.startContentShare()
  },
  stopScreenShare: function () {
    bjnLog('call stopScreenShare')
    return webrtcSDK.meetingService.contentService.stopContentShare()
  },
  selectCamera: function (val) {
    bjnLog('call selectCamera', val)
    return webrtcSDK.videoDeviceService.selectCamera(val)
  },
  selectMicrophone: function (val) {
    bjnLog('call selectMicrophone', val)
    return webrtcSDK.audioDeviceService.selectMicrophone(val)
  },
  selectSpeaker: function (val) {
    bjnLog('call selectSpeaker', val)
    return webrtcSDK.audioDeviceService.selectSpeaker(val)
  },
  setVideoLayout: function (val) {
    bjnLog('call setVideoLayout', val)
    return webrtcSDK.meetingService.setVideoLayout(val)
  },
  requestAllPermissions: () => {
    bjnLog('call requestAllPermissions')
    return webrtcSDK.permissionService.requestAllPermissions().then(
      (result) => console.log('requestAllPermissions result', result),
      (err) => console.log('requestAllPermissions failed', err),
    )
  },
  sendLogs: () => {
    webrtcSDK.loggingService.uploadLog('From RLA app', 'kenneth.mckaba@verizon.com')
  },
}

const useBlueJeansImpl = () => {
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
    bjnLog('state initial', key, initial)
    settingFunc(initial)
    try {
      service.observe(key, () => {
        bjnLog('state change', key, service[key])
        settingFunc(service[key])
      })
    } catch (e) {
      console.error('observe failed', e)
    }
  }

  useEffect(() => {
    bjnLog('initializing', bjnIsInitialized)
    if (!bjnIsInitialized) {
      bjnLog('initialized', bjnIsInitialized)
      setBjnIsInitialized(true)

      webrtcSDK.meetingService.observe('connectionState', () => {
        bjnLog('connectionState', webrtcSDK.meetingService.connectionState)
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
        bjnLog('contentShareState', webrtcSDK.meetingService.contentService.contentShareState)
        setBjnSharingScreen(webrtcSDK.meetingService.contentService.contentShareState === 'started')
      })
    }
  }, [bjnIsInitialized])

  return {
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
    bjnSelfVideoPreviewEnabled,
    bjnIsScreenShareSupported,
    bjnIsSpeakerSelectionAllowed,
  }
}

export const useBlueJeans = singletonHook(true, useBlueJeansImpl)
