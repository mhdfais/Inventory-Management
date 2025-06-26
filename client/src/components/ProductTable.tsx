import React from "react";
import { Edit, Trash2, Package, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/types/types";

interface ProductTableProps {                                                                                                   
  products: Product[];
  loadingProducts: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onManageStock: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loadingProducts,
  onEdit,
  onDelete,
  onManageStock,
}) => {
  if (loadingProducts) {
    <div className="text-center py-12">
      <Package className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Loading Products
      </h3>
      {/* <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p> */}
    </div>;
  } else if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by adding a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Reorder Level</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id} className="hover:bg-gray-50">
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {product.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {product.sku}
                </code>
              </TableCell>
              <TableCell className="text-center">
                <span className="font-semibold">{product.quantity}</span>
              </TableCell>
              <TableCell className="text-center">
                {product.reorderLevel}
              </TableCell>
              <TableCell className="text-center">
                {product.quantity < product.reorderLevel ? (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Low Stock
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800"
                  >
                    In Stock
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onManageStock(product)}
                    className="h-8 px-2"
                  >
                    <Package className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(product)}
                    className="h-8 px-2"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this product?")
                      ) {
                        onDelete(product._id);
                      }
                    }}
                    className="h-8 px-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
