import "./MakanlistScreen.css";
import { tempListPageData } from "../../tempData";
import VertFeed from "../../Components/Feeds/VertFeed";

const MakanlistScreen = () => {
  const data = { ...tempListPageData };
  return (
    <div className="content">
      <div
        className="makanlist-header"
        style={{
          backgroundImage: `linear-gradient(rgba(0 0 0 / 50%), rgba(0 0 0  / 50%)), url(${data.photoUrl})`,
        }}
      >
        <h2>{data.title}</h2>
        <h4>Makanlist by @{data.author}</h4>
      </div>
      <div className="makanlist-content">
        <h6>{data.description}</h6>
        <div className="divider-line" />
      </div>
      {<VertFeed data={data.restaurants} type="restaurants" />}
    </div>
  );
};

export default MakanlistScreen;
