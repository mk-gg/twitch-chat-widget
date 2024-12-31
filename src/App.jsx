import { useState } from 'react'
import ChannelForm from './components/ChannelForm'
import TwitchChat from './components/TwitchChat'
import ChatControls from './components/ChatControls'
import { useChatSettings } from './hooks/useChatSettings'
import './App.css'

function App() {
  const [channelName, setChannelName] = useState('')
  const chatSettings = useChatSettings()

  const handleChannelSubmit = (channel) => {
    setChannelName(channel)
  }

  const handleGenerateUrl = () => {
    const params = new URLSearchParams({
      transparent: chatSettings.isTransparent,
      opacity: chatSettings.opacity,
      backgroundColor: chatSettings.backgroundColor.slice(1)
    })
    if (!chatSettings.isTransparent) {
      params.append('borderRadius', chatSettings.borderRadius)
    }
    const url = `${window.location.origin}/chat/${channelName}?${params.toString()}`
    window.open(url, '_blank')
  }

  return (
    <div className="app min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Twitch Chat Overlay</h1>
        {!channelName ? (
          <ChannelForm onSubmit={handleChannelSubmit} />
        ) : (
          <>
            <TwitchChat 
              channelName={channelName} 
              {...chatSettings}
            />
            <ChatControls 
              {...chatSettings}
              onGenerateUrl={handleGenerateUrl}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App

