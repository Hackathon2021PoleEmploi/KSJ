using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace MoulinetteArbres
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            List<Tree> resultListeArbres = new List<Tree>();
            //source region
            string montpellierPath = @"C:\\Users\\StephaneS\\Desktop\\data pollen\\montpellier.json";

            string nationalPath = @"C:\\Users\\StephaneS\\Desktop\\data pollen\\national.geojson";

            MontpellierRoot resultats =  JsonConvert.DeserializeObject<MontpellierRoot>(File.ReadAllText(montpellierPath));
            foreach (MontpellierFeature montpellierFeature in resultats.features)
            {
                resultListeArbres.Add(ConvertMontpellierToTree(montpellierFeature));
            }

            //send tree
        }
        
        public static Tree ConvertMontpellierToTree(MontpellierFeature montpellierFeature)
        {
            Tree tree = new Tree();

            //tree
            tree.Id = "MTP_" + montpellierFeature.properties.objectid.ToString();
            tree.Type = "";
            //property
            tree.Properties.GenreTitre = montpellierFeature.properties.nom_commun;
            tree.Properties.GenreFrancais = montpellierFeature.properties.nom_commun;
            tree.Properties.CodeDept = "34";
            //geometry
            tree.Geometry.Type = montpellierFeature.geometry.type;
            tree.Geometry.Coordinates = montpellierFeature.geometry.coordinates;

            return tree;
        }
        

        #region GeoJson
        //GeoJson
        public class Tree
        {
            public string Id { get; set; }
            public string Type { get; set; }
            public Geometry Geometry { get; set; } = new Geometry();
            public Properties Properties { get; set; } = new Properties();
        }

        public class Properties
        {
            public string GenreTitre { get; set; }
            public string GenreFrancais { get; set; }
            public string CodeDept { get; set; }
        }

        public class Geometry
        {
            public string Type { get; set; }
            public List<Double> Coordinates { get; set; }
        }
        #endregion

        #region Source Montpellier
        public class MontpellierProperties
        {
            public string name { get; set; }
            public int objectid { get; set; }
            public string idarbre { get; set; }
            public string nom_latin { get; set; }
            public string nom_commun { get; set; }
            public string plantation { get; set; }
            public string releva { get; set; }
            public string revetement { get; set; }
            public string architectu { get; set; }
            public string contrainte { get; set; }
            public int tronccirco { get; set; }
            public int couronnem { get; set; }
            public int hauteurm { get; set; }
            public int hfutcm { get; set; }
            public string eclairage { get; set; }
            public string ralrien { get; set; }
            public string canalisati { get; set; }
            public string signalisat { get; set; }
            public int age { get; set; }
        }

        public class MontpellierCrs
        {
            public string type { get; set; }
            public MontpellierProperties properties { get; set; }
        }

        public class MontpellierGeometry
        {
            public string type { get; set; }
            public List<double> coordinates { get; set; }
        }

        public class MontpellierFeature
        {
            public string type { get; set; }
            public MontpellierGeometry geometry { get; set; }
            public MontpellierProperties properties { get; set; }
        }

        public class MontpellierRoot
        {
            public string type { get; set; }
            public string name { get; set; }
            public MontpellierCrs crs { get; set; }
            public List<MontpellierFeature> features { get; set; }
        }
        #endregion
    }
}
