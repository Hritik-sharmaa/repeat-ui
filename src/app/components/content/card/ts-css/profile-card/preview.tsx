import "./style.css";
import { FaUser } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import Image from "next/image";

interface ProfileCardProps {
  className: string;
  image: string;
  name: string;
  verified?: boolean;
  bio: string;
  followers: number | string;
  onFollow?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  image,
  name,
  verified = false,
  bio,
  followers,
  onFollow,
}) => {
  return (
    <div className="profile-card">
      <Image
        src={image}
        alt={name}
        className="profile-image"
        width={100}
        height={100}
      />
      <div className="card-content">
        <div className="card-header">
          <span className="name">{name}</span>
          {verified && <MdVerified className="verified" />}
        </div>
        <p className="bio">{bio}</p>
        <div className="card-footer">
          <div className="stats">
            <span>
              <FaUser /> {followers}
            </span>
          </div>
          <button className="follow-btn" onClick={onFollow}>
            Follow <BsPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
