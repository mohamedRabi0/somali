import React, { useState } from 'react';
import './HomePage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div>
      <Header />
     <TranslatorApp />
      <Footer />
    </div>
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
      .then((data) => setToText(data.responseData.translatedText))
      .catch((error) => {
        console.error('Error:', error);
        setToText('Error occurred during translation.');
      });
  };

  const handleExchange = () => {
    setFromText(toText);
    setToText('');
  };

  const handleClipboardCopy = (target) => {
    const text = target === 'from' ? fromText : toText;
    navigator.clipboard.writeText(text);
  };

  const handleSpeechSynthesis = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="text-input">
          <textarea
            spellCheck="false"
            placeholder="Enter text"
            value={fromText}
            onChange={handleTextChange}
          />
          <textarea
            spellCheck="false"
            readOnly
            placeholder="Translation"
            value={toText}
          />
        </div>
        <ul className="controls">
          <li className="row from">
            <div className="icons">
              <i
                className="fas fa-volume-up"
                onClick={() => handleSpeechSynthesis(fromText, translateFrom)}
              />
              <i
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
            <select disabled>
              <option>{countries[translateTo]}</option>
            </select>
            <div className="icons">
              <i
                className="fas fa-volume-up"
                onClick={() => handleSpeechSynthesis(toText, translateTo)}
              />
              <i
                className="fas fa-copy"
                onClick={() => handleClipboardCopy('to')}
              />
            </div>
          </li>
        </ul>
        <button onClick={handleTranslate}>Translate Text</button>
      </div>
    </div>
  );
};

export default HomePage;
