let userId
let accessToken
// let refreshToken
// let meetingInfo
// let meetingSettings

export const authenticateBJN = async () => {
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
      accessToken = r2.access_token
      // refreshToken = r2.refresh_token
      userId = r2.scope.user
    } catch (error) {
      console.error('Can\'t authenticate', error)
    }
  }
}

export const createMeeting = async (title, description, start, end, timezone) => {
  await authenticateBJN()

  const result = await fetch(
    `https://api.bluejeans.com/v1/user/${userId}/scheduled_meeting?personal_meeting=false&email=false`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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

export const getParticipants = async (meetingId) => {
  await authenticateBJN()

  const result = await fetch(
    `https://api.bluejeans.com/v1/user/${userId}/live_meetings/${meetingId}/endpoints`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  const r2 = await result.json()
  console.log(r2)
  // meetingSettings = r2
  return r2
}

export const getMeetingSettings = async () => {
  const result = await fetch(`https://api.bluejeans.com/v1/user/${userId}/room`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const r2 = await result.json()
  console.log(r2)
  // meetingSettings = r2
  return r2
}
