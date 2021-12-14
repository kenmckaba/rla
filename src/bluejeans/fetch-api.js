let userId
let userAccessToken
let meetingAccessToken
// let refreshToken
// let meetingInfo
// let meetingSettings

export const getBjnUserToken = async () => {
  if (!userId) {
    try {
      const result = await fetch('https://api.bluejeans.com/oauth2/token#User', {
        method: 'POST',
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'password',
          username: 'ken.mckaba',
          password: 'Secret1!',
        }),
      })
      const r2 = await result.json()
      console.log(r2)
      userAccessToken = r2.access_token
      // refreshToken = r2.refresh_token
      userId = r2.scope.user
    } catch (error) {
      console.error('Can\'t authenticate', error)
    }
  }
}

export const getBjnMeetingToken = async (meetingId, passcode) => {
  if (!meetingAccessToken) {
    try {
      const result = await fetch('https://api.bluejeans.com/oauth2/token#Meeting', {
        method: 'POST',
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'meeting_passcode',
          meetingNumericId: meetingId,
          meetingPasscode: passcode,
        }),
      })
      const r2 = await result.json()
      console.log(r2)
      meetingAccessToken = r2.access_token
      // refreshToken = r2.refresh_token
    } catch (error) {
      console.error('Can\'t authenticate', error)
    }
  }
}

export const createMeeting = async (title, description, start, end, timezone) => {
  await getBjnUserToken()

  const result = await fetch(
    `https://api.bluejeans.com/v1/user/${userId}/scheduled_meeting?personal_meeting=false&email=false`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userAccessToken}`,
      },
      body: JSON.stringify({
        title,
        description,
        start,
        end,
        timezone,
        endPointType: 'WEB_APP',
        endPointVersion: '2.10',
        attendees: [],
        isLargeMeeting: false,
      }),
    },
  )
  const r2 = await result.json()
  console.log(r2)
  // meetingInfo = r2
  return r2
}

export const getBjnParticipants = async (meetingId) => {
  await getBjnUserToken()

  const result = await fetch(
    `https://api.bluejeans.com/v1/user/${userId}/live_meetings/${meetingId}/endpoints`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userAccessToken}`,
      },
    },
  )
  const r2 = await result.json()
  console.log(r2)
  // meetingSettings = r2
  return r2
}

export const muteBjnParticipant = async (meetingId, passcode, audio, mute, endpointGuid) => {
  await getBjnMeetingToken(meetingId, passcode)

  const deviceParam = audio ? 'muteAudio' : 'muteVideo'
  const muteParam = mute ? 'true' : 'false'

  await fetch(
    `https://api.bluejeans.com/v1/user/${userId}/live_meetings/${meetingId}/endpoints/${encodeURIComponent(
      endpointGuid,
    )}?${deviceParam}=${muteParam}`,
    {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${meetingAccessToken}`,
      },
    },
  )
}

export const getMeetingSettings = async () => {
  const result = await fetch(`https://api.bluejeans.com/v1/user/${userId}/room`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userAccessToken}`,
    },
  })
  const r2 = await result.json()
  console.log(r2)
  // meetingSettings = r2
  return r2
}
