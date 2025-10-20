import { useState } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  text: string;
  image: string;
  isHighlight?: boolean;
}

const events: TimelineEvent[] = [
  {
    year: '2006',
    title: 'Born',
    text: 'oh no paida hogyiiiii',
    image: 'https://i.postimg.cc/V61kqQFN/IMG-6764.jpg',
  },
  {
    year: '2021',
    title: 'Friends',
    text: 'aapki zindagi mei meri divine entryy',
    image: 'https://i.postimg.cc/bNjfdH3c/IMG-6765.jpg',
    isHighlight: true,
  },
  {
    year: '2025',
    title: 'Present',
    text: 'bhakt in making',
    image: 'https://i.postimg.cc/8Cd6QbKz/IMG-6766.jpg',
  },
];

export const Timeline = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            The Journey
          </h2>
          <p className="text-lg md:text-xl font-body text-muted-foreground">
            A timeline of beautiful moments
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Golden Thread */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-pink to-gold transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {events.map((event, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Memory Node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-pink shadow-lg shadow-pink/50 animate-pulse hidden md:block z-10" />

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                  <div className="inline-block">
                    <div className="text-gold text-sm uppercase tracking-wider font-body mb-2">
                      {event.year}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                      {event.title}
                    </h3>
                    <p className="text-lg font-body text-muted-foreground">
                      {event.text}
                    </p>
                  </div>
                </div>

                {/* Image Card */}
                <div className="flex-1 w-full">
                  <div
                    className={`glass rounded-2xl overflow-hidden transition-all duration-500 ${
                      event.isHighlight ? 'scale-110' : 'scale-100'
                    } ${
                      hoveredIndex === index ? 'shadow-2xl -rotate-2' : 'shadow-lg rotate-0'
                    }`}
                    style={{
                      transform: hoveredIndex === index 
                        ? 'perspective(1000px) rotateY(5deg) scale(1.05)' 
                        : 'perspective(1000px) rotateY(0deg) scale(1)',
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
