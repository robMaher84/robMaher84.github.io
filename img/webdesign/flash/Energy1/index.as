
package {
	import flash.text.TextField;
	import flash.display.MovieClip;
	import flash.net.*;
	import flash.events.Event;
	import flash.xml.XMLDocument;
	import flash.display.Loader;
	import flash.errors.IOError;
	import flash.events.IOErrorEvent;
	import flash.geom.Point;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.display.DisplayObject;

	import flash.filters.BitmapFilter;
	import flash.filters.BitmapFilterQuality;
	import flash.filters.BlurFilter;
	import flash.display.Bitmap;
	import flash.display.BitmapData;


	public class index extends MovieClip {
		private var xml:XMLDocument;
		private var loader:URLLoader = new URLLoader();
		private var imgLoader:Loader = new Loader();
		private var items:Array = new Array();
		private var cItems:Array = new Array();
		private var loaders:Array = new Array();
		private var c:int = 0;
		private var radius:Point;
		private var center:Point;
		private var speed:Number=0.01;
		private var currentItem:CarouselItem;
		private var backgroundMC:BackgroundMC;
		private var container:Sprite;
		private var blurFactor:Number;
		private var k:int = 0;
		private var tooltip:Tooltip;
		private var thisBlur:Number;
		public function index() {
			// create and add the background
			//backgroundMC = new BackgroundMC();
			//this.addChild(backgroundMC);

			// create container holding icons
			container = new Sprite;
			addChild(container);
			container.y = -2000;

			// create tooltip for hovering
			tooltip = new Tooltip();
			addChild(tooltip);

			// for blogging purposes
			//radius=new Point(275,40);
			//center=new Point(325, 150);

			// setting variables used for positioning
			//radius=new Point(stage.stageWidth/2-100,40);
			//center=new Point(stage.stageWidth/2, stage.stageHeight/2);

			//radius=new Point(525/2-100,40);
			radius=new Point(162,40);
			center=new Point(162, stage.stageHeight/2);

			// download xml-file
			getXML();

			// mouse not hovering yet
			tooltip.visible = false;
		}
		public function getXML():void {
			try {
				loader.addEventListener(Event.COMPLETE, onLoaderComplete);
				loader.addEventListener(IOErrorEvent.IO_ERROR, onLoadedError);
				loader.load(new URLRequest("images.xml"));
			} catch (error:IOErrorEvent) {
				trace("ERROR" + error);
			}
		}
		private function onLoadedError(e:IOErrorEvent) {
			var error:ErrorScreen = new ErrorScreen();
			error.error.text = e.text;
			addChild(error);
			trace("ERROR" + e.text);
		}

		public function onLoaderComplete(e:Event):void {
			xml = new XMLDocument();
			xml.ignoreWhite = true;
			xml.parseXML(loader.data);
			createItemsFromXML();
			addEventListener(Event.ENTER_FRAME, mouseMover);
		}

		private function createItemsFromXML():void {
			var numIcons:int = xml.firstChild.childNodes.length;
			for (var i:int = 0; i < numIcons; i++) {
				//adding the object(item) to the array
				items.push(xml.firstChild.childNodes[i].attributes);
			}
			addItemsToScreen();
		}

//var delay = 1000; // 1 second
//var count = 0;
//var timerId = setInterval(createMC,delay, this);
//function createMC(obj){
//         trace("function");
//        var thumb:MovieClip = obj.attachMovie("thumb", "thumb"+i, i, {_x:xPos, _y:yPos});
//                  thumb.gotoAndPlay(2);
//                  obj.count++;
//                  if(count >= _global.projThumb.length){
//                           clearInterval(obj.timerID);
//                   }
//        }		
		
		private function addItemsToScreen():void {
			//for (var k:int = 0; k < items.length; k++) {

				loaders[k] = new Loader();
				loaders[k].contentLoaderInfo.addEventListener(Event.COMPLETE, onItemImageLoaded);
				loaders[k].load(new URLRequest(items[k].image));				
				k+=1;
//				loaders[k].load(new URLRequest("http://dev.spaceboyinteractive.net/steaz/energy/blank.png"));								
//		        thisMAGMA = attachMovie("dGreen", items[k].image, k);				
//				loaders[k].addChild(attachMovie(items[k].image, items[k].image, k));
//				loaders[k].
			//}
		}
		

		private function onItemImageLoaded(e:Event):void {

			var t:CarouselItem=new CarouselItem(loaders[c].content);

//			t.addChild(thisMAGMA);
			t.angle=(c*((Math.PI*2)/items.length));
			//t.angle = (c*90);
			t.addEventListener(Event.ENTER_FRAME,onEnter);
			t._name = xml.firstChild.childNodes[c].attributes.tooltip;
			cItems[c] = t;
//			var mc:Sprite = new ;
//				cItems[c].addchild(dGreen());			
			cItems[c].addEventListener(MouseEvent.MOUSE_OVER, onOver);
			cItems[c].addEventListener(MouseEvent.MOUSE_OUT, onOut);
			cItems[c].addEventListener(MouseEvent.MOUSE_DOWN, onDown);
			container.addChild(cItems[c]);
			if(k != 4){
				addItemsToScreen();
			}			
			c++;			
		}
		private function onOver(e:MouseEvent):void {
			var obj:CarouselItem = CarouselItem(e.currentTarget);
			currentItem = obj;
			trace(obj._name);
			switch (obj._name) {
				case "GREEN ENERGY" :
//					tooltip.title.text = "Look Ma, no artificial ingredients.";
					trace("1");
					tooltip.gotoAndStop(1);
					break;
				case "LIME ENERGY" :
//					tooltip.title.text = "Demand energy reform. Go hhhhhhhhhhhhhhhhorganic!";
					trace("2");
					tooltip.gotoAndStop(2);					
					break;
				case "ORANGE ENERGY" :
//					tooltip.title.text = "Kick start your Chi!";
					trace("3");
					tooltip.gotoAndStop(3);					
					break;
				case "GREEN DIET" :
//					tooltip.title.text = "If being Fair Trade Certified is wrong, I don’t want to be right.";
					trace("4");
					tooltip.gotoAndStop(4);					
					break;
				case "ORANGE DIET" :
//					tooltip.title.text = "If being Fair Trade Certified is wrong, I don’t want to be right.";
					trace("5");
					tooltip.gotoAndStop(4);					
					break;

				default :
					tooltip.gotoAndStop(1);				
					trace("Look Ma, no artificial ingredients.");
			}
//			var tmp:String = obj._name;
//			tooltip.width = tmp.length*11;
			tooltip.visible = true;

		}
		private function onOut(e:MouseEvent):void {
			tooltip.visible = false;
		}

		private function onDown(e:MouseEvent):void {
			var obj:CarouselItem = CarouselItem(e.currentTarget);
			currentItem = obj;
			trace("[CarouselItem] - " + obj._name + " pressed");
		}

		private function onEnter(evt:Event):void {
			if(c==4) {
			var obj:CarouselItem=CarouselItem(evt.currentTarget);
			obj.x=Math.cos(obj.angle) *radius.x +center.x+320;
			obj.y=Math.sin(obj.angle) *radius.y +center.y+60;

			var blur:BlurFilter = new BlurFilter();
			//trace(obj.scaleY)
			thisBlur = ((10-(obj.scaleY/.1))*20);
			blur.blurX = thisBlur;
			blur.blurY = thisBlur;
			blur.quality = 3;

			var filterArray:Array = new Array(blur);
			obj.filters = filterArray;

			if (tooltip.visible) {
				tooltip.x = currentItem.x;
				tooltip.y = currentItem.y-80;
			}
			var scale:Number=obj.y /(center.y+radius.y);
			obj.scaleX=obj.scaleY=scale*1;
			obj.angle=(obj.angle+speed);
			arrange();
			}
		}
		public function arrange():void {
			cItems.sortOn("y", Array.NUMERIC);
			var i:int = cItems.length;
			while (i--) {
				if (container.getChildAt(i) != cItems[i]) {
					container.setChildIndex(cItems[i], i);
				}
			}
		}

		public function mouseMover(e:Event):void {
			if(c==4) {			
			//trace(mouseX - (center.x+330));
			speed = (mouseX - (center.x+330)) / 5000;
			
			}
		}
	}
}