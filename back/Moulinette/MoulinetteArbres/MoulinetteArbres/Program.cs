using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using System.Net;

namespace MoulinetteArbres
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Tree> resultListeArbres = new List<Tree>();
            //source region
            string montpellierPath = @"C:\Users\StephaneS\Desktop\data pollen\montpellier.json";

            string nationalPath = @"C:\Users\StephaneS\Desktop\data pollen\national.geojson";
            /*
            MontpellierRoot resultats = JsonConvert.DeserializeObject<MontpellierRoot>(File.ReadAllText(montpellierPath));
            foreach (MontpellierFeature montpellierFeature in resultats.features)
            {
                if (montpellierFeature.properties.nom_commun != null)
                {

                    resultListeArbres.Add(ConvertMontpellierToTree(montpellierFeature));
                }
            }
            */

            //mapping arbres nationa
            NationRoot resultatsNationaux = JsonConvert.DeserializeObject<NationRoot>(File.ReadAllText(nationalPath));
            foreach (NationFeature nationFeature in resultatsNationaux.features)
            {
                if (nationFeature.properties.genre_francais != null && nationFeature.properties.code_dept == "34")
                {
                    resultListeArbres.Add(ConvertNationalToTree(nationFeature));
                }
            }

            ExportTree(resultListeArbres);
        }

        public static void ExportTree(List<Tree> someTree)
        {
            foreach (Tree tree in someTree)
            {
                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://back.traefik.me/api/trees");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json = JsonConvert.SerializeObject(tree);

                    streamWriter.Write(json);
                }
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            }
        }

        public static Tree ConvertNationalToTree(NationFeature nationFeature)
        {
            Tree tree = new Tree();
            //tree
            tree.Id = "NAT_" + nationFeature.properties.id;
            tree.Type = "";
            //property
            tree.Properties.GenreTitre = nationFeature.properties.genre_francais;
            tree.Properties.GenreFrancais = nationFeature.properties.genre_francais;
            tree.Properties.CodeDept = "34";
            //geometry
            tree.Geometry.Type = nationFeature.geometry.type;
            tree.Geometry.Coordinates = nationFeature.geometry.coordinates;

            return tree;
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
            var any = montpellierFeature.geometry.coordinates;
            tree.Geometry.Coordinates = montpellierFeature.geometry.coordinates;
            tree.Geometry.Coordinates.Reverse();

            return tree;
        }


        #region GeoJson
        //source region 
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

        #region Source Nation
        // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
        public class NationProperties
        {
            public string name { get; set; }
            public int id { get; set; }
            public string id_source { get; set; }
            public int source_id { get; set; }
            public double x { get; set; }
            public double y { get; set; }
            public string code_dept { get; set; }
            public string code_insee { get; set; }
            public string code_iris { get; set; }
            public string genre_francais { get; set; }
            public object genre_latin { get; set; }
            public object hauteur { get; set; }
            public object categorie_hauteur { get; set; }
        }

        public class NationCrs
        {
            public string type { get; set; }
            public Properties properties { get; set; }
        }

        public class NationGeometry
        {
            public string type { get; set; }
            public List<double> coordinates { get; set; }
        }

        public class NationFeature
        {
            public string type { get; set; }
            public NationProperties properties { get; set; }
            public NationGeometry geometry { get; set; }
        }

        public class NationRoot
        {
            public string type { get; set; }
            public NationCrs crs { get; set; }
            public List<NationFeature> features { get; set; }
        }
        #endregion
    }
}
