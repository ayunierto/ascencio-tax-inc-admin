import { HttpError } from '@/adapters/http/http-client.interface';
import { httpClient } from '@/adapters/http/httpClient.adapter';
import { capitalizeFirstWord } from '@/utils';
import { handleApiErrors } from '@/utils/apiErrorHandlers';

interface ApiService<TEntity, TCreate, TUpdate> {
  getAll: () => Promise<TEntity[] | HttpError>;
  getById: (id: string) => Promise<TEntity | HttpError>;
  create: (data: TCreate) => Promise<TEntity | HttpError>;
  update: (id: string, data: TUpdate) => Promise<TEntity | HttpError>;
  remove: (id: string) => Promise<TEntity | HttpError>;
}

/**
 * Creates a generic API service for performing CRUD operations on a specified endpoint.
 *
 * @template TEntity - The type representing the entity managed by the service.
 * @template TCreate - The type representing the data required to create a new entity.
 * @template TUpdate - The type representing the data required to update an existing entity.
 *
 * @param endpoint - The API endpoint for the resource.
 * @returns An object implementing the ApiService interface, providing methods for fetching, creating, updating, and deleting entities.
 */
export const createApiService = <TEntity, TCreate, TUpdate>(
  endpoint: string
): ApiService<TEntity, TCreate, TUpdate> => ({
  /**
   * Get all the records of an Endpoint.
   * @returns A promise that is resolved with an array of records.
   */
  getAll: async () => {
    try {
      return await httpClient.get<TEntity[]>(endpoint);
    } catch (error) {
      console.error(`Error fetching all ${endpoint}:`, error);
      return handleApiErrors(error, `getAll${capitalizeFirstWord(endpoint)}`);
    }
  },

  /**
   * Get a record for your id.
   * @param id -The ID of the Registry to be obtained.
   * @returns A promise that is resolved with the record found.
   */
  getById: async (id: string) => {
    try {
      return await httpClient.get<TEntity>(`${endpoint}/${id}`);
    } catch (error) {
      console.error(`Error fetching ${endpoint} with id ${id}:`, error);
      return handleApiErrors(error, `get${capitalizeFirstWord(endpoint)}ById`);
    }
  },

  /**
   * Create a new record.
   * @param data -The data for the new record.
   * @returns A promise that is resolved with the created record.
   */
  create: async (data: TCreate) => {
    try {
      return await httpClient.post<TEntity>(endpoint, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(`Error creating ${endpoint}:`, error);
      return handleApiErrors(error, `create${capitalizeFirstWord(endpoint)}`);
    }
  },

  /**
   * Update an existing record.
   * @param id -The ID of the Registry to be updated.
   * @param data -The data to update the registration.
   * @returns A promise that is resolved with the updated record.
   */
  update: async (id: string, data: TUpdate) => {
    try {
      return await httpClient.patch<TEntity>(`${endpoint}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(`Error updating ${endpoint} with id ${id}:`, error);
      return handleApiErrors(error, `update${capitalizeFirstWord(endpoint)}`);
    }
  },

  /**
   * Eliminate a record for your id.
   * @param id -The ID of the Registry to be deleted.
   * @returns A promise that is resolved with the record deleted.
   */
  remove: async (id: string) => {
    try {
      return await httpClient.delete<TEntity>(`${endpoint}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(`Error deleting ${endpoint} with id: ${id}:`, error);
      return handleApiErrors(error, `delete${capitalizeFirstWord(endpoint)}`);
    }
  },
});
