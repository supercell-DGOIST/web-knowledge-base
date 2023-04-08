import router from '../router';

export const toLogin = (): void => {
  void router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.value.fullPath,
    },
  });
};
