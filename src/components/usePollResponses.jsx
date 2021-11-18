import { useEffect, useState } from 'react'

export const usePollResponses = (poll) => {
  const [responseCounts, setResponseCounts] = useState({})

  useEffect(() => {
    if (poll) {
      const counts = poll.responses.items.reduce((acc, response) => {
        const resps = response.response
        resps.forEach((resp) => {
          if (acc[resp] === undefined) {
            acc[resp] = 0
          }
          acc[resp] += 1
        })
        return acc
      }, {})
      setResponseCounts(counts)
    }
  }, [poll])

  return responseCounts
}
