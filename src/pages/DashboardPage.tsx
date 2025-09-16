import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TransactionsTable from '@/components/ui/TransactionsTable';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Transactions Overview
          </h1>
          <Button asChild>
            <Link to="/status-check">Check Transaction Status</Link>
          </Button>
        </div>
        <TransactionsTable />
      </div>
    </main>
  );
}

