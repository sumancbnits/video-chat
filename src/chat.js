import React, { useEffect, useRef, useState } from 'react';

const JitsiMeet = ({ roomName, displayName }) => {
  const jitsiContainerRef = useRef(null);
  const [api, setApi] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const domain = 'meet.ffmuc.net';
    // const domain = 'meet.jit.si';
    const options = {
      roomName: roomName,
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: displayName,
      },
      configOverwrite: {
        prejoinPageEnabled: false,
        startWithAudioMuted: false,
        startWithVideoMuted: false
      },
      interfaceConfigOverwrite: {
        // DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        // MOBILE_APP_PROMO: false,
      },
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);
    setApi(api);

    api.addEventListener('readyToClose', () => {
      // Handle actions when the meeting is closed
      
    });

    // Optional: Set up event listeners for the Jitsi Meet API
    api.addEventListener('videoConferenceJoined', () => {
      api.executeCommand('toggleVideo');
      api.executeCommand('toggleAudio');
    });

    api.addEventListener('participantJoined', (event) => {
      console.log('Participant joined:', event);
    });

    api.addEventListener('incomingMessage', (event) => {
      const { displayName, text } = event;
      setMessages((prevMessages) => [...prevMessages, { displayName, text }]);
    });

    return () => api.dispose();
  }, [roomName, displayName]);

  const sendMessage = () => {
    if (chatMessage.trim()) {
      api.executeCommand('sendEndpointTextMessage', '', chatMessage);
      setMessages((prevMessages) => [...prevMessages, { displayName: 'You', text: chatMessage }]);
      setChatMessage('');
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div ref={jitsiContainerRef} style={{ height: '80vh' }}></div>
      {/* <div style={{ padding: '10px', borderTop: '1px solid #ddd' }}>
        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
          {messages.map((msg, index) => (
            <div key={index}><strong>{msg.displayName}:</strong> {msg.text}</div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type a message"
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          style={{ width: '80%', marginRight: '10px' }}
        />
        <button onClick={sendMessage}>Send</button>
      </div> */}
    </div>
  );
  // return <div style={{ width: '100%', height: '100%' }} ref={jitsiContainerRef}></div>;
};

export default JitsiMeet;
