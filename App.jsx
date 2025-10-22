// --- App.jsx ---
// This file is in /frontend/src/

import AppRouter from './routes/AppRouter.jsx';
import Navbar from './components/common/Navbar.jsx'; // <-- IMPORT THE NAVBAR

function App() {
  return (
    <div className="App">
      <Navbar /> {/* <-- RENDER THE NAVBAR HERE */}
      <main>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;