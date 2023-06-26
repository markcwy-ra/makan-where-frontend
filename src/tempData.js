const tempData = [
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

const tempReviewData = [
  {
    title: "Good bagels, nice atmosphere!",
    restaurantName: "ONALU Bagel Haús",
    author: "johntan",
    rating: 4,
    photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
  },
  {
    title: "Tender and crispy tonkatsu",
    restaurantName: "Maruhachi",
    author: "johntan",
    rating: 5,
    photoUrl: "https://i.imgur.com/ciSqZkv.jpg",
  },
  {
    title: "Good bagels, nice atmosphere!",
    restaurantName: "ONALU Bagel Haús",
    author: "johntan",
    rating: 4,
    photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
  },
  {
    title: "Tender and crispy tonkatsu",
    restaurantName: "Maruhachi",
    author: "johntan",
    rating: 5,
    photoUrl: "https://i.imgur.com/ciSqZkv.jpg",
  },
];

const tempListData = [
  {
    title: "Desserts For All Moods",
    author: "johntan",
    photoUrl: "https://i.imgur.com/hwu8nZ3.jpg",
  },
  {
    title: "Cheap But Still Good",
    author: "janelee",
  },
  {
    title: "Desserts For All Moods",
    author: "johntan",
    photoUrl: "https://i.imgur.com/hwu8nZ3.jpg",
  },
  {
    title: "Cheap But Still Good",
    author: "janelee",
  },
];

const testRestPageData = {
  name: "ONALU Bagel Haús",
  avgRating: 4.3,
  price: "$$",
  cuisine: "Bagels",
  address: "60 Stamford Rd, #01-11, Singapore 178900",
  coordinate: { lat: "1.29601", lng: "103.84947" },
  photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
  openingHours: [
    {
      day: "Monday",
      opening_time: "9:00 AM",
      closing_time: "5:00 PM",
    },
    {
      day: "Tuesday",
      opening_time: "9:00 AM",
      closing_time: "5:00 PM",
    },
    {
      day: "Wednesday",
      opening_time: "9:00 AM",
      closing_time: "5:00 PM",
    },
    {
      day: "Thursday",
      opening_time: "9:00 AM",
      closing_time: "5:00 PM",
    },
    {
      day: "Saturday",
      opening_time: "10:00 AM",
      closing_time: "8:00 PM",
    },
    // rest of the week
  ],
  reviews: [
    {
      title: "Good bagels, nice atmosphere!",
      restaurantName: "ONALU Bagel Haús",
      author: "johntan",
      rating: 4,
      photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
    },
    {
      title: "Great flavours and tasty bagels",
      restaurantName: "ONALU Bagel Haús",
      author: "janelee",
      rating: 5,
      photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
    },
  ],
};

const tempReviewPageData = {
  restaurant: "ONALU Bagel Haús",
  title: "Good bagels, nice atmostphere",
  rating: 4,
  upvotes: 5,
  author: "janelee",
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam phasellus vestibulum lorem sed risus ultricies. Sed vulputate mi sit amet mauris. Orci sagittis eu volutpat odio facilisis mauris sit amet. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Viverra orci sagittis eu volutpat. Tempus egestas sed sed risus. Sed risus pretium quam vulputate dignissim suspendisse in est. Consequat semper viverra nam libero justo laoreet.`,
  photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
};

export {
  tempData,
  tempReviewData,
  tempListData,
  testRestPageData,
  tempReviewPageData,
};
