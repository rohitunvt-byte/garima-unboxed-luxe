import { useState } from 'react';
import { Button } from './ui/button';
import { Candle } from './Candle';

export const Finale = () => {
  const [candleStep, setCandleStep] = useState<'unlit' | 'lit' | 'wish1' | 'extinguished'>('unlit');
  const [wishMessage, setWishMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [meetingDate, setMeetingDate] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [hiddenMessage, setHiddenMessage] = useState('');

  const handleCandleClick = () => {
    if (candleStep === 'unlit') {
      setCandleStep('lit');
    } else if (candleStep === 'lit') {
      setCandleStep('wish1');
      setWishMessage('nahi ek aur wish mango.');
    } else if (candleStep === 'wish1') {
      setCandleStep('extinguished');
      setWishMessage('');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleRating = (score: number) => {
    setRating(score);
    if (score < 5) {
      setHiddenMessage('spell out very loud: sharam hai aapko?');
    } else if (score <= 10) {
      setHiddenMessage('Thank you for the feedback! :)');
    }
  };

  const handle10Plus = () => {
    setRating(11);
    setHiddenMessage('i really miss you. come see me.');
  };

  const getButtonText = () => {
    if (candleStep === 'unlit') return 'Light the Candle';
    if (candleStep === 'lit') return 'Make a Wish & Blow Out the Candle';
    if (candleStep === 'wish1') return 'Okay, One More Wish...';
    return '';
  };

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-4xl mx-auto space-y-20">
        {/* Candle Section */}
        <div className="text-center space-y-12 animate-fade-in-up">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
              Make a Wish
            </h2>
            <p className="text-lg md:text-xl font-body text-muted-foreground">
              It's your special day
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <Candle isLit={candleStep === 'lit' || candleStep === 'wish1'} />
            
            {wishMessage && (
              <p className="text-xl font-body text-pink animate-fade-in-up">
                {wishMessage}
              </p>
            )}

            {candleStep !== 'extinguished' && (
              <Button
                onClick={handleCandleClick}
                className="bg-pink hover:bg-pink/90 text-primary-foreground px-12 py-6 rounded-xl text-xl font-body font-medium transition-all"
              >
                {getButtonText()}
              </Button>
            )}
          </div>
        </div>

        {/* Form Section - Only show after candle is extinguished */}
        {candleStep === 'extinguished' && !formSubmitted && (
          <div className="glass rounded-2xl p-8 md:p-12 animate-fade-in-up">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-gold">
                  Future Quest: Operation Meet-Up
                </h3>
                <p className="text-lg font-body text-muted-foreground">
                  (fill for a cutuuu text)
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-body text-foreground mb-3">
                    So... when will we meet?
                  </label>
                  <input
                    type="text"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    placeholder="Your answer..."
                    className="w-full px-6 py-4 rounded-xl glass text-lg font-body focus:outline-none focus:ring-2 focus:ring-pink transition-all"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-pink hover:bg-pink/90 text-primary-foreground py-4 rounded-xl text-lg font-body font-medium transition-all"
                >
                  Submit Response
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Success Message & Final Note */}
        {formSubmitted && (
          <div className="space-y-12 animate-fade-in-up">
            <div className="glass rounded-2xl p-8 text-center">
              <p className="text-lg font-body text-gold">
                [ Response Sent. Coordinates received. The countdown has begun. ]
              </p>
            </div>

            <div className="glass rounded-2xl p-8 md:p-12">
              <div className="space-y-6">
                <p className="text-lg md:text-xl font-body text-foreground leading-relaxed">
                  Happy 19th birthday garima. from spain to india. from school to college. from dumb to smart. from rude to sweet. from now to hopefully forever. i am so happy to have u in my life. I wish you get things you tell no one about, you get free from troubles you never discuss. You are literally one of the best person i know and i can blindly trust fr. love u a lots garima. basss aur tareef does not suit this friendship hehe. take care &lt;3
                </p>
                <p className="text-2xl font-display text-gold text-right">
                  — Rohit
                </p>
              </div>
            </div>

            {/* Rating System */}
            {!rating && (
              <div className="glass rounded-2xl p-8 md:p-12">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center">
                    How did I do?
                  </h3>
                  <p className="text-lg font-body text-muted-foreground text-center">
                    Rate this birthday wish:
                  </p>
                  
                  <div className="grid grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleRating(num)}
                        className="glass rounded-xl p-4 hover:bg-pink/10 hover:border-pink transition-all"
                      >
                        <span className="text-2xl font-display font-bold text-foreground">{num}</span>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={handle10Plus}
                    className="w-full glass rounded-xl p-4 hover:bg-gold/10 hover:border-gold transition-all"
                  >
                    <span className="text-2xl font-display font-bold text-gold">10+ ⭐</span>
                  </button>
                </div>
              </div>
            )}

            {/* Hidden Message */}
            {hiddenMessage && (
              <div className="glass rounded-2xl p-8 text-center animate-fade-in-up">
                <p className="text-xl font-body text-pink">
                  {hiddenMessage}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Closing Image */}
        {formSubmitted && (
          <div className="animate-fade-in-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1529633814833-c972b2235c5c"
                alt="Beautiful flower bouquet"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent flex items-end justify-center pb-12">
                <h2 className="text-5xl md:text-6xl font-display font-bold text-white drop-shadow-2xl">
                  Happy Birthday
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
