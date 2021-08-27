export const prettyTime = (dt) => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }
  return dt.toLocaleDateString(undefined, options)
}
