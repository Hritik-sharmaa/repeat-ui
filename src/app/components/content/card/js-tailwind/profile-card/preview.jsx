import { FaUser } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

export default function ProfileCard({
  image,
  name,
  verified,
  bio,
  followers,
  onFollow,
}) {
  return (
    <div className="w-[300px] rounded-[40px] overflow-hidden shadow-lg bg-white transition-all duration-300 ease-in-out text-black p-2.5 hover:-translate-y-0.5">
      <img
        src={image}
        alt={name}
        className="w-full h-[300px] object-cover rounded-[30px]"
      />
      <div className="p-2.5">
        <div className="text-left font-semibold text-lg flex items-center gap-1">
          <span>{name}</span>
          {verified && <MdVerified className="text-green-500 text-lg" />}
        </div>
        <p className="mt-1 text-sm text-gray-600">{bio}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center text-sm text-gray-600 mr-3">
            <FaUser className="mr-1 text-gray-800" />
            <span>{followers}</span>
          </div>
          <button
            className="flex items-center gap-2 bg-gray-900 text-white border-none py-2.5 px-6 rounded-full font-medium text-sm cursor-pointer transition-all duration-200 ease-in-out shadow-sm hover:bg-gray-800 hover:scale-105 hover:shadow-md"
            onClick={onFollow}>
            Follow <BsPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
