import React, { useState } from 'react';
import { Plus, Minus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Product } from '@/types/types';

interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onStockChange: (productId: string, action: 'add' | 'reduce', quantity: number, remarks?: string) => void;
}

const StockModal: React.FC<StockModalProps> = ({
  isOpen,
  onClose,
  product,
  onStockChange,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [remarks, setRemarks] = useState('');
  const [activeTab, setActiveTab] = useState('add');

  const handleSubmit = (action: 'add' | 'reduce') => {
    if (!product || quantity <= 0) return;
    
    onStockChange(product._id, action, quantity, remarks || undefined);
    setQuantity(1);
    setRemarks('');
    setActiveTab('add');
  };

  const handleClose = () => {
    setQuantity(1);
    setRemarks('');
    setActiveTab('add');
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Manage Stock - {product.name}
          </DialogTitle>
          <DialogDescription>
            Current stock: <span className="font-semibold">{product.quantity}</span> units
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Stock
            </TabsTrigger>
            <TabsTrigger value="reduce" className="flex items-center gap-2">
              <Minus className="h-4 w-4" />
              Reduce Stock
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-quantity">Quantity to Add</Label>
              <Input
                id="add-quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                placeholder="Enter quantity"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-remarks">Remarks (Optional)</Label>
              <Textarea
                id="add-remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g., New shipment received"
                rows={2}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={() => handleSubmit('add')}
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={quantity <= 0}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Stock
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reduce" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reduce-quantity">Quantity to Reduce</Label>
              <Input
                id="reduce-quantity"
                type="number"
                min="1"
                max={product.quantity}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                placeholder="Enter quantity"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reduce-remarks">Remarks (Optional)</Label>
              <Textarea
                id="reduce-remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g., Sold to customer, Damaged goods"
                rows={2}
              />
            </div>

            <div className="bg-red-50 p-3 rounded-lg">
              {(product.quantity - quantity) < product.reorderLevel && (
                <p className="text-sm text-red-600 mt-1 font-medium">
                  ⚠ This will trigger low stock alert
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={() => handleSubmit('reduce')}
                variant="destructive"
                disabled={quantity <= 0 || quantity > product.quantity}
              >
                <Minus className="h-4 w-4 mr-2" />
                Reduce Stock
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StockModal;