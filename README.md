# CaLooprJS

> Un motor de calendario ligero y extensible construido con Preact para renderizar vistas y eventos de forma dinámica.

## 🚀 Características

- **Ligero**: Construido con Preact (~3KB)
- **Modular**: Arquitectura basada en hooks y contexto
- **Extensible**: Vistas dinámicas y eventos personalizables
- **Performante**: Memoización optimizada y lazy loading
- **Themeable**: Sistema de temas dark/light incluido

## 📦 Instalación

```bash
npm install calooprjs
```

## 🎯 Uso Básico

```jsx
import { h, render } from 'preact';
import { CalendarApp } from 'calooprjs';

const App = () => (
  <CalendarApp
    initialConfig={{
      calendar: { activeView: 'month' },
      localization: { locale: 'es-MX' },
    }}
  />
);

render(<App />, document.getElementById('app'));
```

## 🏗️ Arquitectura

### Hooks Principales

- `useCalendarState` - Manejo de estado global del calendario
- `useCalendarDate` - Controlador de fechas y navegación
- `useCalendarActions` - Acciones centralizadas (eventos, vistas, UI)
- `useLazyViews` - Carga dinámica de componentes de vista

### Contexto

- `CalendarViewContext` - Provider global con estado memoizado y acciones optimizadas

### Vistas Disponibles

- **Month View**: Vista mensual completa
- **Week View**: Vista semanal (próximamente)
- **Day View**: Vista diaria (próximamente)

## 🎨 Theming

```css
/* Variables CSS personalizables */
:root {
  --calendar-primary: #007bff;
  --calendar-background: #ffffff;
  --calendar-text: #333333;
}

/* Temas incluidos */
[data-theme='dark'] {
  /* ... */
}
[data-theme='light'] {
  /* ... */
}
```

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Limpiar dist
npm run clean
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes UI
│   ├── common/         # Componentes base
│   ├── views/          # Vistas del calendario
│   └── viewsMonth/     # Componentes específicos de vista mensual
├── context/            # Context providers
├── hooks/              # Custom hooks
├── loopr/              # Utilidades del motor del calendario
│   ├── common/         # Días, meses, semanas
│   ├── helpers/        # Constructores de fechas
│   └── utils/          # Utilidades de fecha e intervalo
├── css/                # Estilos modulares
└── utils/              # Configuración y helpers
```

## 🔧 API

### CalendarApp Props

```jsx
<CalendarApp
  initialConfig={{
    calendar: {
      activeView: 'month', // 'month' | 'week' | 'day'
      weekStartsVisible: true,
      showWeekNumbers: false,
    },
    localization: {
      locale: 'es-MX', // Locale del calendario
      timezone: 'America/Tijuana', // Zona horaria
      firstDayOfWeek: 0, // 0 = Domingo, 1 = Lunes
    },
    events: {
      activeEvents: [], // Array de eventos
    },
    ui: {
      theme: 'light', // 'light' | 'dark'
      isLoading: false,
    },
  }}
/>
```

### Hook useCalendarViewContext

```jsx
const {
  calendar, // Estado del calendario
  currentDate, // Fecha actual
  dateController, // Navegación de fechas
  events, // Estado de eventos
  ui, // Estado de UI
  actions, // Acciones disponibles
} = useCalendarViewContext();
```

## 📄 Licencia

ISC © [Bert0h-dev](https://github.com/bert0h-dev)

---

**Repositorio**: [github.com/bert0h-dev/CaLooprJS](https://github.com/bert0h-dev/CaLooprJS)
