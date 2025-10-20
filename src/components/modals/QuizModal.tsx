import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface QuizModalProps {
  onClose: () => void;
}

const questions = [
  {
    question: "What is Garima's favorite color?",
    options: ['Black', 'Pink', 'Gold', 'White'],
    correct: 'Black',
  },
  {
    question: "What is Garima's favorite outlet?",
    options: ["McDonald's", 'Burger King', 'Starbucks'],
    correct: "McDonald's",
  },
  {
    question: 'Which country is Garima *really* from? (wink wink)',
    options: ['India', 'Spain', 'Pakistan'],
    correct: 'Pakistan',
  },
];

export const QuizModal = ({ onClose }: QuizModalProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [nickname, setNickname] = useState('');
  const [bestQuality, setBestQuality] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQ].correct) {
      setScore(score + 1);
    }
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Move to nickname question
      setCurrentQ(currentQ + 1);
    }
  };

  const handleNicknameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      setCurrentQ(currentQ + 1); // Move to best quality question
    }
  };

  const handleQualitySubmit = (quality: string) => {
    setBestQuality(quality);
    setCompleted(true);
  };

  const renderQuestion = () => {
    if (completed) {
      return (
        <div className="text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Quiz Complete!
          </h3>
          <div className="glass rounded-xl p-6">
            <p className="text-5xl font-display font-bold text-pink mb-2">{score}/3</p>
            <p className="text-lg font-body text-muted-foreground">Correct Answers</p>
          </div>
          {nickname && (
            <p className="text-lg font-body text-foreground">
              Your nickname: <span className="text-pink font-semibold">"{nickname}"</span>
            </p>
          )}
          {bestQuality && (
            <p className="text-lg font-body text-foreground">
              Garima's best quality: <span className="text-gold font-semibold">{bestQuality}</span>
            </p>
          )}
        </div>
      );
    }

    if (currentQ === questions.length) {
      // Nickname question
      return (
        <form onSubmit={handleNicknameSubmit} className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            What's your best nickname?
          </h3>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter nickname..."
            className="w-full px-6 py-4 rounded-xl glass text-center text-lg font-body focus:outline-none focus:ring-2 focus:ring-pink transition-all"
            autoFocus
          />
          <Button
            type="submit"
            className="w-full bg-pink hover:bg-pink/90 text-primary-foreground py-4 rounded-xl text-lg font-body font-medium transition-all"
          >
            Next Question
          </Button>
        </form>
      );
    }

    if (currentQ === questions.length + 1) {
      // Best quality question
      return (
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            What is Garima's best quality?
          </h3>
          <div className="space-y-3">
            {['Her Maturity', 'Her Loyalty', 'Her Humor'].map((quality) => (
              <button
                key={quality}
                onClick={() => handleQualitySubmit(quality)}
                className="w-full px-6 py-4 rounded-xl glass hover:bg-pink/10 hover:border-pink transition-all text-lg font-body text-left"
              >
                {quality}
              </button>
            ))}
          </div>
        </div>
      );
    }

    const question = questions[currentQ];
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gold font-body mb-2">Question {currentQ + 1} of {questions.length}</p>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            {question.question}
          </h3>
        </div>
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full px-6 py-4 rounded-xl glass hover:bg-pink/10 hover:border-pink transition-all text-lg font-body text-left"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl p-8 md:p-12 w-full max-w-lg animate-fade-in-up relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-sm uppercase tracking-wider text-gold font-body mb-2">
              Protocol 21 Quiz
            </h2>
          </div>
          {renderQuestion()}
        </div>
      </div>
    </div>
  );
};
