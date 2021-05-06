using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IMongoDBConfiguration settings)
        {
            var myClient = new MongoClient(settings.ConnectionString);
            var myDatabase = myClient.GetDatabase(settings.DatabaseName);

            _users = myDatabase.GetCollection<User>("Users");
        }

        public List<User> Get() =>
            _users.Find(user => true).ToList();

        public User Get(string id) =>
            _users.Find<User>(user => user.Id == id).FirstOrDefault();
    }
}
