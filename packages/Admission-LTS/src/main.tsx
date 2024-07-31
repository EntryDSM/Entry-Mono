import ReactDOM from 'react-dom/client';
import { Global } from '@emotion/react';
import { CustomToastContainer, StyledProvider } from '@entrydsm/design-system';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyle } from './style/globalstyle.style.ts';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 5000,
      retry: 2,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <StyledProvider>
      <QueryClientProvider client={queryClient}>
        <Global styles={GlobalStyle} />
        <App />
        <CustomToastContainer />
      </QueryClientProvider>
    </StyledProvider>
  </>,
);
