import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { checkTransactionStatus } from '@/services/api';

export default function StatusCheckPage() {
  const [transactionId, setTransactionId] = useState('');
  const [statusResult, setStatusResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckStatus = async () => {
    if (!transactionId.trim()) {
      setError('Please enter a Transaction ID.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setStatusResult(null);
    try {
      const result = await checkTransactionStatus(transactionId);
      setStatusResult(`Status: ${result.status.toUpperCase()}`);
    } catch (err) {
      setError('Transaction not found or an error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check Transaction Status</CardTitle>
          <CardDescription>
            Enter the Transaction ID (Collect ID) to check its current status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tx-id">Transaction ID</Label>
            <Input
              id="tx-id"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter ID..."
            />
          </div>
          {statusResult && (
            <p className="pt-2 text-center text-lg font-bold text-green-600">{statusResult}</p>
          )}
          {error && <p className="pt-2 text-center text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/">
              Back to Dashboard
            </Link>
          </Button>
          <Button onClick={handleCheckStatus} disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Check Status'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
