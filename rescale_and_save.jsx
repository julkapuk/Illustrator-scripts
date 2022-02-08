#include './lib/files.js'
#include './lib/utils.js'

var inputFolder = Folder.selectDialog( "Please select the folder");
var fileList = inputFolder.getFiles();

for(d=0; d<fileList.length; d++) {

    var docRef = app.open(fileList[d]);

    var doc = app.activeDocument;
    var artboard = doc.artboards[0];
    
    // Screen = one image (.png / .gif)
    var screen = doc.pageItems[0];
    

    // screen.height and screen.width is always in PIXELS
    
        $.writeln(" ");
        $.writeln(d+1 + "/"+ fileList.length + " : " + fileName); 
        $.writeln("Before: " + screen.width + " x " + screen.height);      
        
    // If you want to enter in millimeters   
//~     var pageWidthInMm = 150;
//~     var pageHeightInMm = 210;

//~     var pageWidth = pageWidthInMm * 2.8346;
//~     var maxpageHeight = pageHeightInMm * 2.8346;
    
    // in pixels
    var pageWidth = 600;
    var maxpageHeight = 3000;

    if (screen.width > pageWidth){

        var scale = Math.floor((pageWidth/screen.width) * 100);
            
        //Rescale screen
        $.writeln("Scale: " + scale);
        screen.resize(scale, scale);
        
        
        // or Change Screen Width to Page Width
        //screen.height = (pageWidth * screen.height) / screen.width);
        //screen.width = pageWidth;
        
        // If screen is too long after scaling
        if (screen.height > maxpageHeight){

            $.writeln("Screen is too long");
            
            var scaleForHeight = (maxpageHeight/screen.height) * 100;
            screen.resize(scaleForHeight, scaleForHeight);
        }
        
        $.writeln("After: " + screen.width + " x " + screen.height);
     }
     
     
    screen.selected = true;
    doc.fitArtboardToSelectedArt(0);
    
    var reg = /^\w+/g;
    var fileName = (doc.name).match(reg); // utils.js include required
        
    // Make a new directory if needed
    var dir = new Folder('~/Desktop/'+inputFolder.name+'ScaledUp');
    
    if (!dir.exists) {
    dir.create();
    }
     
     savePNG(dir + "/" + fileName + ".png", 1, false);
     doc.close(SaveOptions.DONOTSAVECHANGES)
}