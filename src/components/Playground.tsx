import { useState } from 'react';
import { Book, Clock, HelpCircle, Sparkles } from 'lucide-react';
import { LexiconModal } from './modals/LexiconModal';
import { CounterModal } from './modals/CounterModal';
import { QuizModal } from './modals/QuizModal';
import { OracleModal } from './modals/OracleModal';

export const Playground = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const apps = [
    {
      id: 'lexicon',
      icon: Book,
      title: "Garima's Lexicon",
      description: 'Her iconic phrases',
      color: 'from-gold to-primary',
    },
    {
      id: 'counter',
      icon: Clock,
      title: 'The Friendship Counter',
      description: 'How long have we been friends?',
      color: 'from-pink to-secondary',
    },
    {
      id: 'quiz',
      icon: HelpCircle,
      title: 'Protocol 21 Quiz',
      description: 'Test your knowledge',
      color: 'from-gold to-primary',
    },
    {
      id: 'oracle',
      icon: Sparkles,
      title: 'The Oracle 2.0',
      description: 'Ask the AI anything',
      color: 'from-pink to-secondary',
    },
  ];

  return (
    <section className="py-20 md:py-32 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            A Playground of Memories & Moments
          </h2>
          <p className="text-lg md:text-xl font-body text-muted-foreground">
            Play, discover, and uncover a few of the things that make you, you.
          </p>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {apps.map((app, index) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => setActiveModal(app.id)}
                className="glass rounded-2xl p-8 text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {app.title}
                </h3>
                <p className="text-muted-foreground font-body">
                  {app.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'lexicon' && <LexiconModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'counter' && <CounterModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'quiz' && <QuizModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'oracle' && <OracleModal onClose={() => setActiveModal(null)} />}
    </section>
  );
};
