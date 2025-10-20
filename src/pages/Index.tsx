import { useState } from 'react';
import { Confetti } from '@/components/Confetti';
import { LockScreen } from '@/components/LockScreen';
import { TheplaModal } from '@/components/TheplaModal';
import { Hero } from '@/components/Hero';
import { Timeline } from '@/components/Timeline';
import { Playground } from '@/components/Playground';
import { Finale } from '@/components/Finale';

const Index = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [showThepla, setShowThepla] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Elegant Confetti Background */}
      <Confetti />

      {/* Lock Screen */}
      {isLocked && (
        <LockScreen
          onUnlock={() => setIsLocked(false)}
          onShowThepla={() => setShowThepla(true)}
        />
      )}

      {/* Thepla Request Modal */}
      {showThepla && <TheplaModal onClose={() => setShowThepla(false)} />}

      {/* Main Content - Only visible after unlock */}
      {!isLocked && (
        <div className="relative z-10">
          <Hero />
          <Timeline />
          <Playground />
          <Finale />

          {/* Footer */}
          <footer className="py-8 text-center text-sm font-body text-muted-foreground border-t border-border/50">
            <p>
              © 2025. Made with ❤️. | Can't find the hidden message? Rate the website!
            </p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
