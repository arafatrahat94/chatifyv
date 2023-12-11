import Footer from "@/Components/Footer/Footer";
import MediumDeviceNav from "@/Components/NAVBAR/MediumDeviceNav";
import Nav from "@/Components/NAVBAR/Nav";
import SuggestionAndSearch from "@/Components/SUGGESTION/SuggestionAndSearch";
import TopBar from "@/Components/TopBar/TopBar";
import LoadingANimation from "@/Utilities/LoadingANimation";

const layout = ({ children }) => {
  return (
    <div className=" dark:bg-primaryBgDark">
      <LoadingANimation></LoadingANimation>
      <TopBar />
      <MediumDeviceNav />
      <div className="flex w-full">
        <div className="  ">
          <Nav></Nav>
        </div>
        <div className="xl:w-[750px] mx-auto lg:mr-auto lg:ms-0 md:w-[768px] lg:w-[550px] w-full flex-shrink-0 ">
          {children}
        </div>
        <div className=" hidden lg:block flex-grow ">
          <SuggestionAndSearch />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default layout;
