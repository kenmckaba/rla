export const trainingCsv = (training) => {
  const rows = []

  rows.push(['Title', training.title])
  rows.push(['Description', training.description])
  rows.push(['Trainer name', training.trainerName])
  rows.push(['Trainer email', training.trainerEmail])
  rows.push(['Started', dateTimeOutput(training.startedAt)])
  rows.push(['Ended', dateTimeOutput(training.endedAt)])
  rows.push(['Duration', duration(training.startedAt, training.endedAt)])
  rows.push(['Attendee', 'Email', 'Joined', 'Left', 'Duration'])

  training.attendees.items.forEach((attendee) => {
    rows.push([
      attendee.name,
      attendee.email,
      dateTimeOutput(attendee.joinedTime),
      dateTimeOutput(attendee.leftTime),
      duration(attendee.joinedTime, attendee.leftTime),
    ])
  })

  let csvContent =
    'data:text/csv;charset=utf-8,"' + rows.map((e) => e.join('","')).join('"\n"') + '"'

  var encodedUri = encodeURI(csvContent)
  window.open(encodedUri)
}

export const duration = (time1, time2) => {
  if (!time1 || !time2) {
    return '-'
  }
  const d1 = new Date(time1).getTime()
  const d2 = new Date(time2).getTime()
  let numSecs = (d2 - d1) / 1000
  const numToString = (num) => {
    return Math.floor(num).toString().padStart(2, 0)
  }
  const numHours = Math.floor(numSecs / (60 * 60))
  const hours = numToString(numHours)
  numSecs -= numHours * 60 * 60
  const numMins = Math.floor(numSecs / 60)
  const minutes = numToString(numMins)
  numSecs -= numMins * 60
  const seconds = numToString(Math.round(numSecs))
  return `${hours}:${minutes}:${seconds}`
}

export const dtTmStrings = (dtTm) => {
  const theDate = new Date(dtTm)
  const date = theDate.toLocaleDateString()
  const time = theDate.toLocaleTimeString()
  return { date, time }
}

export const dateTimeOutput = (dtTm) => {
  if (!dtTm) {
    return '-'
  }
  const { date, time } = dtTmStrings(dtTm)
  return `${date} ${time}`
}
export const timeOutput = (dtTm) => {
  if (!dtTm) {
    return '-'
  }
  const { time } = dtTmStrings(dtTm)
  return time
}
