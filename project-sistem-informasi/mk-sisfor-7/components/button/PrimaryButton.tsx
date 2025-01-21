interface PrimaryProps {
  children: React.ReactNode;
  fullwidth: boolean;

  onClick?(): void;
}

export const PrimaryButton: React.FC<PrimaryProps> = ({
  children,

  fullwidth = false,
}) => {
  const fullWidth = fullwidth ? "w-full" : "w-fit";

  return (
    <button
      className={`rounded-md px-4 py-2 ${fullWidth} z-40 bg-[#758BCF] hover:bg-[#ADB9E3] text-white `}
    >
      {children}
    </button>
  );
};
