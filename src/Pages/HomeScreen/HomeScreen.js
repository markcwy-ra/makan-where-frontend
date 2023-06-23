import Header from "../../Components/Header/Header";
import MakanlistCard from "../../Details/Cards/Makanlist/MakanlistCard";
import ReviewCard from "../../Details/Cards/Review/ReviewCard";
import "./HomeScreen.css";
import { tempData } from "../../tempData";

const HomeScreen = () => {
  const feed = tempData.map((data, index) => {
    if (data.type === "Makanlist") {
      return <MakanlistCard key={index} content={data} />;
    } else {
      return <ReviewCard key={index} content={data} />;
    }
  });

  return (
    <>
      <Header>
        <h1>Featured</h1>
        <h1 className="inactive-text">Following</h1>
      </Header>
      <div className="content feed-list">{feed}</div>
    </>
  );
};

export default HomeScreen;
