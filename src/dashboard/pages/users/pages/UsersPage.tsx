import { toast } from 'sonner';
import { Loader } from '@/components/Loader';
import { useUsers } from '../hooks/useUsers';
import { DataTable } from '@/components/DataTable/DataTable';

export const UsersPage = () => {
  const { columns, queryUsers } = useUsers();

  if (queryUsers.isLoading) {
    return <Loader />;
  }

  if (queryUsers.isError) {
    return <div>Error loading users</div>;
  }

  if (!queryUsers.data) {
    toast.error('No data found', { position: 'top-center' });
    return;
  }

  if (queryUsers.data && 'error' in queryUsers.data) {
    toast.error(queryUsers.data.error, { position: 'top-center' });
    return;
  }

  return (
    <>
      <DataTable data={queryUsers.data} columns={columns} />
    </>
  );
};

export default UsersPage;
