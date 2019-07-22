export const signIn = (name, email, role) => {
  return { type: 'SIGN_IN', payload: { name, email, role } };
};

export const signOut = () => {
  return { type: 'SIGN_OUT' };
};

export const isAuthFunc = boolean => {
  return { type: 'IS_AUTH', payload: { boolean } };
};

export const initOrder = () => {
  return { type: 'INIT_ORDER' };
};
