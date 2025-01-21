"use client";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import Image from "next/image";
import { Dish } from "./Dish";
import { Chef } from "./Chef";
import { useAuth } from "../auth/useAuth";
import { useRouter } from "next/navigation";
export const LandingPage = () => {
  const router = useRouter();

  const handleMenu = () => {
    router.push("/menu");
  };

  const handleOrder = () => {
    router.push("/reservasi");
  };
  const { user } = useAuth();
  return (
    <main className="flex flex-col">
      <section className="relative flex min-h-screen w-screen items-center px-8 py-24 md:px-28">
        <Image
          src="/images/bg.png"
          alt="background"
          layout="fill"
          priority
          objectFit="cover"
          objectPosition="top"
        />
        <section className="z-10 flex flex-col-reverse items-center gap-8 md:flex-row">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              {user && (
                <h2 className="font-semibols text-heading-m text-black md:text-heading-xl">
                  Welcome, {user.displayName}
                </h2>
              )}

              <h2 className="text-heading-m font-bold text-black md:w-3/4 md:text-heading-xl">
                We Provide The Best Food For You!
              </h2>
              <p className="text-text-m text-gray-500 md:text-text-l">
                Nikmati kelezatan hidangan tradisional Makassar yang autentik
                dan kaya rempah, disajikan dengan penuh kehangatan dan keaslian
                rasa.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <PrimaryButton
                fullWidth={false}
                color={false}
                hover={false}
                onClick={handleMenu}
              >
                View Menu
              </PrimaryButton>
              <PrimaryButton
                fullWidth={false}
                color={true}
                hover={true}
                onClick={handleOrder}
              >
                Order Food
              </PrimaryButton>
            </div>
          </div>
          <Image
            src="/images/salad.png"
            alt="food"
            width={250}
            height={250}
            objectFit="cover"
            objectPosition="top"
            className="pt-10 md:flex md:h-[550px] md:w-[650px] md:p-0"
          />
        </section>
      </section>
      <Dish />
      <Chef />
    </main>
  );
};
