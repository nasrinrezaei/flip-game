import { AppRoutes } from '@/routers';
import '@/assets/styles/global/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
export default App;
