import React, { useState } from 'react';
import Header from '../components/Header';
import ReactCardFlip from 'react-card-flip';
import './Page.css';

function Page1() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const phrases = [
    { english: 'Good Morning', somali: 'Subax wanaagsan' },
    { english: 'Good Night', somali: 'Habeen wanaagsan' },
    { english: 'Thank You', somali: 'Mahadsanid' },
    { english: 'Please', somali: 'Fadlan' },
    { english: 'Hello', somali: 'Salaan' },
    { english: 'Goodbye', somali: 'Nabad gelyo' },
    { english: 'Pants', somali: 'Surwaal' },
    { english: 'Shoes', somali: 'Kabaha' },
    { english: 'T-shirt', somali: 'Funaanad' },
    { english: 'Hair', somali: 'Timaha' },
    { english: 'Food', somali: 'Cunto' },
    { english: 'Water', somali: 'Biyo' },
    { english: 'Yes', somali: 'Haa' },
    { english: 'No', somali: 'Maya' },
    { english: 'Father', somali: 'Aabbe' },
    { english: 'Mother', somali: 'Hooyo' },
    { english: 'Friend', somali: 'Saaxiib' },
    { english: 'House', somali: 'Guri' },
    { english: 'School', somali: 'Dugsi' },
    { english: 'Teacher', somali: 'Macallin' },
    { english: 'Book', somali: 'Buug' },
    { english: 'Sun', somali: 'Qorrax' },
    { english: 'Moon', somali: 'Dayax' },
    { english: 'Happy', somali: 'Faraxsan' },
  ];

  const flipCard = (index) => {
    setFlippedIndex(index === flippedIndex ? null : index);
  };

  return (
    <div>
      <Header />
      <div className="card-container">
        {phrases.map((phrase, index) => (
          <ReactCardFlip
            key={index}
            isFlipped={flippedIndex === index}
            flipDirection="horizontal"
          >
            <div className="card" onClick={() => flipCard(index)}>
              <h2>{phrase.english}</h2>
            </div>
            <div className="card-back" onClick={() => flipCard(index)}>
              <h2>{phrase.somali}</h2>
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </div>
  );
}

export default Page1;
