// Configuración de la aplicación
export const appConfig = {
  // Configuracion del calendario
  calendar: {
    activeView: 'month',
    weekendsVisible: true,
    showWeekNumbers: false,
    viewToolbar: {
      start: [
        { action: 'prevMonth' },
        { action: 'today' },
        { action: 'nextMonth' },
      ],
      center: [{ action: 'title' }],
      end: [{ action: 'month' }],
    },
    viewFormats: {
      month: { month: 'long', year: 'numeric' },
    },
  },

  // Configuracion de localizacion
  localization: {
    locale: 'es-MX',
    timeZone: 'America/Tijuana',
    firstDayOfWeek: 0,
    timeFormat: '24h',
    dateFormat: 'DD/MM/YYYY',
  },

  // Configuración de los eventos
  events: {
    activeEvents: [],
  },

  // Configuración de la interfaz
  ui: {
    theme: 'light',
    language: 'es',
    isLoading: false,
    errors: [],
  },
};
