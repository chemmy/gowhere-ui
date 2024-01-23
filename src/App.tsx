import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import LocationTrafficAndWeather from "./containers/LocationTrafficAndWeather";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <LocationTrafficAndWeather />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
