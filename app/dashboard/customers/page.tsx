import { fetchCustomersPages, fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import Pagination from '@/app/ui/invoices/pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query = '', page = '1' } = await searchParams;

  const currentPage = Number(page);

  const customers = await fetchFilteredCustomers(query, currentPage);
  const totalPages = await fetchCustomersPages(query);

  return (
    <main>
      <CustomersTable customers={customers} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}