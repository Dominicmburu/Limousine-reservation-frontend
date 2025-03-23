import React, { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    if (document.querySelector('script[src*="tawk.to"]')) {
      return;
    }

    const tawkScript = document.createElement('script');
    tawkScript.src = 'https://embed.tawk.to/6744732e2480f5b4f5a394c6/1idhm3rh7/default';
    tawkScript.async = true;
    tawkScript.charset = 'UTF-8';
    tawkScript.setAttribute('crossorigin', '*');
    document.body.appendChild(tawkScript);

    return () => {
      tawkScript.remove();
    };
  }, []);

  return null;
};

export default ChatWidget;
