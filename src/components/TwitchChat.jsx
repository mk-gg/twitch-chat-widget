import React, { useState, useEffect, useRef } from 'react';
import tmi from "tmi.js";
import { parseBadges, parseEmotes } from "emotettv";

function TwitchChat({ channelName, isTransparent, opacity, borderRadius, backgroundColor }) {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [options, setOptions] = useState({ channelId: null });
  const chatContainerRef = useRef(null);

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
        const messageHTML = message.toHTML().replace(/<img/g, '<img class="inline-block align-top"');
        const botFilter = ['nightbot', 'fossabot', 'streamelements', 'moobot', 'streamlabs', 'phantombot'];

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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const chatStyle = {
    backgroundColor: isTransparent ? 'transparent' : `${backgroundColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
    ...(isTransparent ? {} : { borderRadius: `${borderRadius}px` }),
  };

  return (
    <div 
      ref={chatContainerRef}
      className="twitch-chat h-96 overflow-y-auto scrollbar-hide p-4" 
      style={chatStyle}
    >
      {messages.map((msg, index) => (
        <div key={index} className="chat-message mb-2 text-white text-shadow">
          <span 
            className="inline-block align-top mr-1"
            dangerouslySetInnerHTML={{ __html: msg.badges }} 
          />
          <b className="inline-block align-middle" style={{ color: msg.color }}>{msg.username}</b>
          <span className="align-middle ml-0.5 mr-2">:</span> 
          <span className="align-middle" dangerouslySetInnerHTML={{ __html: msg.message }} />
        </div>
      ))}
    </div>
  );
}

export default TwitchChat;

