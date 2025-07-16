import { ConfigProvider } from "antd";
import React from "react";
import RouterProvider from "./routes";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

const App: React.FC = () => (
  <div className="font-poppins">
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#027BFFCC",
          colorPrimaryHover: "#025ABF",
          borderRadius: 8, // Set global border-radius to 8px

          // Alias Token
          colorBgContainer: "#ffff",
          fontFamily: "Poppins, serif",
        },

        components: {
          Button: {
            borderRadius: 8, // Apply 8px border-radius to all buttons
            colorBorder: "#027BFFCC", // Default button outline color
            colorPrimaryBorder: "#027BFFCC", // Primary button border color
            defaultBorderColor: "#027BFFCC", // Outline for default buttons
          },
        },
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Toaster position="top-right" />
            <RouterProvider />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </div>
);

export default App;
