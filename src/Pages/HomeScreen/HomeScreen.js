import Header from "../../Components/Header/Header";
import MakanlistCard from "../../Details/Cards/Makanlist/MakanlistCard";
import ReviewCard from "../../Details/Cards/Review/ReviewCard";
import "./HomeScreen.css";

const fakeData = [
  {
    type: "Makanlist",
    title: "Desserts For All Moods",
    author: "johntan",
    photoUrl: "https://i.imgur.com/hwu8nZ3.jpg",
  },
  {
    type: "Makanlist",
    title: "Cheap But Still Good",
    author: "janelee",
  },
  {
    type: "Review",
    title: "Good bagels, nice atmosphere!",
    restaurantName: "ONALU Bagel Haús",
    author: "johntan",
    rating: 4,
    photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
  },
  {
    type: "Makanlist",
    title: "Cheap But Still Good",
    author: "janelee",
  },
  {
    type: "Review",
    title: "Tender and crispy tonkatsu",
    restaurantName: "Maruhachi",
    author: "johntan",
    rating: 5,
    photoUrl: "https://i.imgur.com/ciSqZkv.jpg",
  },
];

const HomeScreen = () => {
  const feed = fakeData.map((data, index) => {
    if (data.type === "Makanlist") {
      return <MakanlistCard key={index} config="full" content={data} />;
    } else {
      return <ReviewCard key={index} config="full" content={data} />;
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
