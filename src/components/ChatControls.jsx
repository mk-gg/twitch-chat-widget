import React from 'react';
import { HexColorPicker } from 'react-colorful';

function ChatControls({ 
  isTransparent, 
  opacity, 
  borderRadius, 
  backgroundColor,
  onGenerateUrl,
  toggleTransparency,
  handleOpacityChange,
  handleBorderRadiusChange,
  handleColorChange
}) {
  return (
    <div className="controls space-y-4 mt-4">
      <button onClick={onGenerateUrl} className="generate-url-button w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        Generate URL for OBS
      </button>
      <div className="transparency-toggle flex items-center">
        <input
          type="checkbox"
          id="transparencyToggle"
          checked={isTransparent}
          onChange={toggleTransparency}
          className="mr-2"
        />
        <label htmlFor="transparencyToggle">Fully Transparent Background</label>
      </div>
      {!isTransparent && (
        <>
          <div className="opacity-slider">
            <label htmlFor="opacitySlider" className="block mb-1">Background Opacity: {opacity.toFixed(2)}</label>
            <input
              type="range"
              id="opacitySlider"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={handleOpacityChange}
              className="w-full"
            />
          </div>
          <div className="color-picker">
            <label className="block mb-1">Background Color:</label>
            <HexColorPicker color={backgroundColor} onChange={handleColorChange} />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="mt-2 w-full px-2 py-1 border border-gray-300 rounded text-black"
            />
          </div>
          <div className="border-radius-slider">
            <label htmlFor="borderRadiusSlider" className="block mb-1">Rounded Corners: {borderRadius}px</label>
            <input
              type="range"
              id="borderRadiusSlider"
              min="0"
              max="20"
              step="1"
              value={borderRadius}
              onChange={handleBorderRadiusChange}
              className="w-full"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatControls;

