class RetryManager {

  private static INSTANCE: RetryManager;
  private urlMap: Map<string, number> = new Map();

  private constructor() {
    if (RetryManager.INSTANCE) {
      return RetryManager.INSTANCE;
    }

    RetryManager.INSTANCE = this;
  }

  public static getInstance() {
    return new RetryManager();
  }

  public reset() {
    this.urlMap.clear();
  }

  public retry(url: string) {
    const nextCount = (this.urlMap.get(url) ?? 0) + 1;
    this.urlMap.set(url, nextCount);
  }

  public isRetryable(url: string): boolean {
    return (this.urlMap.get(url) ?? 0) < 4;
  }
}

export const getRetryManager = () => RetryManager.getInstance();