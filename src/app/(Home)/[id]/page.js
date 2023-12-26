import { Suspense } from "react";
import BannerANdProfilePic from "./BannerANdProfilePic";
import ComponentLoader from "@/Utilities/ComponentLoader";

const DynamicPage = ({ params }) => {
  console.log(params?.id);
  return (
    <div className="mx-[15px] md:mx-[24px]">
      <Suspense
        fallback={
          <div className="w-full min-h-screen flex items-center justify-center">
            <ComponentLoader />
          </div>
        }
      >
        <BannerANdProfilePic email={params?.id} />
      </Suspense>
    </div>
  );
};

export default DynamicPage;
