import { http, passthrough } from 'msw';
import { apiList } from './api';

export const handlers = [
    http.get(/.*\.(ico|ts|tsx|svg|png|scss|css|js|woff|woff2)$/, () => passthrough()),
    ...apiList,
]