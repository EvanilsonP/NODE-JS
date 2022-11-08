const users = [];
// AddUser, removeUser, getUser, getUsersInRoom;

const addUser = ({id, username, room}) => {
    // Clear the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // validate the data
    if(!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    };
    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username;
    });

    // validate username
    if(existingUser) {
        return {
            error: 'Username is in use!'
        }
    };

    // Store user
    const user = {id, username, room};
    users.push(user);
    return {user};
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
};

addUser({
    id: 200,
    username: 'Belzzy',
    room: 'free'
});

const removedUser = removeUser(200);

console.log(removedUser);
console.log(users);
