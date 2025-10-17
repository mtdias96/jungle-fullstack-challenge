import { Toaster } from 'sonner';
import { AuthModal } from './views/pages/auth';

function App() {
  return (
    <>
      <AuthModal open={true} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
