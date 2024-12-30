import React, { useState, useEffect } from 'react';
import tmi from "tmi.js";
import { parseBadges, parseEmotes } from "emotettv";

function TwitchChat({ channelName }) {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [options, setOptions] = useState({ channelId: null });

  const fetchChannelId = async (channelName) => {
    try {
      const response = await fetch(`https://unttv.vercel.app/streams/${channelName}`);
      const data = await response.json();

      // Assuming data.userId contains the channel ID
      const channelId = data.userId; // Store the userId in channelId variable

      return channelId; // Return the channelId for use outside the function
    } catch (error) {
      console.error('Error fetching channel ID:', error);
      return null; // Return null or handle the error as needed
    }
  };

  useEffect(() => {
    const getChannelId = async () => {
      const id = await fetchChannelId(channelName);
      setOptions({ channelId: id }); // Set the options with the fetched channelId
    };

    getChannelId(); // Call the function to fetch channelId
  }, [channelName]);

  useEffect(() => {
    // Create TMI client
    const client = new tmi.Client({
      channels: [channelName]
    });

    // Connect to Twitch chat
    client.connect();

    // Message event handler
    const handleMessage = async (channel, tags, text, self) => {
      try {
        const badges = await parseBadges(tags.badges, tags.username, options);
        const badgesHTML = badges.toHTML();
        
        const message = await parseEmotes(text, tags.emotes, options);
        const messageHTML = message.toHTML();
        const botFilter = ['nightbot'];

        if (botFilter.includes(tags.username)) {
          return;
        }

        const newMessage = {
          badges: badgesHTML,
          username: tags.username,
          color: tags.color,
          message: messageHTML
        };

        setMessages(prevMessages => [...prevMessages.slice(-19), newMessage]);
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    // Add event listener
    client.on('message', handleMessage);

    // Store client in state
    setClient(client);

    // Cleanup function
    return () => {
      client.removeListener('message', handleMessage);
      client.disconnect();
    };
  }, [channelName, options]); // Add options to dependencies if needed

  return (
    <div className="twitch-chat">
      {messages.map((msg, index) => (
        <div key={index} className="chat-message">
          <span dangerouslySetInnerHTML={{ __html: msg.badges }} />
          <b style={{ color: msg.color }}>{msg.username}</b>:  
          <span dangerouslySetInnerHTML={{ __html: msg.message }} />
        </div>
      ))}
      {options.channelId && <div>Channel ID: {options.channelId}</div>} {/* Print the channelId */}
    </div>
  );
}

export default TwitchChat;