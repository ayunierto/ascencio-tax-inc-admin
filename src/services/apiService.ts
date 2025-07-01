import { httpClient } from '@/adapters/http/httpClient.adapter';
import { handleApiErrors } from '@/auth/utils';

// Definimos una interfaz genérica para las operaciones CRUD
interface ApiService<T, TCreate, TUpdate> {
  getAll: () => Promise<T[] | any>;
  getById: (id: string) => Promise<T | any>;
  create: (data: TCreate) => Promise<T | any>;
  update: (id: string, data: TUpdate) => Promise<T | any>;
  remove: (id: string) => Promise<T | any>;
}

// Creamos una factory function que devuelve un servicio para un endpoint específico
export const createApiService = <T, TCreate, TUpdate>(
  endpoint: string
): ApiService<T, TCreate, TUpdate> => ({
  /**
   * Obtiene todos los registros de un endpoint.
   * @returns Una promesa que se resuelve con un array de registros.
   */
  getAll: async (): Promise<T[] | any> => {
    try {
      return await httpClient.get<T[]>(endpoint);
    } catch (error: any) {
      console.error(`Error fetching all ${endpoint}:`, error);
      return handleApiErrors(error, `getAll${capitalize(endpoint)}`);
    }
  },

  /**
   * Obtiene un registro por su ID.
   * @param id - El ID del registro a obtener.
   * @returns Una promesa que se resuelve con el registro encontrado.
   */
  getById: async (id: string): Promise<T | any> => {
    try {
      return await httpClient.get<T>(`${endpoint}/${id}`);
    } catch (error: any) {
      console.error(`Error fetching ${endpoint} with id ${id}:`, error);
      return handleApiErrors(error, `get${capitalize(endpoint)}ById`);
    }
  },

  /**
   * Crea un nuevo registro.
   * @param data - Los datos para el nuevo registro.
   * @returns Una promesa que se resuelve con el registro creado.
   */
  create: async (data: TCreate): Promise<T | any> => {
    try {
      return await httpClient.post<T>(endpoint, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error: any) {
      console.error(`Error creating ${endpoint}:`, error);
      return handleApiErrors(error, `create${capitalize(endpoint)}`);
    }
  },

  /**
   * Actualiza un registro existente.
   * @param id - El ID del registro a actualizar.
   * @param data - Los datos para actualizar el registro.
   * @returns Una promesa que se resuelve con el registro actualizado.
   */
  update: async (id: string, data: TUpdate): Promise<T | any> => {
    try {
      return await httpClient.patch<T>(`${endpoint}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error: any) {
      console.error(`Error updating ${endpoint} with id ${id}:`, error);
      return handleApiErrors(error, `update${capitalize(endpoint)}`);
    }
  },

  /**
   * Elimina un registro por su ID.
   * @param id - El ID del registro a eliminar.
   * @returns Una promesa que se resuelve con el registro eliminado.
   */
  remove: async (id: string): Promise<T | any> => {
    try {
      return await httpClient.delete<T>(`${endpoint}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      console.error(`Error deleting ${endpoint} with id ${id}:`, error);
      return handleApiErrors(error, `delete${capitalize(endpoint)}`);
    }
  },
});

// Función de utilidad para capitalizar strings
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);