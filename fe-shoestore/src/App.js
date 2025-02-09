import AllRoute from "./components/AllRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AllRoute />
    </AuthProvider>
  );
}

export default App;
