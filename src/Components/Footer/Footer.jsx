import { FaFacebook, FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <div>
      <footer className="footer p-5 md:p-20 mt-10 bg-base-200 text-base-content">
        <div className="lg:w-[80%] mx-auto gap-y-10 md:justify-between md:flex-row flex-col w-full items-start  flex">
          <nav className="flex flex-col">
            <header className="footer-title text-purpleC opacity-100 dark:text-purpleLightC">
              About
            </header>
            <a className="link link-hover text-grayC dark:text-white opacity-80 my-1">
              Terms
            </a>
            <a className="link link-hover text-grayC dark:text-white opacity-80 my-1">
              Privacy
            </a>
            <a className="link link-hover text-grayC dark:text-white opacity-80 my-1">
              Disclaimer
            </a>
          </nav>
          <nav className="flex flex-col">
            <header className="footer-title text-purpleC opacity-100 dark:text-purpleLightC">
              Faq
            </header>
            <a className="link link-hover text-grayC dark:text-white opacity-80 my-1">
              Complaint Policy
            </a>
            <a className="link link-hover text-grayC dark:text-white opacity-80 my-1">
              Cookie Notice
            </a>
            <a className="link link-hover text-grayC dark:text-white opacity-80 my-1">
              DMCA
            </a>
          </nav>
          <nav className="flex flex-col">
            <header className="footer-title text-purpleC opacity-100 dark:text-purpleLightC">
              Contact
            </header>
            <a className="link link-hover text-grayC dark:text-white opacity-80 my-1">
              Blog
            </a>
            <a className="link link-hover text-grayC dark:text-white opacity-80 my-1">
              Referral
            </a>
            <a className="link mt-5 link-hover">
              <h1 className="opacity-100 text-purpleC dark:text-purpleLightC font-bold">
                Share Chatify
              </h1>
              <div className="flex gap-x-2  mt-3 text-2xl text-purpleC dark:text-purpleLightC">
                <FaFacebook />
                <FaSquareXTwitter />
                <FaTelegram />
              </div>
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
