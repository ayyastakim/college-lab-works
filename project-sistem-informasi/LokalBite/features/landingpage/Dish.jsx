import Image from "next/image";
import { DishLink } from "./dishLink";
import Link from "next/link";

export const Dish = () => {
  return (
    <main className="relative flex min-h-screen items-center bg-[#f7f7f9] px-8 md:px-28">
      <Image
        src="/images/garlic.png"
        width={80}
        height={80}
        objectFit="cover"
        objectPosition="top"
        alt=""
        className="absolute right-4 top-32 z-10 w-[150] md:right-10 md:top-24"
      />

      <section className="grid w-full grid-cols-1 gap-10 py-20 md:gap-20 md:py-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-heading-s font-semibold text-black md:text-heading-l">
            Our Delicious Menu
          </h2>
          <p className="text-text-m font-light text-black md:text-text-l">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
            sapiente sint, modi quaerat quos consequuntur.
          </p>
        </div>
        <section className="grid grid-cols-1 gap-8 px-6 md:grid-cols-4 md:px-0">
          {DishLink.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                borderTopLeftRadius: "80px",
                borderTopRightRadius: "20px",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "80px",
              }}
              className="scale flex flex-col items-center justify-center gap-2 border py-12 transition-all duration-300 ease-in-out hover:scale-[1.05] hover:bg-white hover:shadow-xl md:gap-4 md:px-10 md:py-12"
            >
              <Image
                src="/images/salad.png"
                width={150}
                height={160}
                alt=""
                objectFit="cover"
                objectPosition="top"
              />
              <p className="text-text-l font-semibold text-black md:text-heading-s">
                {item.title}
              </p>
              <p className="text-text-m font-light text-black md:text-text-l">
                {item.desc}
              </p>
            </Link>
          ))}
        </section>
        <Link
          href="/"
          className="text-right text-text-s font-light text-black hover:underline md:text-text-l"
        >
          View more {"->"}
        </Link>
      </section>
    </main>
  );
};
