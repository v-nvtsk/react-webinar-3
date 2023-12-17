import { Outlet } from 'react-router-dom';
import { memo,  useEffect } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import { useNavigate } from "react-router-dom";


function AuthProvider() {
  const navigate = useNavigate()

  const store = useStore();

  const select = useSelector(state => ({
    token: state.auth.token,
    userId: state.auth._id,
    waitingAuth: state.auth.waiting,
    waiting: state.profile.waiting
  }));

  useEffect(() => {
    if (!select.token && !select.waitingAuth) {
      navigate(`/login?prevPath=${location.pathname}`)
    }
    store.actions.profile.load(select.userId, select.token);
  }, [select.userId, select.token, select.waitingAuth])

  return (
    <><Outlet /></>
  )
}

export default memo(AuthProvider);