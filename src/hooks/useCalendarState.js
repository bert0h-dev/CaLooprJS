// Hook del reducer para el manejo del estado del calendario
export const useCalendarState = (state, action) => {
  switch (action.type) {
    // Acciones del calendario
    case 'SET_ACTIVE_VIEW':
      return {
        ...state,
        calendar: {
          ...state.calendar,
          activeView: action.payload,
        },
      };

    case 'SET_CURRENT_DATE':
      return {
        ...state,
        currentDate: action.payload,
      };

    case 'SET_VIEW_OPTIONS':
      return {
        ...state,
        calendar: {
          ...state.calendar,
          viewOptions: { ...state.calendar.viewOptions, ...action.payload },
        },
      };

    // Acciones de eventos
    case 'ADD_EVENT':
      return {
        ...state,
        events: {
          ...state.events,
          activeEvents: [...state.events.activeEvents, action.payload],
        },
      };

    case 'REMOVE_EVENT':
      return {
        ...state,
        events: {
          ...state.events,
          activeEvents: state.events.activeEvents.filter(
            event => event.id !== action.payload
          ),
        },
      };

    case 'UPDATE_EVENT':
      return {
        ...state,
        events: {
          ...state.events,
          activeEvents: state.events.activeEvents.map(event =>
            event.id === action.payload.id ? action.payload : event
          ),
        },
      };

    // Acciones del UI
    case 'SET_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: action.payload,
        },
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: [],
        },
      };

    case 'SET_LOADING':
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.payload,
        },
      };

    default:
      return state;
  }
};
