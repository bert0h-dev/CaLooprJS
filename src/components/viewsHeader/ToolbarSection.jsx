import { h } from 'preact';
import { useCalendarViewContext } from '@/context/CalendarViewContext.jsx';
import { ToolbarOptions } from '@/utils/toolbarOptions.js';

export const ToolbarSection = ({ section }) => {
  // Se guardan los componentes que se configuren
  let children = [];

  // Se accede al contexto del calendario
  const { currentDate, calendar, dateController, actions, localization } =
    useCalendarViewContext();

  // Formateo de la session de view
  let formattedConfig = calendar.viewFormats[calendar.activeView] || {
    month: 'long',
  };
  const formateador = new Intl.DateTimeFormat(
    localization.locale,
    formattedConfig
  );
  const formattedDate = formateador.format(currentDate);

  // Se crea handle de actions
  const handleGoToAction = action => {
    switch (action) {
      case 'today':
        dateController.goToToday();
        break;
      case 'month':
        actions.view.showMonthView();
        break;
    }
  };

  // Se recorre los elementos configurados en cada sección
  section.forEach(element => {
    let { action } = element;
    if (action !== '') {
      if (action === 'title') {
        children.push(
          <div className='section-title m-0 flex items-center gap-3'>{`${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}`}</div>
        );
      } else {
        // Se obtiene la configuración de los botones que se pueden configurar
        let { buttonClick, buttonTitle, buttonClass, buttonText } =
          ToolbarOptions[action] || {};

        // Se crea las clases por default del boton y las clases adicionales del boton
        let buttonClasses = ['btn', 'is-primary', buttonClass];

        //Se valida si el boton es de view para agregar la clase de active si es la vista actual
        if (buttonClick === calendar.activeView) {
          buttonClasses.push('is-active');
        }

        // Se agrega el boton en el children
        children.push(
          <button
            type='button'
            key={buttonClick}
            title={buttonTitle}
            aria-label={buttonTitle}
            className={buttonClasses.join(' ')}
            onClick={() => handleGoToAction(buttonClick)}
          >
            {buttonText || ''}
          </button>
        );
      }
    }
  });

  return <div className='flex items-center gap-2'>{children}</div>;
};
