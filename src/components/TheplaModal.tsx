import { X } from 'lucide-react';
import { Button } from './ui/button';

interface TheplaModalProps {
  onClose: () => void;
}

export const TheplaModal = ({ onClose }: TheplaModalProps) => {
  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl p-8 md:p-12 w-full max-w-lg animate-fade-in-up relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center space-y-6">
          <h2 className="text-sm uppercase tracking-wider text-gold font-body">
            Access Granted!
          </h2>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            send mumma ke haath ka bana thepla to me.
          </h1>

          <div className="pt-4">
            <p className="text-lg font-body text-muted-foreground">
              thank you in advance.
            </p>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-pink hover:bg-pink/90 text-primary-foreground py-4 rounded-xl text-lg font-body font-medium transition-all mt-8"
          >
            Got it! 😊
          </Button>
        </div>
      </div>
    </div>
  );
};
