import Banner from "./components/Banner";
import CategorySection from "./components/CategorySection";
import Featured from "./components/Featured";
import HowItWorks from "./components/HowItWorks";

function Home(){
  return (
    <div className="p-2">
      <Banner />
      <Featured />
      <CategorySection />
      <HowItWorks />
    </div>
  )
}


export default Home;