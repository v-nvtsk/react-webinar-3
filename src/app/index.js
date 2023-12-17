import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';
import AuthProvider from '../containers/auth-provider';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore();
  useEffect(() => {
    store.actions.auth.restoreSession()
  })

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login />} />
        <Route element={<AuthProvider />}>
          <Route path={'/profile'} element={<Profile />} />
        </Route>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
