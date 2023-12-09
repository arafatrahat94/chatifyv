import MediumDeviceNav from "@/Components/NAVBAR/MediumDeviceNav";
import Nav from "@/Components/NAVBAR/Nav";
import TopBar from "@/Components/TopBar/TopBar";

const layout = ({ children }) => {
  return (
    <div className=" dark:bg-primaryBgDark">
      <TopBar />
      <MediumDeviceNav />
      <div className="flex w-full">
        <div className="  ">
          <Nav></Nav>
        </div>
        <div className="xl:w-[750px] mx-auto lg:mr-auto lg:ms-0 md:w-[768px] lg:w-[650px]  flex-shrink-0 dark:border-darkborder  border">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
