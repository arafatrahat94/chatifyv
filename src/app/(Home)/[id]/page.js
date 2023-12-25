import BannerANdProfilePic from "./BannerANdProfilePic";

const DynamicPage = ({ params }) => {
  console.log(params?.id);
  return (
    <div>
      <BannerANdProfilePic />
    </div>
  );
};

export default DynamicPage;
