import React, { useState, useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Search, Menu, Gamepad2, AlertCircle } from "lucide-react";

// Hooks Personalizados
import { useDebounce } from "../hooks/useDebounce"; // <--- IMPORTANTE

// UI Components
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { ModeToggle } from "../components/modeToggle";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

// Tipos e API
import type { FilterState } from "../../types";
import { getDeals, getStores } from "../services/api";

// Seus Componentes
import Sidebar from "../components/SideBar";
import DealCard from "../components/DealCard";

const Home: React.FC = () => {
  // 1. Estados da UI (Mudam instantaneamente para o usuário ver)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(0);

  const [filters, setFilters] = useState<FilterState>({
    lowerPrice: 0,
    upperPrice: 50,
    metacritic: 0,
    steamRating: 0,
    onSaleOnly: false,
    sortBy: "Deal Rating",
    desc: true,
  });

  // 2. Estados "Atrasados" (Debounced) para a API
  // A API só será chamada 600ms depois que o usuário PARAR de digitar/arrastar
  const debouncedSearch = useDebounce(searchTerm, 600);
  const debouncedFilters = useDebounce(filters, 500);

  // 3. Query de Lojas (Cache longo)
  const { data: stores = [] } = useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
    staleTime: 1000 * 60 * 60 * 24,
  });

  // 4. Query de Ofertas (Vigia os estados DEBOUNCED)
  const {
    data: deals = [],
    isLoading,
    isError,
    error,
    isPlaceholderData,
    refetch,
  } = useQuery({
    // A mágica acontece aqui: mudamos 'filters' por 'debouncedFilters'
    queryKey: ["deals", debouncedFilters, debouncedSearch, page],
    queryFn: () => getDeals(debouncedFilters, debouncedSearch, page),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  // 5. Resetar página quando trocar filtro ou busca
  useEffect(() => {
    setPage(0);
  }, [debouncedFilters, debouncedSearch]); // <-- Agora vigia o debounced

  return (
    <HashRouter>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b">
          <div className="px-4 py-3 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-3">
              <div className="lg:hidden flex items-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-72">
                    <Sidebar
                      filters={filters}
                      setFilters={setFilters}
                      stores={stores}
                      isOpen={true}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
                <img src="icons/icon-logo.png" className="h-10 w-10 md:h-12 md:w-12" />
                <span className="inline bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  DropHunter
                </span>
              </div>
              
              <div className="md:hidden">
                <ModeToggle />
              </div>
            </div>

            <div className="flex items-center w-full md:w-auto justify-between md:justify-end gap-4">
              <div className="hidden md:block">
                <ModeToggle />
              </div>

              <div className="flex-1 md:flex-none w-full md:max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-secondary/50 border-input focus-visible:ring-primary w-full md:w-[300px]"
                />
              </div>
            </div>
          </div>
        </nav>

        <div className="flex flex-1 min-w-0">
          <div className="hidden lg:block shrink-0 w-64">
            <Sidebar
              filters={filters}
              setFilters={setFilters}
              stores={stores}
            />
          </div>

          <main className="flex-1 min-w-0 overflow-y-auto p-4 lg:p-8 relative">
            <div className="mb-6 flex flex-col justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Latest Deals
                </h1>
                <p className="text-muted-foreground">
                  {isLoading
                    ? "Searching..."
                    : `Found ${deals.length} deals for you`}
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {Array.from({ length: 8 }).map((_, i) => (
    <div key={i} className="space-y-3">
      <Skeleton className="aspect-video w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ))}
</div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center h-[50vh] gap-4 text-center">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-muted-foreground max-w-sm">
                  {error instanceof Error
                    ? error.message
                    : "Failed to load deals."}
                </p>
                <Button onClick={() => refetch()} variant="outline">
                  Try Refreshing
                </Button>
              </div>
            ) : deals.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <Gamepad2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No deals found</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {deals.map((deal) => (
                  <DealCard
                    key={deal.dealID}
                    deal={deal}
                    store={stores.find((s) => s.storeID === deal.storeID)}
                  />
                ))}
              </div>
            )}
            <Pagination className="pt-14 pb-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 0) setPage((old) => old - 1);
                    }}
                    className={
                      page === 0
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive
                    onClick={(e) => e.preventDefault()}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isPlaceholderData && deals.length === 20) {
                        setPage((old) => old + 1);
                      }
                    }}
                    className={
                      isPlaceholderData || deals.length < 20
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div className="mt-12 py-6 border-t text-center text-muted-foreground text-xs">
              <p>
                Powered by{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/guikino"
                  className="hover:underline text-primary"
                >
                  Guikino
                </a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default Home;
