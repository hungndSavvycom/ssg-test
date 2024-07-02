import { lazy, Suspense, ComponentProps } from 'react';

export function loadable(importComponent: () => Promise<any>) {
  const LazyComponent = lazy(importComponent);
  return (props: ComponentProps<any>): JSX.Element => {
    return (
      <Suspense>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
