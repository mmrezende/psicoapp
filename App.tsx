import { AuthProvider } from './src/auth/AuthContext';
import Navigator from './src/Navigator';

export default function App() {
  return (
    <AuthProvider>
		<Navigator/>
    </AuthProvider>
  );
}
