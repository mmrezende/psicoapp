import { AuthProvider } from './src/auth/AuthContext';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import Navigator from './src/Navigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <Navigator/>
        </QueryClientProvider>
      </PaperProvider>
    </AuthProvider>
  );
}