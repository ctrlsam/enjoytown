import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CarousalCard from '@/components/common/card';
import { tmdb } from '@/lib/tmdb';

export default async function CarousalComponent() {
  const trending = await tmdb.movies.trending('day', 'en-US');
  if (!trending) return <div>None Found</div>;

  return (
    <>
      <Carousel className="mb-10">
        <CarouselContent className="mx-auto flex w-full">
          {trending.results?.map((movie) => (
            <CarouselItem key={movie.id}>
              <CarousalCard isDetailsPage={false} show={movie} type="movie" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
