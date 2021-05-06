using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class MongoDBConfiguration : IMongoDBConfiguration
    {
        public string ConnectionString { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public bool UseSSL { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IMongoDBConfiguration
    {
        string ConnectionString { get; set; }
        string User { get; set; }
        string Password { get; set; }
        bool UseSSL { get; set; }
        string DatabaseName { get; set; }
    }
}
