import "./style.css";
import { FaUser } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

const ProfileCard = ({ image, name, verified, bio, followers, onFollow }) => {
  return (
    <div className="profile-card">
      <img src={image} alt={name} className="profile-image" />
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
