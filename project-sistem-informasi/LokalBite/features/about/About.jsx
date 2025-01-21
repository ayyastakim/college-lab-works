import Image from "next/image";

export const About = () => {
  return (
    <div className="flex flex-col">
      <div className="relative w-screen min-h-screen px-8 py-24 md:px-28">
        {/* Background Image */}
        <Image
          src="/images/bg.png"
          alt="background"
          layout="fill"
          priority
          objectFit="cover"
          objectPosition="top"
        />


        <div className="relative grid items-center w-full max-w-6xl gap-12 ml-2 md:grid-cols-2 md:gap-x-16">
          <div className="text-left">
            <h2 className="font-bold text-black text-heading-m md:w-2/4 md:text-heading-xl">About Us</h2>
            <p className="mt-4 text-gray-500 md:text-lg">
              LokalBite hadir untuk menyajikan hidangan tradisional Makassar yang autentik. Kami percaya bahwa setiap hidangan memiliki cerita yang layak dinikmati..
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odio minus enim saepe dicta, iure numquam nam perferendis, eligendi non itaque doloribus! Nihil fugit quod culpa dolore esse molestiae aspernatur.
            </p>
          </div>
          <div className="relative h-[350px] md:h-[400px] ml-auto">
            <Image
              src="/images/salad.png"
              alt="About Us"
              objectFit="cover"
              className="rounded-lg"
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className="relative grid items-start w-full max-w-6xl gap-12 mt-20 ml-2 md:grid-cols-2 md:gap-x-16">
          <div className="pr-6 text-left">
            <h3 className="font-semibold text-black text-heading-s md:text-heading-l">Our Mission</h3>
            <p className="mt-4 text-gray-500 md:text-lg">
              Menyajikan pengalaman kuliner terbaik dengan bahan-bahan lokal berkualitas tinggi.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit provident, voluptates dolores excepturi saepe corporis incidunt, doloribus ducimus, voluptatem modi dolor enim architecto quae! Quisquam dolore quibusdam doloremque distinctio deleniti.
            </p>
          </div>
          <div className="pr-6 text-left">
            <h3 className="font-semibold text-black text-heading-s md:text-heading-l">Our Vision</h3>
            <p className="mt-4 text-gray-500 md:text-lg">
              Menjadi restoran terkemuka yang memperkenalkan cita rasa tradisional Makassar ke seluruh dunia.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo corporis aperiam ipsum aliquid fugit ratione magni nobis consequuntur sequi. Magnam animi nihil vel maxime facilis reprehenderit nam rem hic amet?
            </p>
          </div>
        </div>
        <div className="relative grid items-center w-full max-w-6xl gap-12 mt-20 ml-2 md:grid-cols-2 md:gap-x-16">
          <div className="text-left">
            <h3 className="font-semibold text-black text-heading-s md:text-heading-l">Meet Our Team</h3>
            <p className="mt-4 text-gray-500 md:text-lg">
              Dipimpin oleh chef berpengalaman, tim dapur kami berdedikasi untuk memberikan rasa terbaik.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, sit harum? Illo iusto vel praesentium impedit consequatur sapiente ad reprehenderit, error voluptas blanditiis perferendis voluptate corporis necessitatibus optio, accusamus tempore.
            </p>
          </div>
          <div className="relative h-[380px] md:h-[380px] md:ml-auto mt-2">
            <Image
              src="/images/chef.png" 
              alt="Team"
              objectFit="cover"
              className="rounded-lg"
              width={300}
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
