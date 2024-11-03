'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { tmdb, TvSerie } from '@/lib/tmdb';
import { ListResponse } from '@/lib/tmdb/utils/list-response';

export default function Search() {
  const [title, setTitle] = useState('');
  const [result, setResults] = useState<ListResponse<TvSerie> | null>(null);

  const fetch_results = async (title: string) => {
    if (title) {
      const results = await tmdb.tv.search(title, 'en-US');
      setResults(results);
    }
  };

  // Debounce function to limit the rate of API calls
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (this: void, ...args: any[]) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  // Effect to trigger search when title changes
  useEffect(() => {
    const debouncedFetch = debounce(fetch_results, 500);
    debouncedFetch(title);
  }, [title]);

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <FaSearch color="current" size={17} />
        <input
          placeholder="Search for tv shows"
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          )}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <section>
        <div className="mt-2 grid grid-cols-2 items-center gap-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6">
          {result &&
            result.results &&
            result.results.map((item, index) => {
              if (item.poster_path) {
                return (
                  <Link href={`/tv/${encodeURIComponent(item.id)}`} key={index}>
                    <Card className="items-center text-center transition-all duration-300 hover:scale-105">
                      <CardHeader>
                        <CardTitle className="text-xs">{item.name || `" "`}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Image
                          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                          width={160}
                          height={160}
                          className="aspect-[3/4] h-2/4 w-full rounded-md object-cover transition-all"
                          alt="Drama Poster"
                        />
                      </CardContent>
                    </Card>
                  </Link>
                );
              }
            })}
        </div>
      </section>
    </main>
  );
}
