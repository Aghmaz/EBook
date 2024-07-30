// Importing necessary modules
import "./main.css";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import routes from "./router";
import { ConfigProvider } from "antd";
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistor, store } from "./store/store";
import { ToggleProvider } from "./context/provider";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { getUserId } from "./constants";
import Page404 from "./pages/no-data-found";
import { SideBar } from "./components/SideBar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
      retry: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ToggleProvider>
            <ConfigProvider
              theme={{ token: { fontFamily: "'Roboto', 'sans-serif'" } }}
            >
              <AppRoutes />
            </ConfigProvider>
          </ToggleProvider>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

const AppRoutes = () => {
  const getRoutes = (route) => {
    if (route.isPublic) {
      return <ProtectedRoute component={route.pages} isPublic />;
    }

    return <ProtectedRoute component={route.pages} />;
  };
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={getRoutes(route)}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
