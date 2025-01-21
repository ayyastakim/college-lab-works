interface CardProps {
  children: React.ReactNode;
}

export const CardRiwayat = (props: CardProps) => {
  const { children } = props;

  return (
    <main className="container">
      <section
        className={`relative flex min-h-[180px] max-w-[380px] flex-col gap-4 bg-[#8a9de3] p-8 text-white shadow-xl`}
        style={{
          borderTopLeftRadius: "60px",
          borderTopRightRadius: "15px",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "60px",
        }}
      >
        {children}
      </section>
    </main>
  );
};
