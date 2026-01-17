import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';

interface CarouselProps {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  className?: string;
  containerClassName?: string;
  slideClassName?: string;
  showDots?: boolean;
  showArrows?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  options,
  className = '',
  containerClassName = 'px-6',
  slideClassName = '',
  showDots = true,
  showArrows = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const slides = useMemo(() => React.Children.toArray(children), [children]);

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={`flex gap-6 ${containerClassName}`}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`flex-[0_0_100%] ${slideClassName}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-neon-cyan bg-sunset-dark/80 px-4 py-2 text-neon-cyan shadow-neon-cyan transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sunset-deep"
          >
            ←
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-neon-cyan bg-sunset-dark/80 px-4 py-2 text-neon-cyan shadow-neon-cyan transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sunset-deep"
          >
            →
          </button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === selectedIndex
                  ? 'bg-neon-cyan shadow-neon-cyan'
                  : 'bg-sunset-light/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
