export class LocalStorageUtil {
  private static INSTANCE: typeof localStorage | null = null;

  private LocalStorageUtil() {

  }

  public static getInstance() {
    if (this.INSTANCE === null) {
      this.INSTANCE = localStorage;
    }

    return this.INSTANCE;
  }

  public setStorage(key: string, value: unknown) {
    String(value);
  }
}