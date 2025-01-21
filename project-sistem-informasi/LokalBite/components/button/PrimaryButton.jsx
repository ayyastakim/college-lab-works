export const PrimaryButton = (props) => {
  const { fullWidth = false, children, onClick, color, hover } = props;

  const fullwidth = fullWidth ? "w-full" : "w-fit";

  return (
    <button
      onClick={onClick}
      className={`${fullwidth} ${color ? "bg-primary-orange" : "bg-black"} ${hover ? "hover:bg-primary-soft-orange" : "hover:bg-[#273d53]"} items-center justify-center rounded-md p-[6px_24px] text-text-s text-white duration-300 md:text-text-m`}
    >
      {children}
    </button>
  );
};
