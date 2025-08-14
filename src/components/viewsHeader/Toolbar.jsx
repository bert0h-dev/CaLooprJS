import { h, render } from 'preact';
import { useCalendarViewContext } from '@/context/CalendarViewContext.jsx';
import { ToolbarSection } from '@/components/viewsHeader/ToolbarSection.jsx';

export const ToolBar = () => {
  // Se obtiene del contexto el calendario
  const { calendar } = useCalendarViewContext();

  // Se toma la configuracion del viewToolbar
  let startContent = calendar.viewToolbar.start;
  let centerContent = calendar.viewToolbar.center;
  let endContent = calendar.viewToolbar.end;

  // Funcion para renderizar cada uno de las secciones del toolbar
  const renderToolbarSection = (key, section) => {
    return <ToolbarSection key={key} section={section} />;
  };

  return (
    <div className='toolbar flex items-center justify-between gap-4 py-4 flex-wrap mb-0'>
      {renderToolbarSection('start', startContent || [])}
      {renderToolbarSection('center', centerContent || [])}
      {renderToolbarSection('end', endContent || [])}
    </div>
  );
};
