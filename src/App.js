import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from "react-router-dom";
import { router } from './router/router';

export const App = () => {

  const queryClient = new QueryClient();

  return (
    <Provider store={store}> 
      <QueryClientProvider client={queryClient}>
        <CssBaseline/>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </Provider>
  )
};

