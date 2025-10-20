import { useState, useEffect } from 'react';
import { X, Shuffle } from 'lucide-react';
import { Button } from '../ui/button';

interface LexiconModalProps {
  onClose: () => void;
}

const phrases = [
  'chicken khana h',
  'kya hi kar skte',
  '💯💯💯',
  'banda chaiye yaar',
  'kaise gawar log hai',
  'sogyi thi mai',
  'lessgoo',
  'chiiiiii',
];

export const LexiconModal = ({ onClose }: LexiconModalProps) => {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  const shuffle = () => {
    let newPhrase;
    do {
      newPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    } while (newPhrase === currentPhrase && phrases.length > 1);
    setCurrentPhrase(newPhrase);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

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
              Garima's Lexicon
            </h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Iconic Phrases
            </h3>
          </div>

          <div className="py-12 px-6 glass rounded-xl min-h-32 flex items-center justify-center">
            <p className="text-2xl md:text-3xl font-body text-foreground font-medium">
              "{currentPhrase}"
            </p>
          </div>

          <Button
            onClick={shuffle}
            className="w-full bg-pink hover:bg-pink/90 text-primary-foreground py-4 rounded-xl text-lg font-body font-medium transition-all flex items-center justify-center gap-2"
          >
            <Shuffle size={20} />
            Shuffle Phrase
          </Button>
        </div>
      </div>
    </div>
  );
};
