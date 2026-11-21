import Hero from "@/components/shared/Hero";
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import Categories from "@/components/home/Categories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Reviews from "@/components/home/Reviews";
import OwnerCta from "@/components/home/OwnerCta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedEquipment />
      <Categories />
      <WhyChooseUs />
      <HowItWorks />
      <Reviews />
      <OwnerCta />
    </>
  );
}
