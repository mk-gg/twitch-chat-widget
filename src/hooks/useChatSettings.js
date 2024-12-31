import { useState } from 'react';

export function useChatSettings() {
  const [isTransparent, setIsTransparent] = useState(false);
  const [opacity, setOpacity] = useState(0.8);
  const [borderRadius, setBorderRadius] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  const toggleTransparency = () => setIsTransparent(!isTransparent);
  const handleOpacityChange = (e) => setOpacity(e.target.value);
  const handleBorderRadiusChange = (e) => setBorderRadius(e.target.value);
  const handleColorChange = (e) => setBackgroundColor(e.target.value);

  return {
    isTransparent,
    opacity,
    borderRadius,
    backgroundColor,
    toggleTransparency,
    handleOpacityChange,
    handleBorderRadiusChange,
    handleColorChange,
  };
}

