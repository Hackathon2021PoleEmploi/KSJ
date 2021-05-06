﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
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
            _trees.Find(tree => tree.Id == id).FirstOrDefault();

        public List<Tree> Get(double x, double y, int minDistance = 0, int maxDistance = 2000)
        {
            /*IList<FilterDefinition<Tree>> myFilters = new List<FilterDefinition<Tree>>();

            myFilters.Add(Builders<Tree>.Filter.Near("geometry", x, y, minDistance, maxDistance));

            return _trees.Find(Builders<Tree>.Filter.And(myFilters)).ToList();*/

            string myQuery = "{ geometry: { $near: { $geometry: { type: 'Point' , coordinates:[ " + x + ", " + y + " ] }, $maxDistance: " + maxDistance + ", $minDistance: " + minDistance + " } } }";

            var e = BsonDocument.Parse(myQuery);

            return _trees.Find(myQuery).ToList<Tree>();
        }
    }
}
