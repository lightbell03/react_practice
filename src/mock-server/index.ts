import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const setMockServer = (): Promise<ServiceWorkerRegistration | undefined> => {
    const service = setupWorker(...handlers);
    return service.start();
}