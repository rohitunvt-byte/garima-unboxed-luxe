import { useState } from 'react';
import { Button } from './ui/button';

interface LockScreenProps {
  onUnlock: () => void;
  onShowThepla: () => void;
}

export const LockScreen = ({ onUnlock, onShowThepla }: LockScreenProps) => {
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const errorMessages = [
    'batao ye bhi nai pata?',
    'tum ias ki padhai chhod do.'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.toLowerCase().trim() === 'thepla') {
      onUnlock();
      setTimeout(() => {
        onShowThepla();
      }, 800);
    } else {
      setShake(true);
      setError(errorMessages[Math.min(attempts, 1)]);
      setAttempts(prev => prev + 1);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl p-8 md:p-12 w-full max-w-md animate-fade-in-up">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm uppercase tracking-wider text-gold font-body">
              ACCESS REQUIRED: PROTOCOL 21.10
            </h2>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              ENTER BIRTHDAY TREAT REQUEST:
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={shake ? 'animate-shake' : ''}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type here..."
                className="w-full px-6 py-4 rounded-xl glass text-center text-lg font-body focus:outline-none focus:ring-2 focus:ring-pink transition-all"
                autoFocus
              />
            </div>
            
            <p className="text-sm text-muted-foreground font-body italic">
              Hint: Starts with 'T', my fav gujarati snack.
            </p>

            {error && (
              <p className="text-pink font-body animate-fade-in-up">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-pink hover:bg-pink/90 text-primary-foreground py-6 rounded-xl text-lg font-body font-medium transition-all"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
