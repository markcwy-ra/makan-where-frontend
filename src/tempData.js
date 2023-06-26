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

export { tempData, tempReviewData, tempListData, testRestPageData };
