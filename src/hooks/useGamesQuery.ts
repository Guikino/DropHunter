
import { useQuery } from '@tanstack/react-query';

const fetchGamesByTitle = async (title:string) => {
  if (!title) return [];
  const res = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${title}`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
};

export function useGamesQuery(title:string) {
  return useQuery({
    queryKey: ['games', title], 
    queryFn: () => fetchGamesByTitle(title),
    enabled: !!title, 
    staleTime: 1000 * 60 * 5,
  });
}