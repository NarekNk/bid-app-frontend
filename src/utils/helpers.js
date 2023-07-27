export const getFormData = (e) => {
  return Object.fromEntries(new FormData(e.target).entries());
};
