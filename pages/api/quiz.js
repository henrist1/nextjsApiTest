let quiz = [
    {
      question: 'Spørsmål 1',
      answers: [
        {
          answere: 'Alternativ 1',
        },
        {
          answere: 'Alternativ 2',
        },
        {
          answere: 'Alternativ 3',
        },
        {
          answere: 'Alternativ 4',
          correct: true,
        },
      ],
    },
    {
      question: 'Spørsmål 2',
      answers: [
        {
          answere: 'Alternativ 1',
        },
        {
          answere: 'Alternativ 2',
        },
        {
          answere: 'Alternativ 3',
        },
        {
          answere: 'Alternativ 4',
          correct: true,
        },
      ],
    },
  ];
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      return res.status(200).json({ success: true, data: quiz });
    } else if (req.method === 'POST') {
      const { question, answers } = req.body;
      quiz.push({ question, answers });
      return res.status(201).json({ success: true, data: quiz });
    } else {
      return res.status(405).end();  // Method Not Allowed
    }
  }