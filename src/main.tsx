
import { hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Client-side rendering with hydration
hydrateRoot(document.getElementById("root")!, <App />);
