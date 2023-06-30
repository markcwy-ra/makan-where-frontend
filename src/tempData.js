const tempData = [
  {
    type: "makanlist",
    makanlistId: 1,
    title: "Desserts For All Moods",
    author: "johntan",
    photoUrl: "https://i.imgur.com/hwu8nZ3.jpg",
  },
  {
    type: "makanlist",
    makanlistId: 2,
    title: "Cheap But Still Good",
    author: "janelee",
  },
  {
    type: "review",
    title: "Good bagels, nice atmosphere!",
    restaurant: {
      name: "ONALU Bagel Haús",
    },
    restaurantId: 1,
    reviewId: 1,
    author: "johntan",
    rating: 4,
    photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
  },
  {
    type: "makanlist",
    makanlistId: 2,
    title: "Cheap But Still Good",
    author: "janelee",
  },
  {
    type: "review",
    title: "Tender and crispy tonkatsu",
    restaurant: {
      name: "Maruhachi",
    },
    restaurantId: 2,
    reviewId: 2,
    author: "johntan",
    rating: 5,
    photoUrl: "https://i.imgur.com/ciSqZkv.jpg",
  },
];

const tempReviewData = [
  {
    title: "Good bagels, nice atmosphere!",
    restaurant: {
      name: "ONALU Bagel Haús",
    },
    restaurantId: 1,
    reviewId: 1,
    author: "johntan",
    rating: 4,
    photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
  },
  {
    title: "Tender and crispy tonkatsu",
    restaurant: {
      name: "Maruhachi",
    },
    restaurantId: 2,
    reviewId: 2,
    author: "johntan",
    rating: 5,
    photoUrl: "https://i.imgur.com/ciSqZkv.jpg",
  },
  {
    title: "Good bagels, nice atmosphere!",
    restaurant: {
      name: "ONALU Bagel Haús",
    },
    restaurantId: 1,
    reviewId: 1,
    author: "johntan",
    rating: 4,
    photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
  },
  {
    title: "Tender and crispy tonkatsu",
    restaurant: {
      name: "Maruhachi",
    },
    restaurantId: 2,
    reviewId: 2,
    author: "johntan",
    rating: 5,
    photoUrl: "https://i.imgur.com/ciSqZkv.jpg",
  },
];

const tempListData = [
  {
    title: "Desserts For All Moods",
    author: "johntan",
    makanlistId: 2,
    photoUrl: "https://i.imgur.com/hwu8nZ3.jpg",
  },
  {
    title: "Cheap But Still Good",
    makanlistId: 2,
    author: "janelee",
  },
  {
    title: "Desserts For All Moods",
    author: "johntan",
    makanlistId: 2,
    photoUrl: "https://i.imgur.com/hwu8nZ3.jpg",
  },
  {
    title: "Cheap But Still Good",
    makanlistId: 2,
    author: "janelee",
  },
];

const tempRestPageData = {
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
  ],
  reviews: [
    {
      title: "Good bagels, nice atmosphere!",
      restaurantName: "ONALU Bagel Haús",
      restaurantId: 1,
      reviewId: 1,
      author: "johntan",
      rating: 4,
      photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
    },
    {
      title: "Great flavours and tasty bagels",
      restaurantName: "ONALU Bagel Haús",
      restaurantId: 1,
      reviewId: 1,
      author: "janelee",
      rating: 5,
      photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
    },
  ],
};

const tempReviewPageData = {
  restaurant: "ONALU Bagel Haús",
  title: "Good bagels, nice atmostphere",
  restaurantId: 1,
  rating: 4,
  upvotes: 5,
  author: "janelee",
  recommended: "Deviled Spam Bagel, Plain bagel too!",
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam phasellus vestibulum lorem sed risus ultricies. Sed vulputate mi sit amet mauris. Orci sagittis eu volutpat odio facilisis mauris sit amet. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Viverra orci sagittis eu volutpat. Tempus egestas sed sed risus. Sed risus pretium quam vulputate dignissim suspendisse in est. Consequat semper viverra nam libero justo laoreet.`,
  photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
};

const tempRestaurantList = [
  {
    name: "ONALU Bagel Haús",
    avgRating: 4.3,
    restaurantId: 1,
    coordinate: { lat: 1.29601, lng: 103.84947 },
    photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
  },
  {
    name: "Percolate",
    avgRating: 4.7,
    restaurantId: 3,
    coordinate: { lat: 1.32826, lng: 103.93525 },
    photoUrl: "https://i.imgur.com/nerEAWX.jpg",
  },
  {
    name: "Ponggol Nasi Lemak",
    avgRating: 4.2,
    restaurantId: 4,
    coordinate: { lat: 1.31284, lng: 103.85961 },
    photoUrl: "https://i.imgur.com/Kr1trVJ.jpg",
  },
  {
    name: "Lau Wang Claypot Delights",
    avgRating: 4.2,
    restaurantId: 5,
    coordinate: { lat: 1.35453, lng: 103.87203 },
    photoUrl:
      "https://cdn.shopify.com/s/files/1/0770/5745/products/LauWangClaypot_CV__1_1f61c002-3c70-40ad-bc42-18ea4092fee4.jpg?v=1646881709",
  },
];

const tempListPageData = {
  title: "Desserts For All Moods",
  photoUrl: "https://i.imgur.com/7JX5nqm.jpg",
  author: "johntan",
  description:
    "My very own curated list of desserts that fit whatever mood you’re in!",
  restaurants: [...tempRestaurantList],
};

const tempUserData = {
  username: "johntan",
  email: "john@john.com",
  country: "Singapore",
};

export {
  tempData,
  tempReviewData,
  tempListData,
  tempRestPageData,
  tempReviewPageData,
  tempListPageData,
  tempRestaurantList,
  tempUserData,
};
