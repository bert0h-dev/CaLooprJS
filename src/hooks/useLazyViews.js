import { createLazyComponent } from '@/utils/lazyComponent';

export const useLazyViews = activeView => {
  switch (activeView) {
    case 'month':
      return createLazyComponent(() =>
        import('@/components/views/viewMonth.jsx').then(module => ({
          default: module.ViewMonth,
        }))
      );
    default:
      return null;
  }
};
