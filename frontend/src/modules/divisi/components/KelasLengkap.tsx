const KelasLengkap = ({ variant = "omahti" }: { variant?: string }) => {
  let divisi =
    variant === "omahti" ? (
      <span className="text-custom-orange">OmahTI</span>
    ) : (
      <span className="text-custom-lavender">Himakom</span>
    );
  return (
    <div className="w-full rounded-lg bg-custom-gray-dark p-3">
      <h1 className="text-lg space-x-4 font-semibold">
        Divisi {divisi}
        <KelasFull />
      </h1>


      <div className={`w-full rounded-sm ${variant === "omahti" ? 'text-orange' : 'text-blue'}`}>

      </div>
    </div>
  );
};

const KelasFull = () => (
  <div className="inline-flex rounded-sm items-center gap-1 bg-custom-black p-1.5 text-xs">
    {/* red block */}
    <div className="aspect-square h-3 border-[1px] border-black bg-custom-red" />
    = Full
  </div>
);

export default KelasLengkap;
