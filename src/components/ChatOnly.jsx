import { useParams, useLocation } from 'react-router-dom'
import TwitchChat from './TwitchChat'

function ChatOnly() {
  const { channelName } = useParams()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const isTransparent = searchParams.get('transparent') === 'true'
  const opacity = parseFloat(searchParams.get('opacity') || '0.8')
  const backgroundColor = `#${searchParams.get('backgroundColor') || '000000'}`
  const borderRadius = !isTransparent ? parseInt(searchParams.get('borderRadius') || '0') : 0
  const smoothTransition = searchParams.get('smoothTransition') === 'true'
  const botFilterEnabled = searchParams.get('botFilterEnabled') === 'true'
  const showBadges = searchParams.get('showBadges') === 'true'

  return (
    <div className="chat-only h-screen overflow-hidden">
      <TwitchChat 
        channelName={channelName} 
        isTransparent={isTransparent} 
        opacity={opacity}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        smoothTransition={smoothTransition}
        botFilterEnabled={botFilterEnabled}
        showBadges={showBadges}
      />
    </div>
  )
}

export default ChatOnly

