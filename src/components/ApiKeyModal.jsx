import React from 'react';

export const ApiKeyModal = ({ isOpen, onClose, currentKey, onSave }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave(formData.get('apiKey'));
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="modal-title">Configure AI</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="apiKey">Gemini API Key</label>
            <input 
              type="password" 
              id="apiKey" 
              name="apiKey" 
              className="form-input" 
              placeholder="AIza..."
              defaultValue={currentKey}
              autoComplete="off"
              aria-required="true"
            />
          </div>
          <button type="submit" className="btn-primary">Save Key</button>
        </form>
      </div>
    </div>
  );
};
