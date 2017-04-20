
package
{
import flash.display.Sprite;
import flash.display.DisplayObject;
import flash.display.Bitmap;
import flash.display.BitmapData;
//import flash.filters.BitmapFilter;  
//import flash.filters.BitmapFilterQuality;  
//import flash.filters.BlurFilter; 

public class CarouselItem extends Sprite
{
private var _angle:Number;
private var _image:DisplayObject;
private var _mirror:DisplayObject;
public var _name:String = "";

public function CarouselItem(original:DisplayObject){
// Create Container
var container:Sprite = new Sprite();
container.name = "copy";

// create bitmapdata
var data:BitmapData = new BitmapData(original.width, original.height, true, 0xFFFFFF);
data.draw(original);

// create bitmap
var bmp:Bitmap = new Bitmap(data.clone());
bmp.smoothing = true;

//var blur:BlurFilter = new BlurFilter();
//	blur.blurX = 0;
//	blur.blurY = 0;
//	blur.quality = 5;

// add the bitmap to container
container.addChild(bmp);

_image = original;
image.scaleX = .9;
image.scaleY = .9;
image.x = -original.width/2;
image.y = -original.height/2;
bmp.scaleX = -.9;
bmp.scaleY = -.9;
bmp.x = original.width/2;
bmp.y = image.y+image.height*2;

//var filterArray:Array = new Array(blur);
//	image.filters = filterArray;
//	bmp.filters = filterArray;

// create the mask for reflection
var masker:maskMC = new maskMC();
masker.x = bmp.x;
masker.y = bmp.y;
masker.cacheAsBitmap = true;
bmp.cacheAsBitmap = true;
bmp.mask = masker;

// attaching the content
this.addChild(container);
this.addChild(masker);
this.addChild(original);
}
public function get image():DisplayObject{
return _image;
}

public function set image(val:DisplayObject):void{
_image=val;
}
public function get angle():Number{
return _angle;
}

public function set angle(val:Number):void{
_angle=val;
}
}
}
