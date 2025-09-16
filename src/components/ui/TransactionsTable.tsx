import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTransactions } from '@/services/api';
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface Transaction {
  collect_id: string;
  school_id: string;
  gateway: string;
  order_amount: number;
  transaction_amount: number;
  status: string;
  custom_order_id: string;
  createdAt: string;
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [schoolIdFilter, setSchoolIdFilter] = useState(searchParams.get('schoolId') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((searchParams.get('order') as 'asc' | 'desc') || 'desc');

  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const params: { [key: string]: string } = {
      page: page.toString(),
      status: statusFilter,
      sortBy,
      order: sortOrder,
      schoolId: schoolIdFilter,
    };
    
    if (page === 1) delete params.page;
    if (statusFilter === 'all') delete params.status;
    if (schoolIdFilter === '') delete params.schoolId;
    if (sortBy === 'createdAt') delete params.sortBy;
    if (sortOrder === 'desc') delete params.order;

    setSearchParams(params, { replace: true });

    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const filterStatus = statusFilter === 'all' ? undefined : statusFilter;
        const filterSchoolId = schoolIdFilter === '' ? undefined : schoolIdFilter;
        const response = await getTransactions({
          page,
          status: filterStatus,
          schoolId: filterSchoolId,
          sortBy,
          order: sortOrder,
        });
        setTransactions(response.data);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
        setError(null);
      } catch (err) {
        setError('Failed to fetch transactions.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [page, statusFilter, schoolIdFilter, sortBy, sortOrder, setSearchParams]);

  const handleSort = (column: string) => {
    const newSortOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(column);
    setSortOrder(newSortOrder);
    setPage(1);
  };

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };
  
  const handleSchoolIdSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSchoolIdFilter(event.currentTarget.value);
      setPage(1);
    }
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="text-white flex flex-col sm:flex-row items-center gap-4">
        <Select value={statusFilter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="INITIATED">Initiated</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative w-full sm:w-auto">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
           <Input
            type="text"
            placeholder="Search by School ID and press Enter..."
            defaultValue={schoolIdFilter}
            onKeyDown={handleSchoolIdSearch}
            className="pl-10 w-full sm:w-[300px]"
          />
        </div>
      </div>

      <div className="flex-grow bg-white rounded-lg border shadow-sm overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" className="text-white hover:text-gray-300" onClick={() => handleSort('createdAt')}>
                  Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[200px]">Collect ID</TableHead>
              <TableHead>Custom Order ID</TableHead>
              <TableHead>School ID</TableHead>
              <TableHead>Gateway</TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="text-white hover:text-gray-300" onClick={() => handleSort('order_amount')}>
                  Order Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="text-white hover:text-gray-300" onClick={() => handleSort('transaction_amount')}>
                  Transaction Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24">Loading transactions...</TableCell>
              </TableRow>
            ) : transactions.length > 0 ? (
              transactions.map((tx) => (
                <TableRow
                  key={tx.collect_id}
                  className="transition-all duration-200 hover:bg-gray-100/50 hover:scale-[1.01]"
                >
                  <TableCell>{new Date(tx.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{tx.collect_id}</TableCell>
                  <TableCell>{tx.custom_order_id}</TableCell>
                  <TableCell>{tx.school_id}</TableCell>
                  <TableCell>{tx.gateway}</TableCell>
                  <TableCell className="text-right">₹{tx.order_amount?.toFixed(2)}</TableCell>
                  <TableCell className="text-right">₹{tx.transaction_amount?.toFixed(2) || 'N/A'}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                        tx.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : tx.status === 'pending' || tx.status === 'INITIATED'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tx.status.toLowerCase()}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24">No transactions found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="text-sm text-gray-500">
          Showing page {page} of {totalPages} ({totalCount} total transactions)
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handlePreviousPage} disabled={page <= 1} className="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button size="sm" onClick={handleNextPage} disabled={page >= totalPages} className="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

