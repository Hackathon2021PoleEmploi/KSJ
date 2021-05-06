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
        [BsonElement("id")]
        public string Id { get; set; }

        [BsonElement("code_dept")]
        public string CodeDept { get; set; }

        [BsonElement("code_insee")]
        public string CodeInsee { get; set; }

        [BsonElement("code_iris")]
        public string CodeIris { get; set; }

        [BsonElement("genre_francais")]
        public string GenreFrancais { get; set; }

        [BsonElement("genre_latin")]
        public string GenreLatin { get; set; }

        //[BsonExtraElements]
        //public BsonDocument ExtraElements { get; set; }
    }
}
