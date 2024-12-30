import { useState } from 'react'
import ChannelForm from './components/ChannelForm'
import TwitchChat from './components/TwitchChat'
import './App.css'

function App() {
  const [channelName, setChannelName] = useState('')

  const handleChannelSubmit = (channel) => {
    setChannelName(channel)
  }

  const handleGenerateUrl = () => {
    const url = `${window.location.origin}/chat/${channelName}`
    window.open(url, '_blank')
  }

  return (
    <div className="app">
      {!channelName ? (
        <ChannelForm onSubmit={handleChannelSubmit} />
      ) : (
        <>
          <TwitchChat channelName={channelName} />
          <button onClick={handleGenerateUrl} className="generate-url-button">
            Generate URL for OBS
          </button>
        </>
      )}
    </div>
  )
}

export default App

