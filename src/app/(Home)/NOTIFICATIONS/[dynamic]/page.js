import Dynamic from "./Dynamic";

const DynamicPage = ({ params }) => {
  return (
    <div>
      <Dynamic params={params?.dynamic}></Dynamic>
    </div>
  );
};

export default DynamicPage;
