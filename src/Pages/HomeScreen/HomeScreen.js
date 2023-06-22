import MakanlistPanel from "../../Components/Makanlists/MakanlistPanel";
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <>
      <div className="feed-tabs">
        <h1>Featured</h1>
        <h1 className="inactive-text">Following</h1>
      </div>
      <div className="feed-list">
        <MakanlistPanel />
        <MakanlistPanel />
        <MakanlistPanel />
        <MakanlistPanel />
        <MakanlistPanel />
        <MakanlistPanel />
        <MakanlistPanel />
        <MakanlistPanel />
        <MakanlistPanel />
        <MakanlistPanel />
        <MakanlistPanel />
      </div>
    </>
  );
};

export default HomeScreen;
