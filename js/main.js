$(function () {
	$("[data-fancybox]").fancybox({
	});
	$("[data-fancybox]").click(function(){
		$(".fancybox-content").css("width",  $(this).attr("mWidth") );
		$(".fancybox-content").css( "height",$(this).attr("mHeight"));
	});
	/*$( document ).tooltip({
      items: "[data-caption]",
      content: function() {
        var element = $( this );
        if ( element.is( "[data-caption]" ) ) {
          return element.attr( "data-caption" );
        }
      }
    });*/
	
	$(".options img").click(function(){
		$(this).parent().find(".option").fadeIn();
	});
	$(".option").click(function(){
		$(".options a").fadeOut();

	});
	$('.nav-link').on('click', function () {
		console.log("running");
	  $('.navbar-collapse').removeClass('show');
	  $(this).addClass('active');
	});
});





