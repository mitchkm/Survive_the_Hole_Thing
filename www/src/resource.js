var asset = {
    Asteroid_png : "asset/asteroid.png",
    Background_png : "asset/background.png",
    Blackhole_png : "asset/blackhole.png",
    Ufo_png : "asset/ufo.png"
};

var g_resources = [];
for (var i in asset) {
    g_resources.push(asset[i]);
}