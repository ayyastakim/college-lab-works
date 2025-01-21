"use client";
import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { Form } from "@/features/form/Form";

export default function FormPage() {
  return (
    <div>
      <Navbar />
      <Form onSubmitFed={() => {}} />;
      <Footer />
    </div>
  );
}
