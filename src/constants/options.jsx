export const SelectTravelersList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole traveler in exploration',
      icon: '✈️',
      people: '1'
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two travelers in tandem',
      icon: '👯',
      people: '2 People'
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A family adventure',
      icon: '👩‍❤️‍👨',
      people: '4 People'
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'A group of friends',
      icon: '👫',
      people: '3-5 People'
    }
]

export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Budget',
      desc: 'Affordable travel with basic amenities',
      icon: '💰',
      range: '$'
    },
    {
      id: 2,
      title: 'Standard',
      desc: 'Comfortable travel with good amenities',
      icon: '💵',
      range: '$$'
    },
    
    {
      id: 3,
      title: 'Luxury',
      desc: 'Luxury travel with top-notch amenities and services',
      icon: '🛎️',
      range: '$$$$'
    },
];
  
export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget}, give me Hotel options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {totalDays} with each day plan with best time to visit in JSON format.';