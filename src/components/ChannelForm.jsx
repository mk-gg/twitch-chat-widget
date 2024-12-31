import React, { useState } from 'react'

function ChannelForm({ onSubmit }) {
  const [inputChannel, setInputChannel] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputChannel.trim()) {
      onSubmit(inputChannel.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="channel-form bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Enter Twitch Channel</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={inputChannel}
          onChange={(e) => setInputChannel(e.target.value)}
          placeholder="Enter Twitch channel name"
          className="channel-input flex-grow px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button 
          type="submit" 
          className="submit-button px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        >
          Join Chat
        </button>
      </div>
    </form>
  )
}

export default ChannelForm

