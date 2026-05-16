import { useEffect } from "react";
import { useAuthBootstrap } from "./hooks/useAuthBootstrap";
import AppRouter from "./routes/AppRouter";

const App = () => {
  const bootstrapAuth = useAuthBootstrap();

  useEffect(() => {
    void bootstrapAuth();
  }, [bootstrapAuth]);

  return <AppRouter />;
};

export default App;
