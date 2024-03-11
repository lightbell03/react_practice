class RefreshTokenManager {
  private static INSTANCE: RefreshTokenManager;
  private isPending = false;
  private pendingPromise: Promise<unknown> | null = null;
  private resolved: (() => void) = () => this.pendingPromise = null;

  constructor() {
    if (RefreshTokenManager.INSTANCE) {
      return RefreshTokenManager.INSTANCE;
    }

    RefreshTokenManager.INSTANCE = this;
  }

  public static getInstance() {
    return new RefreshTokenManager();
  }

  public refresh({
    callback,
    updateTokenCallback
  }: {
    callback: () => Promise<unknown>,
    updateTokenCallback: (refreshToken: string) => void
  }) {
    if (this.isPending && this.pendingPromise) {
      return this.pendingPromise;
    }

    this.isPending = true;

    return this.pendingPromise = callback().then((value: any) => {
      updateTokenCallback(value.data.accessToken as string);
      this.isPending = false;
      this.resolved();
    });
  }
}

export const getRefreshTokenManager = () => RefreshTokenManager.getInstance();