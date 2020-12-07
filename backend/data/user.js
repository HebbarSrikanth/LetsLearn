import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@letslearn.com',
        password: bcrypt.hashSync('123456', 10),
        phone: '1234567890',
        isAdmin: true
    },
    {
        name: 'User 1',
        email: 'user1@letslearn.com',
        password: bcrypt.hashSync('123456', 10),
        phone: '098754321'
    },
    {
        name: 'User 2',
        email: 'user2@letslearn.com',
        password: bcrypt.hashSync('123456', 10),
        phone: '0789456123'
    }
]

export default users