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
    public class Properties
    {
        [BsonElement("code_dept")]
        public string CodeDept { get; set; }

        [BsonElement("genre_francais")]
        public string GenreFrancais { get; set; }

        [BsonElement("titre")]
        public string GenreTitre { get; set; }

        //[BsonExtraElements]
        //public BsonDocument ExtraElements { get; set; }
    }
}
