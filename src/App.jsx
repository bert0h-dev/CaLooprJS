import { h } from 'preact';
import { CalendarApp } from '@/components/common/CalendarApp.jsx';

/**
 * @name App
 * @summary
 * Componente principal.
 *
 * @return {JSX.Element} Componente principal.
 */
export const App = () => {
  return (
    <div className='app'>
      <CalendarApp />
    </div>
  );
};
