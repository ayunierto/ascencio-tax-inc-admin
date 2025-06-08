import { Loader } from '@/components/Loader';
import { toast } from 'sonner';
import { useService } from '../hooks/useServices';
import { DataTable } from '../components/DataTable';

export const ServicesPage = () => {
  const { columns, queryServices } = useService();

  if (queryServices.isLoading) {
    return <Loader />;
  }

  if (queryServices.isError) {
    return <div>Error loading users</div>;
  }

  if (!queryServices.data) {
    toast.error('No data found', { position: 'top-center' });
    return;
  }

  if (queryServices.data && 'error' in queryServices.data) {
    toast.error(queryServices.data.error, { position: 'top-center' });
    return;
  }

  return (
    <>
      <DataTable data={queryServices.data} columns={columns} />
    </>
  );
};

export default ServicesPage;
