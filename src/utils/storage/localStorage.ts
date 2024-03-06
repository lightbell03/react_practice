import { StorageUtil } from "./abstractStorageUtil";

class LocalStorageUtil extends StorageUtil {
  private static INSTANCE: LocalStorageUtil;

  private constructor() {
    super(localStorage);

    if (LocalStorageUtil.INSTANCE) {
      return LocalStorageUtil.INSTANCE;
    }

    LocalStorageUtil.INSTANCE = this;
  }

  public static getInstance() {
    return new LocalStorageUtil();
  }
}

export const getLocalStorage = () => LocalStorageUtil.getInstance();