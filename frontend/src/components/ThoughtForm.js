/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const ThoughtForm = ({ newThought, onNewThoughtChange, onFormSubmit }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div className="thought-input-wrapper">
        <p className="thought-message">What are you grateful for today?</p>
        <textarea className="text-input-area" value={newThought} placeholder="I'm grateful for..." onChange={onNewThoughtChange} />
        <div className="thought-form-details">
          <button type="submit" className="send-thought-button">★ SAVE ★</button>
          <p className="character-counter">
            {140 - newThought.length} /140
          </p>
        </div>
      </div>
    </form>
  )
}

export default ThoughtForm;