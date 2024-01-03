import Dynamicimage from "@/Utilities/DynamicImage";
import NotificationPageComponent from "./Components/NotificationPageComponent";

export const metadata = {
  title: "Notification | Chatify",
  description: "An Social Media Web Application",
};
const NotificationPage = () => {
  return (
    <div
      className="w-full 
    "
    >
      {/* filer and setting */}
      <NotificationPageComponent></NotificationPageComponent>
    </div>
  );
};

export default NotificationPage;
