import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

function TimeAgo({ timeStamp }) {
  let timeAgo = ''

  if (timeStamp) {
    const date = parseISO(timeStamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `<${timePeriod} Ago>`
  }

  return (
    <span title={timeStamp}>
      &nbsp; <i className="text text-muted">{timeAgo}</i>
    </span>
  )
}

export default TimeAgo
