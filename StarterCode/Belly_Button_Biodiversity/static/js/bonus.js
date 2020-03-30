
function DrawGauge(wfreq) {
    var level = parseFloat(wfreq) * 20;

    var degrees = 180 - level;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    var mainPath = 'M -.0 -0.05 L .0 0.05 L ';
    var pathX = String(x);
    var space = ' ';
    var pathY = String(y);
    var pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);
    
    var data = [
        {
            
        }
    ]
    
    
}