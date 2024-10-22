const Container = ({ children, className = "", parentClass = "" }) => {
  return (
    <div
      className={`relative px-[min(5vw,32px)] flex w-full justify-center bg-custom-black py-8 ${parentClass}`}
    >
      <div className={`w-full ${className}`}>{children}</div>
    </div>
  );
};

export default Container;
