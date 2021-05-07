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
db.createCollection('Trees');
db.getCollection('Trees').createIndex( { "geometry" : "2dsphere" } );
db.getCollection('Trees').createIndex( { "properties.titre": "text" } );
