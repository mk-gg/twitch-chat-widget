import { useState } from 'react';

export function useChatSettings() {
  const [isTransparent, setIsTransparent] = useState(false);
  const [opacity, setOpacity] = useState(0.8);
  const [borderRadius, setBorderRadius] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [smoothTransition, setSmoothTransition] = useState(false);
  const [botFilterEnabled, setBotFilterEnabled] = useState(true);
  const [showBadges, setShowBadges] = useState(true);

  const toggleTransparency = () => setIsTransparent(prev => !prev);
  const handleOpacityChange = (e) => setOpacity(parseFloat(e.target.value));
  const handleBorderRadiusChange = (e) => setBorderRadius(parseInt(e.target.value));
  const handleColorChange = (color) => {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      setBackgroundColor(color);
    }
  };
  const toggleSmoothTransition = () => setSmoothTransition(prev => !prev);
  const toggleBotFilter = () => setBotFilterEnabled(prev => !prev);
  const toggleShowBadges = () => setShowBadges(prev => !prev);

  return {
    isTransparent,
    opacity,
    borderRadius,
    backgroundColor,
    smoothTransition,
    botFilterEnabled,
    showBadges,
    toggleTransparency,
    handleOpacityChange,
    handleBorderRadiusChange,
    handleColorChange,
    toggleSmoothTransition,
    toggleBotFilter,
    toggleShowBadges,
  };
}

