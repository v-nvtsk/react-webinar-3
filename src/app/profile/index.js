import { memo, useCallback, useEffect } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import User from '../../components/user';
import ProfileCard from '../../components/profile-card';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from "react-router-dom";

/**
 * Главная страница - первичная загрузка каталога
 */
function Profile() {

  const navigate = useNavigate()

  const store = useStore();

  const select = useSelector(state => ({
    username: state.auth.username,
    token: state.auth.token,
    user: state.auth.user,
  }));

  useEffect(() => {
    if (!select.token) {
      navigate(`/login?prevPath=${location.pathname}`)
    }
    store.actions.auth.loadProfile();
  }, [select.token])



  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onLogout: useCallback(() => {
      store.actions.auth.logout();
    }, [store])
  }

  const { t } = useTranslate();

  return (
    <PageLayout>
      <User username={select.username} onLogout={callbacks.onLogout} t={t} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard user={select.user} t={t} />
    </PageLayout>
  );
}

export default memo(Profile);
