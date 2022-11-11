const scrollTo = (id, isSmooth) => {
  document.querySelector(id).scrollIntoView(
    isSmooth
      ? {
          behavior: "smooth",
        }
      : {}
  );
};

export { scrollTo };
