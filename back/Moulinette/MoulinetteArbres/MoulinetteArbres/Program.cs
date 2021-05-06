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

            List<Feature> resultListeArbres = new List<Feature>();
            //source region
            string montpellierPath = @"C:\\Users\\StephaneS\\Desktop\\data pollen\\montpellier.json";

            string nationalPath = @"C:\\Users\\StephaneS\\Desktop\\data pollen\\national.geojson";

            MontpellierRoot resultats =  JsonConvert.DeserializeObject<MontpellierRoot>(File.ReadAllText(montpellierPath));

        }


        #region GeoJson
        //GeoJson
        public class Feature
        {
            public string type { get; set; }
            public Geometry geometry { get; set; }
            public Properties properties { get; set; }
        }

        public class Properties
        {
            public string id { get; set; }
            public string titre { get; set; }
            public string nom_commun { get; set; }
            public int circonference { get; set; }
            public int hauteur { get; set; }
        }

        public class Geometry
        {
            public string type { get; set; }
            public List<object> coordinates { get; set; }
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
