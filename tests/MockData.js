const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'user@test.com',
    isadmin: false
}

const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWQiOjEsImlz
    QWRtaW4iOmZhbHNlLCJpYXQiOjE3MDg0NTgxNjN9.pd3_L511QMULeLOD8QMJKz8b34sbUt9XDamKM1lvICM`;

const mockCharacters = [
    {id : 1,
    creatorID : 1,
    charName : 'Test',
    race : 'test',
    className : 'test',
    level : 1,
    exp : 0}
]

export {mockUser, mockToken, mockCharacters};