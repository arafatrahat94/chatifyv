import ALLMessage from "./Components/ALLMessage";

export const metadata = {
  title: "Messages | Chatify",
  description: "An Social Media Web Application",
};
const MessagesPage = () => {
  return (
    <div>
      <h1 className="mx-[17px] mt-4 font-bold mb-4 text-xl text-purpleC dark:text-purpleLightC">
        Messages
      </h1>
      <ALLMessage></ALLMessage>
    </div>
  );
};

export default MessagesPage;
