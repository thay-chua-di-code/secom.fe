import Banner from "../../components/layouts/Banner";
import CategorySidebar from "./CategoriesSideBar";

import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.avif";
import banner3 from "../../assets/images/banner3.avif";

const Home = () => {
  return (
    <div className="flex flex-col gap-6">
      <Banner images={[banner1, banner2, banner3]} />

      <div className="flex gap-6">
        <aside className="hidden w-[260px] shrink-0 lg:block">
          <CategorySidebar />
        </aside>

        <main className="flex-1">{/* sau này product grid nằm đây */}</main>
      </div>
    </div>
  );
};

export default Home;
