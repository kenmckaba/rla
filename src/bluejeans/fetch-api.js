let userId
let accessToken
// let refreshToken
// let meetingInfo
// let meetingSettings

export const authenticateBJN = async () => {
  const result = await fetch('https://api.bluejeans.com/oauth2/token#User', {
    method: 'POST',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ grant_type: 'password', username: 'ken.mckaba', password: 'Secret1!' }),
  })
  const r2 = await result.json()
  console.log(r2)
  accessToken = r2.access_token
  // refreshToken = r2.refresh_token
  userId = r2.scope.user
  return result
}

export const createMeeting = async (title, description, start, end, timezone) => {
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
        title: 'test',
        description: 'descr',
        start: 1628556300000,
        end: 1628559900000,
        timezone: 'US/Pacific',
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
