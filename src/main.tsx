
import { hydrateRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

// Wait for DOM to be fully loaded before hydration
const root = document.getElementById("root");
if (root) {
  hydrateRoot(root, <App />);
}
