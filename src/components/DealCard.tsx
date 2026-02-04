import React from 'react';
import type { Deal, Store } from '../../types';
import { ExternalLink, ThumbsUp, Sparkles } from 'lucide-react';

// Shadcn UI Imports
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

interface DealCardProps {
  deal: Deal;
  store: Store | undefined;
}

const DealCard: React.FC<DealCardProps> = ({ deal, store }) => {
  const savings = Math.round(parseFloat(deal.savings));
  const isDeepDiscount = savings >= 75;
  const isHighMetacritic = parseInt(deal.metacriticScore) >= 85;

  return (
    <Card className="group overflow-hidden border-border/50 bg-card hover:bg-accent/5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col h-full">
      
      {/* --- IMAGE HEADER --- */}
      <div className="relative h-36 overflow-hidden">
        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 z-10 flex gap-2">
          {isDeepDiscount && (
            <Badge variant="destructive" className="animate-pulse flex gap-1 items-center">
              <Sparkles size={10} /> HOT
            </Badge>
          )}
          {isHighMetacritic && (
            <Badge variant="secondary" className="bg-yellow-500/90 text-black hover:bg-yellow-400 font-bold">
              MUST PLAY
            </Badge>
          )}
        </div>

        <img 
          src={deal.thumb} 
          alt={deal.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Gradient Overlay para texto legível se necessário */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent opacity-80"></div>
      </div>

      {/* --- CONTENT --- */}
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2" title={deal.title}>
          {deal.title}
        </h3>

        {/* Ratings Row */}
        <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
          {parseInt(deal.metacriticScore) > 0 && (
            <div className={`flex items-center gap-1 font-medium ${parseInt(deal.metacriticScore) >= 75 ? 'text-green-500' : 'text-yellow-500'}`}>
              <span className="border border-current px-1.5 py-0.5 rounded text-[10px]">
                {deal.metacriticScore}
              </span>
              <span>Metacritic</span>
            </div>
          )}
          {parseInt(deal.steamRatingPercent) > 0 && (
            <div className="flex items-center gap-1 text-blue-400">
              <ThumbsUp size={12} />
              <span>{deal.steamRatingPercent}% Steam</span>
            </div>
          )}
        </div>

        {/* Price Row */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs line-through">
              ${deal.normalPrice}
            </span>
            <span className="text-xl font-bold text-emerald-500">
              ${deal.salePrice}
            </span>
          </div>
          
          <div className="flex flex-col items-end gap-1">
             <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
               {store?.storeName || 'Store'}
             </span>
             <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10">
               -{savings}%
             </Badge>
          </div>
        </div>
      </CardContent>

      {/* --- FOOTER --- */}
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" size="sm">
          <a 
            href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            View Deal <ExternalLink size={14} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DealCard;