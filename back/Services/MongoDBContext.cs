using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Services
{
    public class MongoDBContextCredential
    {
        public string User { get; set; }
        public string Password { get; set; }
    }

    public class MongoDBContext
    {
        public static string ConnectionString { get; set; }
        public static string DatabaseName { get; set; }
        public static bool IsSSL { get; set; }
        public static MongoDBContextCredential Credential { get; set; }

        public IMongoDatabase Database { get; private set; }

        public MongoDBContext()
        {
            try
            {
                MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(ConnectionString));

                if (Credential != null)
                {
                    settings.Credential = MongoCredential.CreateCredential(DatabaseName, Credential.User, Credential.Password);
                }

                if (IsSSL)
                {
                    settings.SslSettings = new SslSettings { EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls12 };
                }

                var mongoClient = new MongoClient(settings);
                Database = mongoClient.GetDatabase(DatabaseName);
            }
            catch (System.Exception ex)
            {
                throw new System.Exception("Can not access to db server.", ex);
            }
        }
    }
}
