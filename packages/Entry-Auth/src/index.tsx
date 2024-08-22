import {
  CustomToastContainer,
  StyledProvider,
} from '@team-entry/design_system';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { App } from './App';
import { ModalProvider } from './context/modal';
import { TokenProvider } from './context/token';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container as Element);

root.render(
  <QueryClientProvider client={queryClient}>
    <StyledProvider>
      <CookiesProvider>
        <TokenProvider>
          <ModalProvider>
            <App />
            <CustomToastContainer />
          </ModalProvider>
        </TokenProvider>
      </CookiesProvider>
    </StyledProvider>
  </QueryClientProvider>,
);
