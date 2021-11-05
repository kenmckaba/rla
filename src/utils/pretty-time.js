export const timestampToPrettyTime = (dt) => prettyTime(new Date(dt))
export const prettyTime = (dt) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }
  return dt.toLocaleDateString(undefined, options)
}
