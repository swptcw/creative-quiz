import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    storyteller: 0,
    maker: 0,
    visualizer: 0,
    mover: 0
  });
  const [showResults, setShowResults] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [email, setEmail] = useState('');

  const questions = [
    {
      question: "How do you usually recharge?",
      options: [
        { text: "Writing down my thoughts or daydreaming", type: "storyteller" },
        { text: "Using my hands — cooking, crafting, building", type: "maker" },
        { text: "Doodling, watching aesthetic videos, taking photos", type: "visualizer" },
        { text: "Walking, dancing, or playing music", type: "mover" }
      ]
    },
    {
      question: "What frustrates you most about your current routine?",
      options: [
        { text: "I don't feel like I'm expressing myself", type: "storyteller" },
        { text: "I'm too stuck in my head — I need something hands-on", type: "maker" },
        { text: "Everything feels gray and uninspiring", type: "visualizer" },
        { text: "I'm overwhelmed and need a physical release", type: "mover" }
      ]
    },
    {
      question: "Your ideal creative time looks like…",
      options: [
        { text: "Quiet corner, candle lit, journaling or typing away", type: "storyteller" },
        { text: "A messy table, tools out, sleeves rolled up", type: "maker" },
        { text: "Sketchpad, mood board, or camera in hand", type: "visualizer" },
        { text: "Music on, moving, feeling the rhythm", type: "mover" }
      ]
    },
    {
      question: "When you were a kid, what did you love most?",
      options: [
        { text: "Making up stories or talking to imaginary friends", type: "storyteller" },
        { text: "Building things with blocks, Legos, or puzzles", type: "maker" },
        { text: "Coloring, organizing your room, or playing with aesthetics", type: "visualizer" },
        { text: "Dancing, pretending to be a pop star or explorer", type: "mover" }
      ]
    },
    {
      question: "What do you crave more of right now?",
      options: [
        { text: "Clarity and self-understanding", type: "storyteller" },
        { text: "Grounding and hands-on focus", type: "maker" },
        { text: "Beauty and sensory inspiration", type: "visualizer" },
        { text: "Energy and emotional release", type: "mover" }
      ]
    },
    {
      question: "What's your biggest fear around creativity?",
      options: [
        { text: "What if it's not deep or meaningful enough?", type: "storyteller" },
        { text: "What if I mess it up?", type: "maker" },
        { text: "What if it doesn't look good?", type: "visualizer" },
        { text: "What if I don't have the energy or focus?", type: "mover" }
      ]
    }
  ];

  const results = {
    storyteller: {
      title: "🎙️ You Are the Storyteller",
      icon: "✍️",
      description: "You process the world through words, thoughts, and meaning. Journaling, storytelling, and poetry could be your gateway to calm and clarity.",
      tryThis: [
        "Morning pages",
        "Guided journal prompts",
        "Writing letters to your future self"
      ],
      recommended: "The Restless Mind + Make It a Habit",
      cta: "Want structure? Try the Creative Clarity Journal or join the Creative Circle"
    },
    maker: {
      title: "🛠️ You Are the Maker",
      icon: "🔨",
      description: "Your calm comes from working with your hands. You thrive in flow when you're building, shaping, or transforming something physical.",
      tryThis: [
        "Collage art",
        "DIY decor or jewelry",
        "Polymer clay, sculpting, crafts"
      ],
      recommended: "Pick Your Playground + Flow Formula",
      cta: "Download: Beginner Maker's Toolkit (PDF)"
    },
    visualizer: {
      title: "🎨 You Are the Visualizer",
      icon: "📷",
      description: "You see the world in color, light, and shape. You're inspired by aesthetics and enjoy expressing yourself through visual mediums.",
      tryThis: [
        "Drawing or painting",
        "Photography or graphic journaling",
        "Mood boards, digital art"
      ],
      recommended: "Start Small, Start Now + Share It Scared",
      cta: "Tag your creations with #CreateYourCalm"
    },
    mover: {
      title: "🎵 You Are the Mover",
      icon: "🎶",
      description: "You're kinesthetic — you feel best when you're moving, flowing, or making sound. You process emotions through movement and rhythm.",
      tryThis: [
        "Freeform dance",
        "Drumming or beginner music loops",
        "Walking meditations"
      ],
      recommended: "The Flow Formula + The Long Game",
      cta: "Bonus: Playlist for creative movement"
    }
  };

  const handleAnswer = (type) => {
    setScores(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowEmailPrompt(true);
    }
  };

  const calculateResult = () => {
    return Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );
  };

  const handleEmailSubmit = () => {
    if (email && email.includes('@')) {
      // Here you would send the email to your backend/service
      console.log('Email submitted:', email);
      setShowResults(true);
      setShowEmailPrompt(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ storyteller: 0, maker: 0, visualizer: 0, mover: 0 });
    setShowResults(false);
    setShowEmailPrompt(false);
    setEmail('');
  };

  if (showEmailPrompt) {
    return (
      <div className="container email-prompt">
        <h2>📧 Almost There!</h2>
        <p>Want your personalized creative plan + free starter kit?<br />Enter your email below!</p>
        <div className="email-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="email-input"
          />
          <button onClick={handleEmailSubmit} className="btn-primary">
            Show My Results! ✨
          </button>
          <button onClick={() => setShowResults(true)} className="btn-skip">
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const resultType = calculateResult();
    const result = results[resultType];

    return (
      <div className="container results">
        <div className="result-icon">{result.icon}</div>
        <h2>{result.title}</h2>
        <p className="result-description">{result.description}</p>
        
        <div className="result-card">
          <h3>🧰 Try This:</h3>
          <ul>
            {result.tryThis.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-card">
          <h3>💡 Recommended Chapter:</h3>
          <p>{result.recommended}</p>
        </div>

        <div className="result-cta">
          <p>✨ {result.cta}</p>
        </div>

        <button onClick={resetQuiz} className="btn-secondary">
          Take Quiz Again
        </button>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="container">
      <h1>🧠 What's Your Creative Type?</h1>
      <p className="subtitle">Find the best calming, fulfilling creative outlet for you</p>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-text">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <div className="question-card">
        <h2>{questions[currentQuestion].question}</h2>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.type)}
              className="option-button"
            >
              {String.fromCharCode(65 + index)}) {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}