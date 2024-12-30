import { useState } from 'react'

function ChannelForm({ onSubmit }) {
  const [inputChannel, setInputChannel] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputChannel.trim()) {
      onSubmit(inputChannel.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="channel-form">
      <input
        type="text"
        value={inputChannel}
        onChange={(e) => setInputChannel(e.target.value)}
        placeholder="Enter Twitch channel name"
        className="channel-input"
      />
      <div className="input-button-gap"></div>
      <button type="submit" className="submit-button">
        Join Chat
      </button>
    </form>
  )
}

export default ChannelForm

