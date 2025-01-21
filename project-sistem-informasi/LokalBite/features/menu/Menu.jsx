import Image from "next/image";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { menuItems } from "./menuItems";

export const Menu = () => {
  return (
    <div className="relative flex flex-col">
      {/* Background Image */}
      <Image
        src="/images/bg.png"
        alt="background"
        layout="fill"
        priority
        objectFit="cover"
        objectPosition="top"
        className="z-0"
      />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col bg-opacity-80 px-8 py-24 md:px-28">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-heading-l font-semibold text-black">
            Our Menu
          </h1>
          <p className="text-text-l font-light text-black">
            Pilih dari berbagai hidangan lezat yang kami tawarkan. Setiap menu
            disajikan dengan kualitas dan rasa terbaik.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="relative flex transform flex-col items-center overflow-hidden rounded-xl bg-white shadow-md transition-transform duration-300 hover:scale-[1.05] hover:shadow-xl"
            >
              <Image
                src="/images/salad.png"
                alt="Salad"
                objectFit="cover"
                className="rounded-xl"
                width={150}
                height={160}
                style={{ marginTop: "20px" }}
              />

              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <h2 className="text-text-l font-semibold text-black">
                  {item.title}
                </h2>
                <p className="text-text-m font-light text-black">
                  {item.description}
                </p>
                <p className="text-text-l font-bold text-black">{item.price}</p>
                <PrimaryButton fullWidth={true} color={true} hover={true}>
                  Pesan Sekarang
                </PrimaryButton>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Menu;
