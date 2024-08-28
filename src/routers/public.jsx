import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { lazyImport } from '@/utils/lazy-import';
import PageLoading from '@/components/PageLoading';
import { PublicLayout } from '@/components/PublicLayout';

const { Game } = lazyImport(() => import('@/feature/game'), 'Game');
function App() {
  return (
    <PublicLayout>
      <div>
        <Suspense
          fallback={
            <div className="app-suspense">
              <PageLoading />
            </div>
          }>
          <Outlet />
        </Suspense>
      </div>
    </PublicLayout>
  );
}

export const publicRoutes = () => [
  {
    path: '/',
    element: <App />,
    children: [{ path: '/', element: <Game /> }]
  }
];
