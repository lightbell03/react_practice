import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { setMockServer } from './mock-server';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './utils/index';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers';
import { RecoilRoot } from 'recoil';

const boot = async () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  // if (process.env.NODE_ENV === "development") {
  //   await setMockServer();
  // }

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Suspense fallback={"...loading"}>
            <RouterProvider router={router} />
          </Suspense>
        </RecoilRoot>
      </QueryClientProvider>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

boot();