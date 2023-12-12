import POST from "@/Components/HOMEPAGE/POST";
import BannerAndProfilePic from "./Components/BannerAndProfilePic";
import ProfileTabInformation from "./Components/ProfileTabInformation";

export const metadata = {
  title: "Profile | Chatify",
  description: "An Social Media Web Application",
};
const MyProfilePage = () => {
  return (
    <div className="mx-[15px] md:mx-[24px]">
      <BannerAndProfilePic></BannerAndProfilePic>
      <POST></POST>
      <ProfileTabInformation></ProfileTabInformation>
    </div>
  );
};

export default MyProfilePage;
