import ReactDOM from 'react-dom/client';
import App from './App';
import { CustomToastContainer, StyledProvider } from '@entrydsm/design-system';
import { GlobalStyle } from './style/globalStyle.style';
import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 5000,
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
