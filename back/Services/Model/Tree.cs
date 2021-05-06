using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Services
{
    [BsonIgnoreExtraElements]
    public class Tree
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("type")]
        public string Type { get; set; }

        //[BsonExtraElements]
        //public BsonDocument ExtraElements { get; set; }

        [BsonElement("properties")]
        public Properties Properties { get; set;  }

        [BsonElement("geometry")]
        public Geometry Geometry { get; set; }
    }
}
