export const Footer = () => {
  const currentYear: number = new Date().getFullYear();
  return <footer>&copy;{currentYear} </footer>;
};
