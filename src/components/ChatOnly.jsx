import { useParams, useLocation } from 'react-router-dom'
import TwitchChat from './TwitchChat'

function ChatOnly() {
  const { channelName } = useParams()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const isTransparent = searchParams.get('transparent') === 'true'
  const opacity = parseFloat(searchParams.get('opacity') || '0.8')

  return (
    <div className={`chat-only ${isTransparent ? 'transparent' : ''}`}>
      <TwitchChat channelName={channelName} isTransparent={isTransparent} opacity={opacity} />
    </div>
  )
}

export default ChatOnly

