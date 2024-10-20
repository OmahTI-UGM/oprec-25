const ContainerLarge = ({ children, className = "", parentClass = "" }) => {
  return (
    <div
      className={`relative flex w-full justify-center bg-custom-black py-8 ${parentClass}`}
    >
      <div className={`mx-[min(5vw,32px)] w-full ${className}`}>{children}</div>
    </div>
  );
};

export default ContainerLarge;
