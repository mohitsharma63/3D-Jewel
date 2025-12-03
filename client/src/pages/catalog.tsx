import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal, X, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JewelryCard } from "@/components/jewelry-card";
import { JewelryModal } from "@/components/jewelry-modal";
import { jewelryItems, jewelryCategories, materials, formatPrice } from "@/lib/static-data";
import type { JewelryItem } from "@shared/schema";

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedItem, setSelectedItem] = useState<JewelryItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const maxPrice = Math.max(...jewelryItems.map((i) => i.price));
  const minPrice = Math.min(...jewelryItems.map((i) => i.price));

  const filteredItems = useMemo(() => {
    return jewelryItems.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      const matchesMaterial =
        selectedMaterials.length === 0 ||
        selectedMaterials.some((m) => item.material.includes(m));

      const matchesPrice =
        item.price >= priceRange[0] && item.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesMaterial && matchesPrice;
    });
  }, [searchQuery, selectedCategories, selectedMaterials, priceRange]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setPriceRange([minPrice, maxPrice]);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    selectedMaterials.length > 0 ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice;

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {jewelryCategories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                data-testid={`checkbox-category-${category.id}`}
              />
              <Label htmlFor={`cat-${category.id}`} className="text-sm cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-serif font-semibold mb-3">Materials</h3>
        <ScrollArea className="h-48">
          <div className="space-y-2 pr-4">
            {materials.map((material) => (
              <div key={material} className="flex items-center gap-2">
                <Checkbox
                  id={`mat-${material}`}
                  checked={selectedMaterials.includes(material)}
                  onCheckedChange={() => toggleMaterial(material)}
                  data-testid={`checkbox-material-${material.replace(/\s/g, "-").toLowerCase()}`}
                />
                <Label htmlFor={`mat-${material}`} className="text-sm cursor-pointer">
                  {material}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      <div>
        <h3 className="font-serif font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            min={minPrice}
            max={maxPrice}
            step={10000}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
            data-testid="slider-price-range"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <Separator />
          <Button variant="outline" className="w-full" onClick={clearFilters} data-testid="button-clear-catalog-filters">
            Clear All Filters
          </Button>
        </>
      )}
    </div>
  );

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
              Jewelry Catalog
            </h1>
            <p className="text-muted-foreground">
              Explore {jewelryItems.length} exquisite pieces from master artisans
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-card rounded-lg border border-card-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-lg font-semibold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
              </div>
              <FiltersContent />
            </div>
          </aside>

          <main className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-catalog"
                />
              </div>

              <div className="flex gap-2">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden" data-testid="button-mobile-filters">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                      {hasActiveFilters && (
                        <Badge variant="secondary" className="ml-2">
                          {selectedCategories.length + selectedMaterials.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filters
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FiltersContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="hidden sm:flex items-center gap-1 border rounded-md p-1">
                  <Button
                    size="icon"
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    onClick={() => setViewMode("grid")}
                    data-testid="button-view-grid"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    onClick={() => setViewMode("list")}
                    data-testid="button-view-list"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => toggleCategory(cat)}
                  >
                    {jewelryCategories.find((c) => c.id === cat)?.name}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
                {selectedMaterials.map((mat) => (
                  <Badge
                    key={mat}
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => toggleMaterial(mat)}
                  >
                    {mat}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredItems.length} of {jewelryItems.length} items
              </p>
            </div>

            {filteredItems.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {filteredItems.map((item, index) => (
                  <JewelryCard
                    key={item.id}
                    item={item}
                    index={index}
                    onViewDetails={setSelectedItem}
                  />
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
                <h3 className="font-serif text-xl font-semibold mb-2">No Items Found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any jewelry matching your criteria. Try adjusting your filters.
                </p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      <JewelryModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
