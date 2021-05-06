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
        public ActionResult<List<Tree>> Get()
        {
            return _treeService.Get();
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
    }
}
