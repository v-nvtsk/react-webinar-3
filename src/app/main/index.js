import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import User from '../../components/user';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from "react-router-dom";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const navigate = useNavigate();

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const select = useSelector(state => ({
    token: state.auth.token,
    username: state.auth.username
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.auth.logout();
    }, [store]),
    onLoginNavigate: useCallback(() => {
      navigate(`/login?prevPath=/`);
    })
  }

  const { t } = useTranslate();

  return (
    <PageLayout>
      <User username={select.username} onLoginNavigate={callbacks.onLoginNavigate} onLogout={callbacks.onLogout} t={t} />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
