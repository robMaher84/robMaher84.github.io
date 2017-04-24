$(function () {
	$("[data-fancybox]").fancybox({
	});
	$("[data-fancybox]").click(function(){
		$(".fancybox-content").css("width",  $(this).attr("mWidth") );
		$(".fancybox-content").css( "height",$(this).attr("mHeight"));
	});
	$(".options img").click(function(){
		$(this).parent().find(".option").fadeIn();
	});
	$(".option").click(function(){
		$(".options a").fadeOut();
	});
	$('.nav-link').on('click', function () {
	  	$('.nav-item').removeClass("active");
		$('.nav-link').removeClass("active");
		$('.navbar-collapse').removeClass('show');
		$(this).addClass('active');
		$(this).parent().addClass('active');
	});
});





