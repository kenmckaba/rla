import { API } from 'aws-amplify'

export const webcamCapture = async (video, attendeeId) => {
  const canvas = document.createElement('canvas')
  canvas.width = video.clientWidth
  canvas.height = video.clientHeight
  const context = canvas.getContext('2d')
  context.imageSmoothingEnabled = true
  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  const data = canvas.toDataURL('image/jpg')
  const image = data.split(',')[1]
  const sourceImage = encodeURIComponent(image)

  try {
    console.log('face image post', attendeeId)
    const result = await API.post('rlaapi', '/image', { body: { attendeeId, image: sourceImage } })
    console.log('face image result', result)
    return result
  } catch (err) {
    console.error('face image error', err)
    return null
  }
}
