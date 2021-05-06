using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Services
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("allergies")]
        public string[] Allergies { get; set; }
    }
}
