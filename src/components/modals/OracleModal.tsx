import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '../ui/button';

interface OracleModalProps {
  onClose: () => void;
}

export const OracleModal = ({ onClose }: OracleModalProps) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getOracleAnswer = (q: string): string => {
    const lowerQ = q.toLowerCase();

    // Check for negative keywords first
    if (lowerQ.includes('hate') || lowerQ.includes('kill') || lowerQ.includes('stupid')) {
      return 'Call my owner.';
    }

    // Check for relationship keywords
    if (lowerQ.includes('love') || lowerQ.includes('crush') || lowerQ.includes('date')) {
      const responses = [
        "'banda chaiye yaar', but make sure he's worth it.",
        "'Lessgoo!'",
        'Analyze the data, but trust your gut.',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Check for sadness keywords
    if (lowerQ.includes('sad') || lowerQ.includes('upset') || lowerQ.includes('lonely')) {
      const responses = [
        'Error 404: Sadness not found. My owner, Rohit, says you\'re one of the best people he knows.',
        "'kya hi kar skte'... except be awesome tomorrow.",
        'Processing... my analysis indicates you are too strong for this.',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Check for decision keywords
    if (lowerQ.includes('should i') || lowerQ.includes('what if') || lowerQ.includes('future')) {
      const responses = [
        "The data points to 'yes,' Captain.",
        "When in doubt, the answer is probably 'chicken khana h'.",
        'A bold move is the right move.',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default response
    return 'Ask my owner pls.';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      const response = getOracleAnswer(question);
      setAnswer(response);
    }
  };

  const handleNewQuestion = () => {
    setQuestion('');
    setAnswer('');
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

        <div className="text-center space-y-8">
          <div>
            <h2 className="text-sm uppercase tracking-wider text-gold font-body mb-2">
              The Oracle 2.0
            </h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Ask Anything
            </h3>
            <p className="text-muted-foreground font-body mt-2">
              A smarter AI for life's big questions
            </p>
          </div>

          {!answer ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What do you want to know?"
                className="w-full px-6 py-4 rounded-xl glass text-lg font-body focus:outline-none focus:ring-2 focus:ring-pink transition-all resize-none h-32"
                autoFocus
              />
              <Button
                type="submit"
                className="w-full bg-pink hover:bg-pink/90 text-primary-foreground py-4 rounded-xl text-lg font-body font-medium transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Ask Oracle
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="glass rounded-xl p-6 min-h-32 flex items-center justify-center">
                <p className="text-xl font-body text-foreground text-center">
                  {answer}
                </p>
              </div>
              <Button
                onClick={handleNewQuestion}
                className="w-full bg-gold hover:bg-gold/90 text-primary-foreground py-4 rounded-xl text-lg font-body font-medium transition-all"
              >
                Ask Another Question
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
