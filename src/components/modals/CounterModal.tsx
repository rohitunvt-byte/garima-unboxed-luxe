import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface CounterModalProps {
  onClose: () => void;
}

export const CounterModal = ({ onClose }: CounterModalProps) => {
  const [step, setStep] = useState<'question' | 'reveal'>('question');
  const [answer, setAnswer] = useState('');
  const [counter, setCounter] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (step !== 'reveal') return;

    const startDate = new Date('2021-03-21T00:00:00');
    
    const updateCounter = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30.44);
      const years = Math.floor(days / 365.25);
      
      setCounter({
        years,
        months: months % 12,
        days: days % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    };
    
    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('reveal');
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
              The Friendship Counter
            </h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {step === 'question' ? 'How Many Months?' : 'Since March 21, 2021'}
            </h3>
          </div>

          {step === 'question' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="text-lg font-body text-muted-foreground mb-4">
                  How many months have we been friends?
                </p>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Your guess..."
                  className="w-full px-6 py-4 rounded-xl glass text-center text-lg font-body focus:outline-none focus:ring-2 focus:ring-pink transition-all"
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-pink hover:bg-pink/90 text-primary-foreground py-4 rounded-xl text-lg font-body font-medium transition-all"
              >
                Check Answer
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4">
                  <div className="text-4xl font-display font-bold text-gold">{counter.years}</div>
                  <div className="text-sm text-muted-foreground font-body">Years</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-4xl font-display font-bold text-pink">{counter.months}</div>
                  <div className="text-sm text-muted-foreground font-body">Months</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-4xl font-display font-bold text-gold">{counter.days}</div>
                  <div className="text-sm text-muted-foreground font-body">Days</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-4xl font-display font-bold text-pink">{counter.hours}</div>
                  <div className="text-sm text-muted-foreground font-body">Hours</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-4xl font-display font-bold text-gold">{counter.minutes}</div>
                  <div className="text-sm text-muted-foreground font-body">Minutes</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-4xl font-display font-bold text-pink">{counter.seconds}</div>
                  <div className="text-sm text-muted-foreground font-body">Seconds</div>
                </div>
              </div>
              <p className="text-lg font-body text-muted-foreground italic">
                ...and counting! 🎉
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
