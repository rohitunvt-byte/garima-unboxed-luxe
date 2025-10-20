export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image with Ken Burns Effect */}
      <div className="absolute inset-0">
        <img
          src="https://i.postimg.cc/Gh3b3xXW/IMG-6763.jpg"
          alt="Garima"
          className="w-full h-full object-cover animate-ken-burns"
        />
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white drop-shadow-2xl">
            Happy 19th, Garima.
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-body text-white/90 drop-shadow-lg">
            Let's dive into something new.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
