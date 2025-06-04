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
}

export const storageAdapter = new StorageAdapter();
