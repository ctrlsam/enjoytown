import DetailsContainer from "@/components/containers/tv/details";
import RelatedTv from "@/components/containers/tv/related";
import { tmdb } from "@/lib/tmdb";


export default async function MovieInfo ({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id;

  try {
    const data = await tmdb.tv.details(Number(id), "en-US");
    return (
      <div className="mx-auto max-w-6xl md:pt-4">
        <DetailsContainer data={data} id={id}  />

        <h1 className="text-2xl font-bold mt-20">Similar Movies</h1>
        <RelatedTv id={id} type={"similar"} />
        
        <h1 className="text-2xl font-bold mt-8">Recommended Movies</h1>
        <RelatedTv id={id} type={"recommendations"} />
      </div>
    );
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : 'An error occurred';
    return <div>Error: {errorMessage}</div>;
  }
};
