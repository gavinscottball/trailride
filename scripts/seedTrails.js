// scripts/seedTrails.js
// Load environment variables for database URI
require('dotenv').config();
const mongoose = require('mongoose');
require('../models/Trail');
const Trail = mongoose.model('Trail');

const sampleTrails = [
  // 1) 50 Year
  {
    name: '50 Year',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Blue',
    description: 'A fun beginner-intermediate cross-country trail through desert terrain with packed sections and short technical rocky areas.',
    startingElevation: 3280,
    altitudeChange: -164,
    distance: 5.2,
    pictures: ['/uploads/50Year.jpg']
  },
  // 2) Middle Gate
  {
    name: 'Middle Gate',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Black',
    description: 'This trail is best ridden North to South, or better yet as an extension of Upper 50 Year trail. Middlegate starts with a mixture of technical rock gardens and punchy uphill climbs.',
    startingElevation: 3290,
    altitudeChange: -51,
    distance: 2.5,
    pictures: ['/uploads/MiddleGate.jpeg']
  },
  // 3) The Chutes
  {
    name: 'The Chutes',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Blue',
    description: 'This trail is a series of very fun packed dirt chutes, rolling uphills, and a few optional small drops.',
    startingElevation: 3290,
    altitudeChange: -10,
    distance: 1.1,
    pictures: ['/uploads/Chutes.jpg']
  },
  // 4) Upper Fifty Year
  {
    name: 'Upper Fifty Year',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Double Black',
    description: 'This trail starts with a sustained and sometimes technical climb, then after very briefly flattening out, continues climbing up a series of rock faces. The downhill winds through carved out chutes, over rock rolls (usually with ride around options), and over a number of difficult technical features and small drops.',
    startingElevation: 3289,
    altitudeChange: 19,
    distance: 1.9,
    pictures: ['/uploads/Upper50.jpeg']
  },
  // 5) Catalina
  {
    name: 'Catalina',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Blue',
    description: 'Catalina is a 4 mile moderately popular blue singletrack trail located near Tucson Arizona.',
    startingElevation: 2722,
    altitudeChange: 393,
    distance: 3.7,
    pictures: ['/uploads/Catalina.webp']
  },
  // 6) Rattlesnake
  {
    name: 'Rattlesnake',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Black',
    description: 'Upper section (Cherry Spring trail to Cowboy Slickrock) is a fun rip with a great tech section beside a creek.',
    startingElevation: 3932,
    altitudeChange: -506,
    distance: 2.2,
    pictures: ['/uploads/Rattlesnake.jpeg']
  },
  // 7) Cowboy Slickrock
  {
    name: 'Cowboy Slickrock',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Black',
    description: 'A unique trail for Tucson that connects some massive granite slabs with nice flowing singletrack. Some big rolls, some challenging tech trail, a whole lot of rideable slickrock. Too bad it is so short.',
    startingElevation: 3722,
    altitudeChange: -129,
    distance: 0.79,
    pictures: ['/uploads/Cowboy.jpg']
  },
  // 8) Around the Mountain
  {
    name: 'Around the Mountain',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Black',
    description: 'Great singletrack trail that offers some spectacular riding in the upper ends of the 50yr system.',
    startingElevation: 3737,
    altitudeChange: -217,
    distance: 0.89,
    pictures: ['/uploads/Around.jpg']
  },
  // 9) Gem
  {
    name: 'Gem',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Black',
    description: 'This short trail is full of freeride goodness if you look past the beaten path. There are a couple small drops and a couple optional rock face descents.',
    startingElevation: 3546,
    altitudeChange: -270,
    distance: 0.62,
    pictures: ['/uploads/Gem.jpg']
  },
  // 10) Honeybee Canyon – All the Honey Bee (Route)
  {
    name: 'Honeybee Canyon – All the Honey Bee',
    location: 'Tucson, AZ',
    latitude: 32.475690,
    longitude: -110.960590,
    difficulty: 'Blue',
    description: 'Ride all of the trails in the Honeybee Canyon network, starting from the Big Wash TH.',
    startingElevation: 2823,
    altitudeChange: 0,
    distance: 27.9,
    pictures: ['/uploads/ATHB.jpeg']
  },
  // 11) Honeybee Canyon – Tortolita Mtns Loop (Route)
  {
    name: 'Honeybee Canyon – Tortolita Mtns Loop',
    location: 'Tucson, AZ',
    latitude: 32.475690,
    longitude: -110.960590,
    difficulty: 'Black',
    description: 'Ride all of the trails in the Honeybee Canyon / upper Tortolita Mountains starting from Big Wash TH.',
    startingElevation: 2823,
    altitudeChange: 0,
    distance: 41.4,
    pictures: ['/uploads/TML.jpg']
  },
  // 12) Honeybee Canyon CCW (Route)
  {
    name: 'Honeybee Canyon CCW',
    location: 'Tucson, AZ',
    latitude: 32.475690,
    longitude: -110.960590,
    difficulty: 'Blue',
    description: 'Honeybee and Badlands. Funnest ride back',
    startingElevation: 3043,
    altitudeChange: 45,
    distance: 23.3,
    pictures: ['/uploads/CCW.jpeg']
  },
  // 13) 50 Year – All the Goods (Catalina SP) (Route)
  {
    name: '50 Year – All the Goods',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Black',
    description: 'A good sized loop that grabs basically all the good stuff in the Golder Ranch/50 Year area. Has everything from flowy and tech XC, to fast descents and bigger features.',
    startingElevation: 3214,
    altitudeChange: 3,
    distance: 12.4,
    pictures: ['/uploads/Goods.webp']
  },
  // 14) 50 Year – Middle Gate Loop (Route)
  {
    name: '50 Year – Middle Gate Loop',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Black',
    description: 'This loop combines the Upper 50 Year Trail with Middle Gate.',
    startingElevation: 3259,
    altitudeChange: -28,
    distance: 6.7,
    pictures: ['/uploads/Middle.jpg']
  },
  // 15) 50 Year – From Cherry Tank (Route)
  {
    name: '50 Year – From Cherry Tank',
    location: 'Tucson, AZ',
    latitude: 32.493990,
    longitude: -110.867790,
    difficulty: 'Blue',
    description: 'A good ride of all 50 year from Cherry Tank Camp',
    startingElevation: 4217,
    altitudeChange: -2,
    distance: 11.2,
    pictures: ['/uploads/Cherry.jpg']
  }
];

// Connect to MongoDB using environment variable if available
const seedDbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trailride';
mongoose.connect(seedDbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Trail.deleteMany({});
    await Trail.insertMany(sampleTrails);
    console.log('Seeded trails');
    mongoose.disconnect();
  })
  .catch(console.error);