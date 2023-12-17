import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import User from '../../components/user';
import ProfileCard from '../../components/profile-card';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';

/**
 * Главная страница - первичная загрузка каталога
 */
function Profile() {
  const store = useStore();
  const select = useSelector(state => ({
    username: state.auth.username,
    userdata: state.profile.data,
    waiting: state.profile.waiting
  }));

  const callbacks = {
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
      <Spinner active={select.waiting}>
        <ProfileCard user={select.userdata} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
