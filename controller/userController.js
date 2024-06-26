const User = require('../models/User');
const falso=  require('@ngneat/falso');

exports.createUser = async (req, res) => {

    let genders = ["male","female","bi-sexual","transgender"];
    let gender = genders[Math.floor(Math.random() * genders.length)];

    let ages = [18,20,24,26,27,32,35,45,50,55,60,65];
    let age = ages[Math.floor(Math.random() * ages.length)]

    let preferences = [];
    let size = Math.floor(Math.random() * (genders.length));

    for (let i = 0; i < size; i++) {
        let gender = Math.floor(Math.random() * genders.length);
        if (!preferences.includes(genders[gender])) {
            preferences.push(genders[gender]);
        }
    }

    let latitude = 28.6832091-0.1+Math.random()*(28.6832091+0.1-(28.6832091-0.1));
    let longitude = 77.3177894-0.1+Math.random()*(77.3177894+0.1-(77.3177894-0.1));

    let randomIndex = Math.floor(Math.random() * genders.length);
    let randomGender = genders[randomIndex];

    try {
        const newUser = new User({
            name: falso.randFullName(),
            gender: gender,
            age: age,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
            preferences: {
                minAge: Math.floor(Math.random() * (25 - 18 + 1)) + 18,
                maxAge: Math.floor(Math.random() * (65 - 26 + 1)) + 26,
                gender: randomGender
            }
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.filterUsers = async (req, res) => {
    try {
        const { latitude, longitude, radius, genderPreference } = req.query;
        const users = await User.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    distanceField: 'distance',
                    maxDistance: parseInt(radius) * 1000, // Convert to meters
                    spherical: true
                }
            },
            {
                $match: {
                    gender: genderPreference
                }
            },
            {
                $project: {
                    name: 1,
                    gender: 1,
                    distance: {
                        $divide: ['$distance', 1000] // Convert distance to kilometers
                    }
                }
            }
        ]);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
