import { useState, useEffect } from 'react';

function CollectionPage() {
  const [quizData, setQuizData] = useState([]);
  const [inputQuestion, setInputQuestion] = useState("");
  const [inputAnswers, setInputAnswers] = useState(["", "", "", ""]);

  useEffect(() => {
    fetch('/api/quiz')
      .then(res => res.json())
      .then(data => setQuizData(data.data))
      .catch(error => console.error('Feil ved henting av data:', error));
  }, []);

  const sendData = () => {
    fetch('/api/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: inputQuestion, answers: inputAnswers.map(ans => ({ answere: ans })) })
    })
    .then(response => response.json())
    .then(data => {
      setQuizData(data.data);
      setInputQuestion("");
      setInputAnswers(["", "", "", ""]);
    })
    .catch(error => console.error('Feil ved sending av data:', error));
  };

  return (
    <div>
      <h1>Quiz Collection</h1>
      {quizData.map((item, index) => (
        <div key={index}>
          <h3>{item.question}</h3>
          <ul>
            {item.answers.map((ans, ansIndex) => (
              <li key={ansIndex}>{ans.answere}</li>
            ))}
          </ul>
        </div>
      ))}
      <h2>Legg til nytt spørsmål</h2>
      <input value={inputQuestion} onChange={(e) => setInputQuestion(e.target.value)} placeholder="Spørsmål" />
      {inputAnswers.map((answer, index) => (
        <input 
          key={index}
          value={answer}
          onChange={(e) => {
            const newAnswers = [...inputAnswers];
            newAnswers[index] = e.target.value;
            setInputAnswers(newAnswers);
          }}
          placeholder={`Alternativ ${index + 1}`}
        />
      ))}
      <button onClick={sendData}>Legg til spørsmål</button>
    </div>
  );
}

export default CollectionPage;
