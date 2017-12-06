using System.Web.Mvc;
using System.Web.Routing;
using Orchard;
using Orchard.DisplayManagement;
using Orchard.DisplayManagement.Implementation;
using Orchard.Environment;
using Orchard.Mvc;
using Orchard.Mvc.Filters;
using Orchard.UI.Admin;
using Orchard.UI.Resources;

namespace Hazza.Christmas {
    public class SnowFilter : FilterProvider, IResultFilter {
        private readonly IWorkContextAccessor _wca;
        private readonly IResourceManager _resourceManager;

        public SnowFilter(IWorkContextAccessor wca, IShapeFactory factory, IResourceManager resourceManager) {
            _wca = wca;

            Shape = factory;
            _resourceManager = resourceManager;
        }

        public dynamic Shape { get; set; }

        public void OnResultExecuting(ResultExecutingContext filterContext) {
            // ignore admin urls
            if (AdminFilter.IsApplied(new RequestContext(filterContext.HttpContext, new RouteData()))) return;

            if (filterContext.IsChildAction) {
                return;
            }


            var context = _wca.GetContext();
            var snow = Shape.Snow();

            _resourceManager.Require("script", "snow").AtFoot();
            _resourceManager.Require("stylesheet", "snow").AtHead();
            context.Layout.Body.Items.Insert(0, snow);
        }

        public void OnResultExecuted(ResultExecutedContext filterContext) {
        }
    }
}