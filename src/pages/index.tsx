import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { ProductsPage } from './products';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route index element={<ProductsPage />} />,
  ),
);
