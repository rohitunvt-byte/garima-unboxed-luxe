interface CandleProps {
  isLit: boolean;
}

export const Candle = ({ isLit }: CandleProps) => {
  return (
    <div className="relative">
      {/* Flame */}
      {isLit && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="relative w-8 h-12">
            <div className="absolute inset-0 bg-gradient-to-t from-pink via-gold to-transparent rounded-full blur-sm animate-flicker" />
            <div className="absolute inset-0 bg-gradient-to-t from-pink via-gold to-transparent rounded-full opacity-80 animate-pulse" />
          </div>
        </div>
      )}
      
      {/* Wick */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-foreground/60 rounded-full" />
      
      {/* Candle Body */}
      <div className="w-16 h-32 bg-gradient-to-b from-primary to-gold rounded-b-lg shadow-xl relative overflow-hidden">
        {/* Wax drip effect */}
        <div className="absolute top-0 left-1/4 w-2 h-8 bg-primary/30 rounded-full blur-sm" />
        <div className="absolute top-4 right-1/4 w-1.5 h-6 bg-primary/30 rounded-full blur-sm" />
      </div>
    </div>
  );
};
