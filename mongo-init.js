db.createUser(
    {
        user: "user1",
        pwd: "user1",
        roles: [
            {
                role: "readWrite",
                db: "KSJ"
            }
        ]
    }
);