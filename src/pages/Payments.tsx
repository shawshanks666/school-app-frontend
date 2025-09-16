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
import { createPayment } from '@/services/api';
import { ChevronLeft } from 'lucide-react';

export default function PaymentPage() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // --- THIS IS THE KEY CHANGE ---
      // We construct the callback URL to point to our dedicated status page.
      // This is dynamic and will work on both localhost and your final deployed site.
      const callbackUrl = `${window.location.origin}/`;
      
      const response = await createPayment(Number(amount), callbackUrl);

      // Redirect the user to the payment gateway
      if (response.payment_url) {
        window.location.href = response.payment_url;
      } else {
        setError('Failed to get payment link. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while creating the payment. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create New Payment</CardTitle>
          <CardDescription>
            Enter the amount to generate a new payment link.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (INR)</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 1500"
                required
                className='mb-5'
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          </CardContent>
          <CardFooter className="flex justify-between ">
            <Button >
              <Link to="/">
                {/* <ChevronLeft className="h-4 w-4 mr-2" /> */}
                Back to Dashboard
              </Link>
            </Button>
            <Button type="submit" disabled={isLoading || !amount}>
              {isLoading ? 'Generating Link...' : 'Proceed to Pay'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}