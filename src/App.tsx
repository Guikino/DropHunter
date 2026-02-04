
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/home';
import { ThemeProvider } from './components/ThemeProvider';


const queryClient = new QueryClient()


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='theme' >
      <Home/>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
