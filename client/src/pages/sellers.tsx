import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SellerCard } from "@/components/seller-card";
import { sellers, indianStates, getStateById } from "@/lib/static-data";

export default function Sellers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");

  const allSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    sellers.forEach((s) => s.specialties.forEach((sp) => specialties.add(sp)));
    return Array.from(specialties).sort();
  }, []);

  const statesWithSellers = useMemo(() => {
    const states = new Set(sellers.map((s) => s.state));
    return indianStates.filter((s) => states.has(s.id));
  }, []);

  const filteredSellers = useMemo(() => {
    return sellers.filter((seller) => {
      const matchesSearch =
        searchQuery === "" ||
        seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.workshopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesState = selectedState === "all" || seller.state === selectedState;

      const matchesSpecialty =
        selectedSpecialty === "all" ||
        seller.specialties.includes(selectedSpecialty);

      return matchesSearch && matchesState && matchesSpecialty;
    });
  }, [searchQuery, selectedState, selectedSpecialty]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedState("all");
    setSelectedSpecialty("all");
  };

  const hasActiveFilters = searchQuery || selectedState !== "all" || selectedSpecialty !== "all";

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              All Jewelry Sellers
            </h1>
            <p className="text-muted-foreground">
              Discover {sellers.length} verified artisans across India
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, workshop, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-sellers"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-[180px]" data-testid="select-state">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {statesWithSellers.map((state) => (
                  <SelectItem key={state.id} value={state.id}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-[180px]" data-testid="select-specialty">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {allSpecialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} data-testid="button-clear-filters">
                Clear Filters
              </Button>
            )}
          </div>
        </motion.div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
              </Badge>
            )}
            {selectedState !== "all" && (
              <Badge variant="secondary" className="gap-1">
                State: {getStateById(selectedState)?.name}
              </Badge>
            )}
            {selectedSpecialty !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Specialty: {selectedSpecialty}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredSellers.length} of {sellers.length} sellers
          </p>
        </div>

        {filteredSellers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSellers.map((seller, index) => (
              <SellerCard key={seller.id} seller={seller} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-2">No Sellers Found</h3>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any sellers matching your criteria. Try adjusting your filters or search query.
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
