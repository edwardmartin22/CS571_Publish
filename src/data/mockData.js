export const MOCK_USER = {
  id: "u1",
  name: "You",
  email: "example@email.com",
  handicap: 12
};

export const MOCK_LEAGUE = {
  id: "l1",
  name: "League Name",
  currentWeek: 6,
  totalWeeks: 12
};

export const MOCK_LEADERBOARD = [
  { rank: 1, name: "John D.", score: -4, id: "u2" },
  { rank: 2, name: "Mike R.", score: -2, id: "u3" },
  { rank: 3, name: "Matt G.", score: -1, id: "u8" },
  { rank: 4, name: "Chris M.", score: 0, id: "u4" },
  { rank: 5, name: "You", score: 1, id: "u1" },
  { rank: 6, name: "James B.", score: 2, id: "u5" },
  { rank: 7, name: "Tom H.", score: 3, id: "u6" },
  { rank: 8, name: "Kevin W.", score: 4, id: "u7" }
];

export const MOCK_ACHIEVEMENTS = {
  mostBirdies: "Mike R.",
  mostBogies: "Matt G."
};

export let MOCK_HISTORY = [
  { round: 1, score: 82, date: "May 1", course: "Norsk Golf Club", net: 70, putts: 32, scores: [4,5,4,5,4,4,5,3,6, 4,6,3,5,4,4,5,4,7] },
  { round: 2, score: 79, date: "May 8", course: "University Ridge GC", net: 67, putts: 28, scores: [4,4,3,4,4,6,4,3,5, 5,5,4,4,4,5,4,3,6] },
  { round: 3, score: 84, date: "May 15", course: "Whistling Straits", net: 72, putts: 34, scores: [5,6,4,5,5,5,4,5,6, 5,6,4,4,5,5,6,3,5] },
  { round: 4, score: 81, date: "May 22", course: "Erin Hills", net: 69, putts: 31, scores: [5,5,3,4,5,4,4,5,5, 5,5,5,4,4,5,4,4,5] },
  { round: 5, score: 80, date: "May 29", course: "Blackwolf Run", net: 68, putts: 30, scores: [4,6,4,4,4,4,5,3,5, 5,5,4,4,4,6,5,3,5] }
];

export const MOCK_COURSES = [
  {
    id: "c1",
    name: "Norsk Golf Club",
    par: 72,
    yards: 5796,
    rating: 67.6,
    slope: 115,
    holes: [
      { number: 1, par: 4 }, { number: 2, par: 5 }, { number: 3, par: 3 },
      { number: 4, par: 5 }, { number: 5, par: 3 }, { number: 6, par: 4 },
      { number: 7, par: 4 }, { number: 8, par: 3 }, { number: 9, par: 5 },
      { number: 10, par: 4 }, { number: 11, par: 5 }, { number: 12, par: 3 },
      { number: 13, par: 5 }, { number: 14, par: 3 }, { number: 15, par: 4 },
      { number: 16, par: 4 }, { number: 17, par: 3 }, { number: 18, par: 5 }
    ],
    leaders: [
      { name: "John D.", score: 70 },
      { name: "Mike R.", score: 71 },
      { name: "James B.", score: 73 }
    ]
  },
  {
    id: "c2",
    name: "University Ridge GC",
    par: 72,
    yards: 7286,
    rating: 75.8,
    slope: 142,
    holes: [
      { number: 1, par: 4 }, { number: 2, par: 5 }, { number: 3, par: 3 },
      { number: 4, par: 4 }, { number: 5, par: 3 }, { number: 6, par: 5 },
      { number: 7, par: 4 }, { number: 8, par: 3 }, { number: 9, par: 5 },
      { number: 10, par: 4 }, { number: 11, par: 5 }, { number: 12, par: 3 },
      { number: 13, par: 4 }, { number: 14, par: 4 }, { number: 15, par: 4 },
      { number: 16, par: 5 }, { number: 17, par: 3 }, { number: 18, par: 4 }
    ],
    leaders: [
      { name: "Chris M.", score: 68 },
      { name: "Tom H.", score: 72 },
      { name: "Mike R.", score: 75 }
    ]
  },
  {
    id: "c3",
    name: "Whistling Straits",
    par: 72,
    yards: 7390,
    rating: 77.2,
    slope: 152,
    holes: Array.from({length: 18}, (_, i) => ({ number: i+1, par: [4,5,3,4,4,4,3,4,5, 4,5,3,4,4,4,5,3,4][i] })),
    leaders: [{ name: "John D.", score: 71 }]
  },
  {
    id: "c4",
    name: "Erin Hills",
    par: 72,
    yards: 7800,
    rating: 77.9,
    slope: 145,
    holes: Array.from({length: 18}, (_, i) => ({ number: i+1, par: [4,5,3,4,4,3,4,5,4, 4,4,5,3,4,4,3,5,4][i] })),
    leaders: [{ name: "Mike R.", score: 70 }]
  },
  {
    id: "c5",
    name: "Blackwolf Run",
    par: 72,
    yards: 7404,
    rating: 76.2,
    slope: 151,
    holes: Array.from({length: 18}, (_, i) => ({ number: i+1, par: [4,5,4,4,3,4,5,3,4, 4,5,4,3,4,5,4,3,4][i] })),
    leaders: [{ name: "Chris M.", score: 72 }]
  }
];
