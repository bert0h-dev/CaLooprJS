import { h } from 'preact';
import { lazy, Suspense } from 'preact/compat';

// Utilidad para crear componentes con lazy loading
export const createLazyComponent = (
  importFunc,
  loadingComponent = <div>Cargando...</div>
) => {
  const LazyComponent = lazy(importFunc);

  return props => (
    <Suspense fallback={loadingComponent}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
