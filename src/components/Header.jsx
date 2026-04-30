import React from 'react';

export const Header = ({ language, setLanguage }) => {
  return (
    <header className="header" role="banner">
      <div className="container header-content">
        <div className="logo">
          <h1>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2l8 4-8 4-8-4 8-4z"/>
              <path d="M4 10v6l8 4 8-4v-6"/>
            </svg>
            Election AI Guide
          </h1>
        </div>
        <div className="header-actions">
          <label htmlFor="language-select" className="sr-only" style={{display: 'none'}}>Select Language</label>
          <select 
            id="language-select"
            className="language-selector"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select interface language"
          >
            <option value="English">English</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
            <option value="German">Deutsch</option>
            <option value="Hindi">हिन्दी</option>
            <option value="Mandarin">中文</option>
            <option value="Japanese">日本語</option>
          </select>
        </div>
      </div>
    </header>
  );
};
