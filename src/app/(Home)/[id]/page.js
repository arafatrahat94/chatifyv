import { Suspense } from "react";
import BannerANdProfilePic from "./BannerANdProfilePic";
import ComponentLoader from "@/Utilities/ComponentLoader";

const DynamicPage = ({ params }) => {
  console.log(params?.id);
  return (
    <div className="mx-[15px] md:mx-[24px]">
      <BannerANdProfilePic email={params?.id} />
    </div>
  );
};

export default DynamicPage;
