import React, { useState, useEffect } from 'react';
import tmi from "tmi.js";
import { parseBadges, parseEmotes } from "emotettv";

function TwitchChat({ channelName, isTransparent, opacity }) {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [options, setOptions] = useState({ channelId: null });

  const fetchChannelId = async (channelName) => {
    try {
      const response = await fetch(`https://unttv.vercel.app/streams/${channelName}`);
      const data = await response.json();
      const channelId = data.userId;
      return channelId;
    } catch (error) {
      console.error('Error fetching channel ID:', error);
      return null;
    }
  };

  useEffect(() => {
    const getChannelId = async () => {
      const id = await fetchChannelId(channelName);
      setOptions({ channelId: id });
    };

    getChannelId();
  }, [channelName]);

  useEffect(() => {
    const client = new tmi.Client({
      channels: [channelName]
    });

    client.connect();

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

    client.on('message', handleMessage);
    setClient(client);

    return () => {
      client.removeListener('message', handleMessage);
      client.disconnect();
    };
  }, [channelName, options]);

  return (
    <div 
      className={`twitch-chat ${isTransparent ? 'transparent' : ''}`}
      style={!isTransparent ? { backgroundColor: `rgba(0, 0, 0, ${opacity})` } : {}}
    >
      {messages.map((msg, index) => (
        <div key={index} className="chat-message">
          <span dangerouslySetInnerHTML={{ __html: msg.badges }} />
          <b style={{ color: msg.color }}>{msg.username}</b>:  
          <span dangerouslySetInnerHTML={{ __html: msg.message }} />
        </div>
      ))}
    </div>
  );
}

export default TwitchChat;

