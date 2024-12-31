import React from 'react';

function ChatControls({ 
  isTransparent, 
  opacity, 
  borderRadius, 
  backgroundColor,
  onGenerateUrl,
  onToggleTransparency,
  onOpacityChange,
  onBorderRadiusChange,
  onColorChange
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
          onChange={onToggleTransparency}
          className="mr-2"
        />
        <label htmlFor="transparencyToggle">Fully Transparent Background</label>
      </div>
      {!isTransparent && (
        <>
          <div className="opacity-slider">
            <label htmlFor="opacitySlider" className="block mb-1">Background Opacity: {opacity}</label>
            <input
              type="range"
              id="opacitySlider"
              min="0"
              max="1"
              step="0.1"
              value={opacity}
              onChange={onOpacityChange}
              className="w-full"
            />
          </div>
          <div className="color-picker">
            <label htmlFor="colorPicker" className="block mb-1">Background Color:</label>
            <input
              type="color"
              id="colorPicker"
              value={backgroundColor}
              onChange={onColorChange}
              className="w-full h-10 rounded"
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
              onChange={onBorderRadiusChange}
              className="w-full"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatControls;

