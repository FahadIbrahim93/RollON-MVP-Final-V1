import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    Save,
    X,
    Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProducts, useCategories } from '@/hooks';
import type { Product, Category } from '@/types';
import { toast } from 'sonner';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export function AdminProducts() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Form state for add/edit
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
    });

    const { data: products = [] } = useProducts();
    const { data: categories = [] } = useCategories();

    // Filter products
    const filteredProducts = products.filter((product: Product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleAdd = () => {
        setFormData({ name: '', description: '', price: 0, category: '', stock: 0 });
        setIsAddDialogOpen(true);
    };

    const handleEdit = (product: Product) => {
        setFormData(product);
        setIsAddDialogOpen(true);
    };

    const handleDelete = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        toast.success(`Product "${selectedProduct?.name}" deleted successfully`);
        setIsDeleteDialogOpen(false);
    };

    const saveProduct = () => {
        toast.success('Product saved successfully');
        setIsAddDialogOpen(false);
    };

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { label: 'Out of Stock', className: 'bg-red-500/20 text-red-500' };
        if (stock <= 5) return { label: 'Low Stock', className: 'bg-yellow-500/20 text-yellow-500' };
        return { label: 'In Stock', className: 'bg-green-500/20 text-green-500' };
    };

    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            <AdminSidebar />

            <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/admin">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <h1 className="text-xl font-semibold">Products</h1>
                        </div>
                        <Button onClick={handleAdd} className="bg-gradient-to-r from-orange-500 to-orange-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </Button>
                    </div>
                </header>

                {/* Content */}
                <div className="p-6">
                    {/* Filters */}
                    <Card className="mb-6">
                        <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-2 bg-background border border-border rounded-lg text-sm"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map((cat: Category) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Products Table */}
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="w-10"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedProducts.map((product: Product) => {
                                        const stockStatus = getStockStatus(product.stock);
                                        return (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-10 h-10 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-medium">{product.name}</p>
                                                            <p className="text-xs text-muted-foreground">{product.slug}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{product.category}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <span className="font-medium">৳{(product.salePrice || product.price).toLocaleString()}</span>
                                                        {product.salePrice && (
                                                            <span className="text-xs text-muted-foreground line-through ml-2">
                                                                ৳{product.price.toLocaleString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{product.stock}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className={stockStatus.className}>
                                                        {stockStatus.label}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => handleEdit(product)}>
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleDelete(product)}>
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6 text-sm">
                        <p className="text-muted-foreground hidden sm:block">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Product Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label>Product Name</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter product name"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Enter product description"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Price (৳)</Label>
                                <Input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <Label>Stock</Label>
                                <Input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Category</Label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                            >
                                <option value="">Select category</option>
                                {categories.map((cat: Category) => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Label>Product Image</Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/50">
                                <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                        <Button onClick={() => saveProduct()} className="bg-gradient-to-r from-orange-500 to-orange-600">
                            <Save className="h-4 w-4 mr-2" />
                            Save Product
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">
                        Are you sure you want to delete &quot;{selectedProduct?.name}&quot;? This action cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
