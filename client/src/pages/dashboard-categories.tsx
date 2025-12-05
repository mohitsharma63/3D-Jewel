
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Upload, X, Edit, Trash2, FolderPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  description: string;
  images: string[];
  subCategories: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
  description: string;
}

export default function DashboardCategories() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "c1",
      name: "Necklaces",
      description: "Beautiful necklaces in various designs",
      images: ["https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop"],
      subCategories: [
        { id: "sc1", name: "Kundan Necklaces", description: "Traditional Kundan work" },
        { id: "sc2", name: "Pearl Necklaces", description: "Elegant pearl designs" },
      ],
    },
  ]);

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddSubCategoryOpen, setIsAddSubCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const { toast } = useToast();

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  const [subCategoryForm, setSubCategoryForm] = useState({
    name: "",
    description: "",
  });

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleRemoveImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validImages = imageUrls.filter(url => url.trim() !== "");
    
    const newCategory: Category = {
      id: `c${categories.length + 1}`,
      name: categoryForm.name,
      description: categoryForm.description,
      images: validImages.length > 0 ? validImages : ["https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop"],
      subCategories: [],
    };

    setCategories([...categories, newCategory]);
    setIsAddCategoryOpen(false);
    setCategoryForm({ name: "", description: "" });
    setImageUrls([""]);

    toast({
      title: "Category Added",
      description: `${newCategory.name} has been added successfully.`,
    });
  };

  const handleAddSubCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory) return;

    const newSubCategory: SubCategory = {
      id: `sc${Date.now()}`,
      name: subCategoryForm.name,
      description: subCategoryForm.description,
    };

    setCategories(categories.map(cat => {
      if (cat.id === selectedCategory) {
        return {
          ...cat,
          subCategories: [...cat.subCategories, newSubCategory],
        };
      }
      return cat;
    }));

    setIsAddSubCategoryOpen(false);
    setSubCategoryForm({ name: "", description: "" });
    setSelectedCategory(null);

    toast({
      title: "Sub-Category Added",
      description: `${newSubCategory.name} has been added successfully.`,
    });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: "Category Deleted",
      description: "Category has been removed.",
    });
  };

  const handleDeleteSubCategory = (categoryId: string, subCategoryId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          subCategories: cat.subCategories.filter(sub => sub.id !== subCategoryId),
        };
      }
      return cat;
    }));
    toast({
      title: "Sub-Category Deleted",
      description: "Sub-category has been removed.",
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
            Categories
          </h1>
          <p className="text-muted-foreground">
            Manage your product categories and sub-categories
          </p>
        </div>
        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name *</Label>
                <Input
                  id="categoryName"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryDescription">Description *</Label>
                <Textarea
                  id="categoryDescription"
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Category Images</Label>
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1"
                    />
                    {imageUrls.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveImageUrl(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleAddImageUrl}
                >
                  <Upload className="w-4 h-4" />
                  Add Another Image
                </Button>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Category
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category Images */}
                <div className="grid grid-cols-3 gap-2">
                  {category.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="aspect-square rounded-lg overflow-hidden border">
                      <img
                        src={image}
                        alt={`${category.name} ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Sub-Categories */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-sm">Sub-Categories</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsAddSubCategoryOpen(true);
                      }}
                    >
                      <FolderPlus className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                  
                  {category.subCategories.length > 0 ? (
                    <div className="space-y-2">
                      {category.subCategories.map((subCat) => (
                        <div
                          key={subCat.id}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-sm">{subCat.name}</p>
                            <p className="text-xs text-muted-foreground">{subCat.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteSubCategory(category.id, subCat.id)}
                          >
                            <Trash2 className="w-3 h-3 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No sub-categories yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Sub-Category Dialog */}
      <Dialog open={isAddSubCategoryOpen} onOpenChange={setIsAddSubCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Sub-Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubCategory} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subCategoryName">Sub-Category Name *</Label>
              <Input
                id="subCategoryName"
                value={subCategoryForm.name}
                onChange={(e) => setSubCategoryForm({ ...subCategoryForm, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subCategoryDescription">Description *</Label>
              <Textarea
                id="subCategoryDescription"
                value={subCategoryForm.description}
                onChange={(e) => setSubCategoryForm({ ...subCategoryForm, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddSubCategoryOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add Sub-Category
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
