import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import FeaturedProducts from "./components/home/FeaturedProducts";
import Testimonials from "./components/home/Testimonials";
import Newsletter from "./components/home/Newsletter";
import Gallery from "./components/home/Gallery";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
      <Gallery />
    </>
  );
}

export default App;