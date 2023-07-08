
const fs = require('fs');

module.exports.getRandomUser = (req, res, next) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            const users = JSON.parse(data);
            //   return res.status(200).json(users);
            const randomIndex = Math.floor(Math.random() * users.length);
            const randomUser = users[randomIndex];
            return res.status(200).json(randomUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Invalid data' });
        }
    });
};


module.exports.getAllUsers = (req, res, next) => {

    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            const users = JSON.parse(data);
            const {limit}=req.query;
            if(limit){
                return res.status(200).json(users.slice(0,limit))
            }else{
                return res.status(200).json(users);
            }
            
            
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Invalid data' });
        }

        
        
    });
        
};

module.exports.addUser = (req, res, next) => {
    const requiredProperties = ['Id', 'gender', 'name', 'contact', 'address', 'photoUrl'];
    const missingProperties = requiredProperties.filter(prop =>!(prop in req.body));
    // console.log(missingProperties);
    if (missingProperties.length > 0) {
        return res.status(400).json({ error: `Missing required properties: ${missingProperties.join(', ')}` });
    }

    // Read the existing data from data.json
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            const users = JSON.parse(data);

            // Create a new user object
            const newUser = {
                Id: req.body.Id,
                gender: req.body.gender,
                name: req.body.name,
                contact: req.body.contact,
                address: req.body.address,
                photoUrl: req.body.photoUrl
            };

            // Add the new user to the existing array
            users.push(newUser);

            // Write the updated data back to data.json
            fs.writeFile('data.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.status(200).json({ message: 'User saved successfully' });
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Invalid data' });
        }
    });
};

module.exports.updateUser = (req, res, next) => {
    const {Id}= req.params;

    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            const users = JSON.parse(data);

            // Find the user with the specified ID from data.json file.
            const userToUpdate = users.find(user => user.Id == Id);

            if (!userToUpdate) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Update the properties of the user with the changes from the request body
            if (req.body.gender) {
                userToUpdate.gender = req.body.gender;
            }

            if (req.body.name) {
                userToUpdate.name = req.body.name;
            }

            if (req.body.contact) {
                userToUpdate.contact = req.body.contact;
            }

            if (req.body.address) {
                userToUpdate.address = req.body.address;
            }

            if (req.body.photoUrl) {
                userToUpdate.photoUrl = req.body.photoUrl;
            }

            // Write the updated data in data.json file.
            fs.writeFile('data.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.status(200).json({ message: 'User updated successfully' });
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Invalid data' });
        }
    });
};





module.exports.deleteUser = (req, res, next) => {
    const {Id} = req.params; // Assuming the user ID is passed as a URL parameter

    // Read the existing data from data.json
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            let users = JSON.parse(data);

            // Find the index of the user with the specified ID in the users array
            const restUsers=users.filter(user=>user.Id != Id);
            const s=users.filter(user=>user.Id == Id);
            if(s.length==0){
                return res.send("User not founded")
            }

            // Write the updated data back to data.json
            fs.writeFile('data.json', JSON.stringify(restUsers, null, 2), (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.status(200).json({ message: 'User deleted successfully' });
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Invalid data' });
        }
    });
};

module.exports.updateMany = (req, res, next) => {
    const updates = req.body;
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            let users = JSON.parse(data);

            updates.forEach(update =>{
                const userUpdate = users.find(user =>user.Id == update.Id);
                if (userUpdate) {
                    Object.assign(userUpdate, update);
                }
            });

            fs.writeFile('data.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.status(200).json({ message: 'Users updated successfully' });
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Invalid data' });
        }
    });
};
