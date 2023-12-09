import { CiFilter } from "react-icons/ci";
import SINGLEPOST from "./SINGLEPOST";
const ALL = () => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-purpleLightC text-xl">All</h1>
        {/* TODO: filter section */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn text-xl font-bold text-textPrimaryLight hover:bg-transparent focus:border outline-none hover:shadow-none  focus:border-textPrimaryLight focus:bg-transparent bg-transparent m-1"
          >
            <CiFilter />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
      {/* TODO: this is a dynamic section where mapping will be done from the server */}
      <div>
        <SINGLEPOST />
      </div>
    </div>
  );
};

export default ALL;
