using Orchard.UI.Resources;

namespace Hazza.Christmas {
    public class ResourceManifest : IResourceManifestProvider {
        public void BuildManifests(ResourceManifestBuilder builder) {
            var manifest = builder.Add();
            // SCRIPTS
            manifest.DefineScript("snow").SetUrl("snow.js");

            // STYLES
            manifest.DefineStyle("snow").SetUrl("snow.css");
        }
    }
}