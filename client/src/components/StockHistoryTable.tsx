import React from 'react';
import { TrendingUp, TrendingDown, Calendar, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { StockChange } from '@/types/types';

interface StockHistoryProps {
  stockHistory?: StockChange[];
}

const StockHistoryTable: React.FC<StockHistoryProps> = ({ stockHistory }) => {
  if (!stockHistory ||stockHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No stock movements</h3>
        <p className="mt-1 text-sm text-gray-500">Stock changes will appear here when you add or reduce inventory.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="text-center">Action</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockHistory.map((change) => (
            <TableRow key={change.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="text-sm">
                  {formatDate(change.date)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{change.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge 
                  variant={change.action === 'add' ? 'secondary' : 'destructive'}
                  className={change.action === 'add' 
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100' 
                    : ''
                  }
                >
                  {change.action === 'add' ? (
                    <>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Stock Added
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-3 w-3 mr-1" />
                      Stock Reduced
                    </>
                  )}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <span className={`font-semibold ${
                  change.action === 'add' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {change.action === 'add' ? '+' : '-'}{change.quantity}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {change.remarks || '—'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockHistoryTable;