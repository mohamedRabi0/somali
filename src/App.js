import './App.css'; // Import your styles
import React, { useState } from 'react';

function MyApp() {
  return (
    <div className="App">
      <Header />
      <TranslatorApp />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Language Translator - Somali to English</h1>
      <nav>
        <ul>
        <li><a href='#about'>About Me</a></li>
        <li><a href='projects'>Projects</a></li>
        <li><a href='contact'>Contact</a></li>

        </ul>
      </nav>
    </header>
  );
}

const TranslatorApp = () => {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [translateFrom, setTranslateFrom] = useState('en-GB');
  const [translateTo] = useState('so-SO');
  
  const countries = {
    'en-GB': 'English',
    'so-SO': 'Somali',
    // Add more countries if needed
  };

  const handleTextChange = (e) => {
    setFromText(e.target.value);
  };

  const handleTranslate = () => {
    if (!fromText.trim()) return;
    setToText('Translating...');
    const apiUrl = `https://api.mymemory.translated.net/get?q=${fromText.trim()}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
      });
  };

  const handleExchange = () => {
    setFromText(toText);
    setToText('');
  };

  const handleClipboardCopy = (target) => {
    if (target === 'from') {
      navigator.clipboard.writeText(fromText);
    } else if (target === 'to') {
      navigator.clipboard.writeText(toText);
    }
  };

  const handleSpeechSynthesis = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <section id="translator" className="translator">
      <div className="container">
        <div className="wrapper">
          <div className="text-input">
            <textarea
              spellCheck="false"
              className="from-text"
              placeholder="Enter text"
              value={fromText}
              onChange={handleTextChange}
            />
            <textarea
              spellCheck="false"
              readOnly
              disabled
              className="to-text"
              placeholder="Translation"
              value={toText}
            />
          </div>
          <ul className="controls">
            <li className="row from">
              <div className="icons">
                <i
                  id="from"
                  className="fas fa-volume-up"
                  onClick={() => handleSpeechSynthesis(fromText, translateFrom)}
                />
                <i
                  id="from"
                  className="fas fa-copy"
                  onClick={() => handleClipboardCopy('from')}
                />
              </div>
              <select
                value={translateFrom}
                onChange={(e) => setTranslateFrom(e.target.value)}
              >
                {Object.keys(countries).map((code) => (
                  <option key={code} value={code}>
                    {countries[code]}
                  </option>
                ))}
              </select>
            </li>
            <li className="exchange">
              <i
                className="fas fa-exchange-alt"
                onClick={handleExchange}
              />
            </li>
            <li className="row to">
              <select
                value={translateTo}
                onChange={() => {}}
                disabled
              >
                <option>{countries[translateTo]}</option>
              </select>
              <div className="icons">
                <i
                  id="to"
                  className="fas fa-volume-up"
                  onClick={() => handleSpeechSynthesis(toText, translateTo)}
                />
                <i
                  id="to"
                  className="fas fa-copy"
                  onClick={() => handleClipboardCopy('to')}
                />
              </div>
            </li>
          </ul>
        </div>
        <button onClick={handleTranslate}>Translate Text</button>
      </div>
    </section>
  );
};

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Mohamed. All rights reserved.</p>
    </footer>
  );
}

export default MyApp;
