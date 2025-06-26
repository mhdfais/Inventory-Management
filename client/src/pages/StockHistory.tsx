import StockHistoryTable from "@/components/StockHistoryTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchHistory } from "@/services/userService";
import type { StockChange } from "@/types/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StockHistory = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<StockChange[]>([]);

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      try {
        const res = await fetchHistory();
        console.log(res.data.history)
        setHistory(res.data.history);
      } catch (error) {
        toast.error("failed to load stock history");
      } finally {
        setLoading(false);
      }
    };

    getHistory();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Stock History</h1>
        <p className="text-gray-600">Track all stock movements and changes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Movement History</CardTitle>
          <CardDescription>
            Complete log of all stock additions and reductions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StockHistoryTable stockHistory={history} />
        </CardContent>
      </Card>
    </div>
  );
};

export default StockHistory;
