import { useState } from 'react';

export function useChatSettings() {
  const [isTransparent, setIsTransparent] = useState(false);
  const [opacity, setOpacity] = useState(0.8);
  const [borderRadius, setBorderRadius] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  const toggleTransparency = () => setIsTransparent(prev => !prev);
  const handleOpacityChange = (e) => setOpacity(parseFloat(e.target.value));
  const handleBorderRadiusChange = (e) => setBorderRadius(parseInt(e.target.value));
  const handleColorChange = (color) => {
    // Check if the color is a valid hex color
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      setBackgroundColor(color);
    }
  };

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

