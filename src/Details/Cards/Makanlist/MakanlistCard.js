import "./MakanlistCard.css";
import "../Cards.css";

const MakanlistCard = ({ config, content }) => {
  let styling;
  if (content.photoUrl) {
    styling = {
      ...styling,
      backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${content.photoUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } else {
    styling = {
      ...styling,
      backgroundColor: "#0078ef",
    };
  }

  return (
    <div className={`card-makanlist-${config}`} style={styling}>
      <div className={`card-makanlist-${config}-title`}>
        <h2>{content.title}</h2>
        <h4>Makanlist by @{content.author}</h4>
      </div>

      <div className="profile-pic"></div>
    </div>
  );
};

export default MakanlistCard;
