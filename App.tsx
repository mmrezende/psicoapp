import { AuthProvider } from './src/auth/AuthContext';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigator from './src/Navigator';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <Navigator/>
      </PaperProvider>
    </AuthProvider>
  );
}
