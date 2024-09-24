const users = [
    'Mitch',
    'Hope',
    'Alyssa',

  ];
  
  const thoughts = [
    'I love dirtbikes',
    'I love my dogs',
    'I love my hoomans'
  ];
  
  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random full name
  const getRandomUser = () =>
    `${getRandomArrItem(users)}`;
  
  // Function to generate random assignments that we can add to student object.
  const getRandomComments = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        commentName: getRandomArrItem(thoughts),
      });
    }
    return results;
  };
  
  // Export the functions for use in seed.js
  module.exports = { getRandomUser, getRandomComments };
  