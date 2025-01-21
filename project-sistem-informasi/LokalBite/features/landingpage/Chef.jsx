import Image from "next/image";
export const Chef = () => {
  return (
    <section className="relative flex min-h-screen bg-white px-8 py-20 md:px-28">
      <Image
        src="/images/panci.png"
        alt="background"
        width={150}
        height={150}
        priority
        objectFit="cover"
        objectPosition="top"
        className="absolute bottom-80 left-0 md:bottom-0 md:w-[300px]"
      />
      <section className="flex w-full flex-col gap-8 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4 md:w-1/2">
          <h2 className="text-heading-s font-semibold text-black md:pt-20 md:text-heading-l">
            Our Expects Chef
          </h2>
          <p className="text-text-m font-light text-black md:text-text-l">
            Food, subs tance consisting essentially of protein, carbohydrate,
            fat, and other nutrients used in the body of an organism to sustain
            growth and vital processes and to furnish energy. The absorption and
            utilization of food by the body is fundamental to nutrition and is
            facilitated by digestion
          </p>
        </div>
        <Image
          src="/images/chef.png"
          alt="chef"
          width={500}
          height={500}
          objectFit="cover"
          objectPosition="top"
          className="z-10"
        />
      </section>
    </section>
  );
};
