/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpError } from '@/adapters/http/http-client.interface';
import { httpClient } from '@/adapters/http/httpClient.adapter';
import { handleApiErrors } from '@/auth/utils';
import { capitalizeFirstWord } from '@/utils';

// Definimos una interfaz genérica para las operaciones CRUD
interface ApiService<TEntity, TCreate, TUpdate> {
  getAll: () => Promise<TEntity[] | HttpError>;
  getById: (id: string) => Promise<TEntity | HttpError>;
  create: (data: TCreate) => Promise<TEntity | HttpError>;
  update: (id: string, data: TUpdate) => Promise<TEntity | HttpError>;
  remove: (id: string) => Promise<TEntity | HttpError>;
}

// Creamos una factory function que devuelve un servicio para un endpoint específico
export const createApiService = <TEntity, TCreate, TUpdate>(
  endpoint: string
): ApiService<TEntity, TCreate, TUpdate> => ({
  /**
   * Obtiene todos los registros de un endpoint.
   * @returns Una promesa que se resuelve con un array de registros.
   */
  getAll: async (): Promise<TEntity[] | HttpError> => {
    try {
      return await httpClient.get<TEntity[]>(endpoint);
    } catch (error) {
      console.error(`Error fetching all ${endpoint}:`, error);
      return handleApiErrors(error, `getAll${capitalizeFirstWord(endpoint)}`);
    }
  },

  /**
   * Obtiene un registro por su ID.
   * @param id - El ID del registro a obtener.
   * @returns Una promesa que se resuelve con el registro encontrado.
   */
  getById: async (id: string): Promise<TEntity | HttpError> => {
    try {
      return await httpClient.get<TEntity>(`${endpoint}/${id}`);
    } catch (error) {
      console.error(`Error fetching ${endpoint} with id ${id}:`, error);
      return handleApiErrors(error, `get${capitalizeFirstWord(endpoint)}ById`);
    }
  },

  /**
   * Crea un nuevo registro.
   * @param data - Los datos para el nuevo registro.
   * @returns Una promesa que se resuelve con el registro creado.
   */
  create: async (data: TCreate): Promise<TEntity | HttpError> => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const value = (data as any)[key];
          // Añadimos cada campo al formData.
          // FormData puede manejar strings, Files, Blobs, etc.
          formData.append(key, value);
        }
      }
      return await httpClient.post<TEntity>(endpoint, {
        body: formData,
      });
    } catch (error) {
      console.error(`Error creating ${endpoint}:`, error);
      return handleApiErrors(error, `create${capitalizeFirstWord(endpoint)}`);
    }
  },

  /**
   * Actualiza un registro existente.
   * @param id - El ID del registro a actualizar.
   * @param data - Los datos para actualizar el registro.
   * @returns Una promesa que se resuelve con el registro actualizado.
   */
  update: async (id: string, data: TUpdate): Promise<TEntity | HttpError> => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const value = (data as any)[key];
          // Añadimos cada campo al formData.
          // FormData puede manejar strings, Files, Blobs, etc.
          formData.append(key, value);
        }
      }
      return await httpClient.patch<TEntity>(`${endpoint}/${id}`, {
        body: formData,
      });
    } catch (error) {
      console.error(`Error updating ${endpoint} with id ${id}:`, error);
      return handleApiErrors(error, `update${capitalizeFirstWord(endpoint)}`);
    }
  },

  /**
   * Elimina un registro por su ID.
   * @param id - El ID del registro a eliminar.
   * @returns Una promesa que se resuelve con el registro eliminado.
   */
  remove: async (id: string): Promise<TEntity | HttpError> => {
    try {
      return await httpClient.delete<TEntity>(`${endpoint}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(`Error deleting ${endpoint} with id ${id}:`, error);
      return handleApiErrors(error, `delete${capitalizeFirstWord(endpoint)}`);
    }
  },
});
