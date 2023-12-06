import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  const store = useStore();

  const router = createBrowserRouter([
    {
      path: "/page/:page",
      element: <Main />,
      loader: ({ params }) => {
        return {
          page: params.page || 1
        }
      }
    },
    {
      path: "/",
      Component: Main,
      loader: ({ params }) => {
        return {
          page: 1
        }
      }
    },

  ]);
  return (
    <>
      <RouterProvider router={router} />
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
