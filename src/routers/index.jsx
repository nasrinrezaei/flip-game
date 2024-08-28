import { publicRoutes } from './public';
import { useRoutes } from 'react-router-dom';

export function AppRoutes() {
  const element = useRoutes([...publicRoutes()]);

  return <>{element}</>;
}
