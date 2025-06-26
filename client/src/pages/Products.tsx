import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import ProductTable from '@/components/ProductTable';
import ProductForm from '@/components/modal/ProductForm';
import StockModal from '@/components/modal/StockModal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Product } from '@/types/types';
import toast from 'react-hot-toast';
import {
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
  changeStock,
} from '@/services/userService';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await getProducts();
      setProducts(res.data.products);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (productData: Omit<Product, '_id' | 'createdAt'>) => {
    try {
      await createProduct(productData);
      fetchProducts()
      toast.success('Product added');
      setIsProductFormOpen(false);
    } catch(err) {
      console.log(err)
      toast.error('Failed to add product');
    }
  };

  const handleEditProduct = async (productData: Omit<Product, '_id' | 'createdAt'>) => {
    if (!editingProduct) return;

    try {
      await editProduct(editingProduct._id, productData);
     fetchProducts()
      toast.success('Product updated');
      setEditingProduct(null);
      setIsProductFormOpen(false);
    } catch {
      toast.error('Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      fetchProducts()
      toast.success('Product deleted');
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const handleStockChange = async (
    productId: string,
    action: 'add' | 'reduce',
    quantity: number,
    remarks?: string
  ) => {
    try {
      await changeStock(productId, action, quantity, remarks??'');
     fetchProducts()
      toast.success('Stock updated');
      setIsStockModalOpen(false);
      setSelectedProduct(null);
    } catch {
      toast.error('Failed to update stock');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button
          onClick={() => setIsProductFormOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            Manage your products and track stock levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable
            products={products}
            loadingProducts={loadingProducts}
            onEdit={(product) => {
              setEditingProduct(product);
              setIsProductFormOpen(true);
            }}
            onDelete={handleDeleteProduct}
            onManageStock={(product) => {
              setSelectedProduct(product);
              setIsStockModalOpen(true);
            }}
          />
        </CardContent>
      </Card>

      <ProductForm
        isOpen={isProductFormOpen}
        onClose={() => {
          setIsProductFormOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        product={editingProduct}
      />

      <StockModal
        isOpen={isStockModalOpen}
        onClose={() => {
          setIsStockModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onStockChange={handleStockChange}
      />
    </div>
  );
};

export default Products;
