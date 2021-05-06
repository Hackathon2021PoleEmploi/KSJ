using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Services
{
    public class TreeService
    {
        private readonly IMongoCollection<Tree> _trees;

        public TreeService(IMongoDBConfiguration settings)
        {
            var myClient = new MongoClient(settings.ConnectionString);
            var myDatabase = myClient.GetDatabase(settings.DatabaseName);

            _trees = myDatabase.GetCollection<Tree>("Trees");
        }

        public List<Tree> Get() =>
            _trees.Find(tree => true).ToList();

        public Tree Get(string id) =>
            _trees.Find<Tree>(tree => tree.Id == id).FirstOrDefault();
    }
}
