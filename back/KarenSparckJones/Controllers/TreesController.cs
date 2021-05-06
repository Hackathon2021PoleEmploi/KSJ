using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreesController : ControllerBase
    {
        private readonly TreeService _treeService;

        public TreesController(TreeService treeService)
        {
            _treeService = treeService;
        }

        [HttpGet]
        public ActionResult<List<Tree>> Get() => _treeService.Get();

        [HttpGet]
        [Route("Check")]
        public ActionResult<List<Tree>> Get(double x, double y, int minDistance = 0, int maxDistance = 2000, string genres = null)
        {
            string[] myGenres = genres != null ? genres.Split(',').Select(g => g.ToLower()).ToArray() : null;

            return _treeService.Get(x, y, minDistance, maxDistance, myGenres);
        }

        [HttpGet("{id:length(24)}", Name = "GetTree")]
        public ActionResult<Tree> Get(string id)
        {
            var tree = _treeService.Get(id);

            if (tree == null)
            {
                return NotFound();
            }

            return tree;
        }

        [HttpPost]
        public ActionResult Post(Tree tree)
        {
            _treeService.Create(tree);
            return Ok();
        }
    }
}
