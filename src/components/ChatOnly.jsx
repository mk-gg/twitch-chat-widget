import { useParams } from 'react-router-dom'
import TwitchChat from './TwitchChat'

function ChatOnly() {
  const { channelName } = useParams()

  return (
    <div className="chat-only">
      <TwitchChat channelName={channelName} />
    </div>
  )
}

export default ChatOnly

