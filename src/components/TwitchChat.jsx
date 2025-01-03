import React, { useState, useEffect, useRef, useCallback } from 'react';
import tmi from "tmi.js";
import { parseBadges, parseEmotes } from "emotettv";

function TwitchChat({ 
  channelName, 
  isTransparent, 
  opacity, 
  borderRadius, 
  backgroundColor, 
  smoothTransition,
  botFilterEnabled,
  showBadges
}) {
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState({ channelId: null });
  const chatContainerRef = useRef(null);
  const messageCounter = useRef(0);
  const clientRef = useRef(null);

  const fetchChannelId = useCallback(async (channelName) => {
    try {
      const response = await fetch(`https://unttv.vercel.app/streams/${channelName}`);
      const data = await response.json();
      return data.userId;
    } catch (error) {
      console.error('Error fetching channel ID:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const getChannelId = async () => {
      const id = await fetchChannelId(channelName);
      setOptions({ channelId: id });
    };

    getChannelId();
  }, [channelName, fetchChannelId]);

  const handleMessage = useCallback(async (channel, tags, text, self) => {
    try {
      let badgesHTML = '';
      if (showBadges) {
        const badges = await parseBadges(tags.badges, tags.username, options);
        badgesHTML = badges.toHTML();
      }
      
      const message = await parseEmotes(text, tags.emotes, options);
      const messageHTML = message.toHTML().replace(/<img/g, '<img class="inline-block align-top"');
      const botFilter = ['nightbot'];

      if (botFilterEnabled && botFilter.includes(tags.username)) {
        return;
      }

      const newMessage = {
        id: messageCounter.current++,
        badges: badgesHTML,
        username: tags.username,
        color: tags.color,
        message: messageHTML
      };

      setMessages(prevMessages => [...prevMessages.slice(-19), newMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
    }
  }, [options, botFilterEnabled, showBadges]);

  useEffect(() => {
    clientRef.current = new tmi.Client({
      channels: [channelName]
    });

    clientRef.current.connect();
    clientRef.current.on('message', handleMessage);

    return () => {
      clientRef.current.removeListener('message', handleMessage);
      clientRef.current.disconnect();
    };
  }, [channelName, handleMessage]);

  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollToBottom = () => {
        const scrollHeight = chatContainerRef.current.scrollHeight;
        const height = chatContainerRef.current.clientHeight;
        const maxScrollTop = scrollHeight - height;
        chatContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      };

      if (smoothTransition) {
        chatContainerRef.current.style.scrollBehavior = 'smooth';
      } else {
        chatContainerRef.current.style.scrollBehavior = 'auto';
      }

      scrollToBottom();

      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.style.scrollBehavior = 'auto';
        }
      }, 300);
    }
  }, [messages, smoothTransition]);

  const chatStyle = {
    backgroundColor: isTransparent ? 'transparent' : `${backgroundColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
    ...(isTransparent ? {} : { borderRadius: `${borderRadius}px` }),
  };

  return (
    <div 
      ref={chatContainerRef}
      className={`twitch-chat h-96 overflow-y-auto scrollbar-hide p-4 ${smoothTransition ? 'smooth-scroll' : ''}`} 
      style={chatStyle}
    >
      {messages.map((msg) => (
        <div 
          key={msg.id}
          className={`chat-message mb-2 text-white text-shadow ${smoothTransition ? 'animate-fade-in' : ''}`}
        >
          {showBadges && (
            <span 
              className="inline-block align-top mr-1"
              dangerouslySetInnerHTML={{ __html: msg.badges }} 
            />
          )}
          <b className="inline-block align-middle" style={{ color: msg.color }}>{msg.username}</b>
          <span className="align-middle mr-1">:</span> 
          <span className="align-middle" dangerouslySetInnerHTML={{ __html: msg.message }} />
        </div>
      ))}
    </div>
  );
}

export default TwitchChat;

