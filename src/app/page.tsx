import Banner from "./components/Banner";
import CategorySection from "./components/CategorySection";
import Featured from "./components/Featured";

function Home(){
  return (
    <div className="p-2">
      <Banner />
      <Featured />
      <CategorySection />
    </div>
  )
}


export default Home;