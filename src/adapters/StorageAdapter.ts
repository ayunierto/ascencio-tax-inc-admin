class StorageAdapter {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public setItem(key: string, value: string) {
    try {
      this.storage.setItem(key, value);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public getItem(key: string) {
    try {
      return this.storage.getItem(key);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public updateItem(key: string, value: string) {
    try {
      this.storage.setItem(key, value);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public removeItem(key: string) {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async setAccessToken(token: string) {
    return this.setItem('access_token', token);
  }
  public async getAccessToken() {
    return this.getItem('access_token');
  }
  public async removeAccessToken() {
    return this.removeItem('access_token');
  }
  public async updateAccessToken(token: string) {
    return this.setItem('access_token', token);
  }
}

export const storageAdapter = new StorageAdapter();
