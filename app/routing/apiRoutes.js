
const friends = require("../data/friends");

module.exports = function (app) {
    // A GET json route to display all possible friends
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {
        // The variable used to calculate the difference btn the user's socres and the scores of each user
        var totalDiff = 0;
        // loop through all of the possible options    
        var bestMatch = {
            name: "",
            photo: "",
            friendDiff: 1000
        };
        // To take the result of the user's survey POST and parse it
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        var bud = userScores.map(function (myDude) {
            return parseInt(myDude, 10);
        });
        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: bud
        };

        console.log("Name: " + userName);
        console.log("User Score " + userScores);

        var sum = bud.reduce((arr, bud) => arr + bud, 0);

        console.log("Sum of users score " + sum);
        console.log("Best match friend diff " + bestMatch.friendDiff);

        //loop through that friends score and the users score and calculate the absolute difference between the two and push that to the totalDiff   
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDiff = 0;
            console.log("Total Diff " + totalDiff);
            console.log("Best match friend diff " + bestMatch.friendDiff);

            var bfriendScore = friends[i].scores.reduce((arr, bud) => arr + bud, 0);
            console.log("Total friend score " + bfriendScore);
            totalDiff += Math.abs(sum - bfriendScore);
            console.log("-------------------------> " + totalDiff);
            // Reset the bestMatch to be the new friend. 
            if (totalDiff <= bestMatch.friendDiff) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDiff = totalDiff;
            }
            console.log(totalDiff + " Total Difference");
        }
        console.log(bestMatch);
        // The push method use to save user's data to the database
        friends.push(userData);
        console.log("New user added");
        console.log(userData);
        //will return a JSON data with the user's match
        res.json(bestMatch);
    });
};