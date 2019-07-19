export const signIn = (name, email, role) => {
  return { type: 'SIGN_IN', payload: { name, email, role } };
};

export const signOut = () => {
  return { type: 'SIGN_OUT' };
};

export const isAuthFunc = () => {
  return { type: 'IS_AUTH' };
};
