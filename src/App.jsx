import { useState, useEffect } from 'react'
import ChannelForm from './components/ChannelForm'
import TwitchChat from './components/TwitchChat'
import './App.css'

function App() {
  const [channelName, setChannelName] = useState('')
  const [isTransparent, setIsTransparent] = useState(false)
  const [opacity, setOpacity] = useState(0.8)

  const handleChannelSubmit = (channel) => {
    setChannelName(channel)
  }

  const handleGenerateUrl = () => {
    const url = `${window.location.origin}/chat/${channelName}?transparent=${isTransparent}&opacity=${opacity}`
    window.open(url, '_blank')
  }

  const toggleTransparency = () => {
    setIsTransparent(!isTransparent)
  }

  const handleOpacityChange = (e) => {
    setOpacity(e.target.value)
  }

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--chat-background-opacity', opacity)
  }, [opacity])

  return (
    <div className="app">
      {!channelName ? (
        <ChannelForm onSubmit={handleChannelSubmit} />
      ) : (
        <>
          <TwitchChat channelName={channelName} isTransparent={isTransparent} opacity={opacity} />
          <div className="controls">
            <button onClick={handleGenerateUrl} className="generate-url-button">
              Generate URL for OBS
            </button>
            <div className="transparency-toggle">
              <input
                type="checkbox"
                id="transparencyToggle"
                checked={isTransparent}
                onChange={toggleTransparency}
              />
              <label htmlFor="transparencyToggle">Fully Transparent Background</label>
            </div>
            {!isTransparent && (
              <div className="transparency-slider">
                <label htmlFor="opacitySlider">Background Opacity: {opacity}</label>
                <input
                  type="range"
                  id="opacitySlider"
                  min="0"
                  max="1"
                  step="0.1"
                  value={opacity}
                  onChange={handleOpacityChange}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App

