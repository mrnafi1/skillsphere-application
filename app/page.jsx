import HeroBanner from "@/components/HeroBanner";
import Marquee from "@/components/Marquee";
import PopularCourses from "@/components/PopularCourses";
import LearningTips from "@/components/LearningTips";
import TopInstructors from "@/components/TopInstructors";
import TrendingCourses from "@/components/TrendingCourses";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <Marquee />
      <PopularCourses />
      <LearningTips />
      <TopInstructors />
      <TrendingCourses />
    </>
  );
}
