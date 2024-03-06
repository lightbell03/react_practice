export abstract class StorageUtil {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  public get<T = unknown>(key: string): null | T {
    const item = this.storage.getItem(key);

    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item) as T;
    } catch (error) {
      return item as T;
    }
  }

  set(key: string, value: unknown) {
    const item = {
      __value__: value,
    };

    this.storage.setItem(key, JSON.stringify(item));
  }
}