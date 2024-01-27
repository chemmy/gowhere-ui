import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import LocationTrafficAndWeather from "@containers/LocationTrafficAndWeather/LocationTrafficAndWeather";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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
