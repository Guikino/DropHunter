import React from 'react';
import type { FilterState, Store } from '../../types';
import { Filter, DollarSign, Trophy, Percent, SortAsc } from 'lucide-react';

// Shadcn UI Imports
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Separator } from "../components/ui/separator"

interface SidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  stores: Store[];
  isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, setFilters, stores }) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="
      fixed left-0 top-[57px] bottom-0 
      w-64                             
      bg-background/95 backdrop-blur   
      border-r border-border
      max-md:border-0
      overflow-y-auto               
      p-6 space-y-8 
      z-40">
    
          
          <div className="flex items-center gap-2 text-primary mb-2">
            <Filter className="h-5 w-5" />
            <h2 className="text-lg font-semibold tracking-tight">Filters</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" /> Max Price
              </Label>
              <span className="text-sm font-bold text-primary">
                ${filters.upperPrice}
              </span>
            </div>
            <Slider
              defaultValue={[filters.upperPrice]}
              max={100}
              step={1}
              onValueChange={(vals: number[]) => updateFilter('upperPrice', vals[0])}
              className="py-4"
            />
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Trophy className="h-4 w-4" /> Min Metacritic
              </Label>
              <span className={`text-sm font-bold ${filters.metacritic > 70 ? 'text-green-500' : 'text-yellow-500'}`}>
                {filters.metacritic}+
              </span>
            </div>
            <Slider
              defaultValue={[filters.metacritic]}
              max={100}
              step={5}
              onValueChange={(vals: number[]) => updateFilter('metacritic', vals[0])}
              className="py-4"
            />
          </div>
          <Separator />
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <SortAsc className="h-4 w-4" /> Sort By
            </Label>
            <Select
              value={filters.sortBy}
              onValueChange={(val: string) => updateFilter('sortBy', val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Deal Rating">Best Deals</SelectItem>
                <SelectItem value="Price">Lowest Price</SelectItem>
                <SelectItem value="Metacritic">Metacritic Score</SelectItem>
                <SelectItem value="Savings">Highest Savings</SelectItem>
                <SelectItem value="Release">Release Date</SelectItem>
                <SelectItem value="Title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
             <Label className="flex items-center gap-2 text-muted-foreground">
              <Percent className="h-4 w-4" /> Specific Store
            </Label>
            <Select
              value={filters.storeID || "all"}
              onValueChange={(val: string) => updateFilter('storeID', val === "all" ? undefined : val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Stores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                {stores.map(store => (
                  <SelectItem key={store.storeID} value={store.storeID}>
                    {store.storeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="sale-mode" className="text-muted-foreground cursor-pointer">
              On Sale Only
            </Label>
            <Switch
              id="sale-mode"
              checked={filters.onSaleOnly}
              onCheckedChange={(checked: boolean) => updateFilter('onSaleOnly', checked)}
            />
          </div>
    </aside>
  );
};

export default Sidebar;