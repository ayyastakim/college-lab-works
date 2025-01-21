import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { Home } from "@/features/home/Home";
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Home />;
      <Footer />
    </div>
  );
}
