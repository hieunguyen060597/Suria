(function ($) {

    window.onload = function () {
        $(document).ready(function () {		
			back_to_top();
			moblie_bar();
            height_banner();
            fix_height_issue();
            slider_related_post();
            stuck_header();
            search_header();
        });
    };

})(jQuery);



function back_to_top() {
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');
	//hide or show the "back to top" link
	$(window).scroll(function () {
		($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if ($(this).scrollTop() > offset_opacity) {
			$back_to_top.addClass('cd-fade-out');
		}
	});
	//smooth scroll to top
	$back_to_top.on('click', function (event) {
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0,
		}, scroll_top_duration
		);
	});
}


function moblie_bar() {
    var $main_nav = $('#main-nav');
    var $toggle = $('.toggle');

    var defaultData = {
        maxWidth: false,
        customToggle: $toggle,
        // navTitle: 'All Categories',
        levelTitles: true,
        pushContent: '#container'
    };

    // add new items to original nav
    $main_nav.find('li.add').children('a').on('click', function() {
        var $this = $(this);
        var $li = $this.parent();
        var items = eval('(' + $this.attr('data-add') + ')');

        $li.before('<li class="new"><a>' + items[0] + '</a></li>');

        items.shift();

        if (!items.length) {
            $li.remove();
        } else {
            $this.attr('data-add', JSON.stringify(items));
        }

        Nav.update(true);
    });

    // call our plugin
    var Nav = $main_nav.hcOffcanvasNav(defaultData);

    // demo settings update

    const update = (settings) => {
        if (Nav.isOpen()) {
            Nav.on('close.once', function() {
                Nav.update(settings);
                Nav.open();
            });

            Nav.close();
        } else {
            Nav.update(settings);
        }
    };

    $('.actions').find('a').on('click', function(e) {
        e.preventDefault();

        var $this = $(this).addClass('active');
        var $siblings = $this.parent().siblings().children('a').removeClass('active');
        var settings = eval('(' + $this.data('demo') + ')');

        update(settings);
    });

    $('.actions').find('input').on('change', function() {
        var $this = $(this);
        var settings = eval('(' + $this.data('demo') + ')');

        if ($this.is(':checked')) {
            update(settings);
        } else {
            var removeData = {};
            $.each(settings, function(index, value) {
                removeData[index] = false;
            });

            update(removeData);
        }
    });
}

function height_banner(){
    var height_bn = $(".main-banner figure").height();
    var height_minus = $(".header").height();
    height_bn = height_bn - height_minus;
    $(".main-banner figure").height(height_bn);
    $(window).bind('resize', function(){
        var height_bn = $(".main-banner figure").height();
        var height_minus = $(".header").height();
        height_bn = height_bn - height_minus;
        $(".main-banner figure").height(height_bn);
    })
}


function fix_height_issue(){
    var width = $(".images-resue").width();
    var height = $(".images-resue").height();
    var height_2 = $(".title-product").height();
    var width_blogs = $(".images-blogs").width();
    var height_blog = $(".images-blogs").height();

    height = width / 1.93;
    $(".images-resue").height(height);
    height_2 = height * 1.2;
    $(".title-product").height(height_2);
    height_blog = width_blogs / 1.1;
    $(".images-blogs").height(height_blog);

    $(window).bind('resize', function(){
        var width = $(".images-resue").width();
        var height = $(".images-resue").height();
        var height_2 = $(".title-product").height();
        var width_blogs = $(".images-blogs").width();
        var height_blog = $(".images-blogs").height();
    
        height = width / 1.93;
        $(".images-resue").height(height);
    
        height_2 = height * 1.2;
        $(".title-product").height(height_2);

        height_blog = width_blogs / 1.1;
        $(".images-blogs").height(height_blog);
    })
}

function slider_related_post(){
    $('.related-post .owl-carousel').owlCarousel({
        loop:true,
        margin: 30,
        autoplay:true,
        nav:false,
        dots: true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            576:{
                items:1,
            },
            768:{
                items:2,
            },
            1024:{
                items:3,
            },

            1400:{
                items:3,
            }
        }
   })
}

function stuck_header(){
    var header = $(".header");
    var check = true;

    window.addEventListener("scroll", function(){
        var off_set = window.pageYOffset;
        if(off_set > 50){
            if(check == true){
                header.addClass("stuck");
                check = false;
            }
        }
        else{
            if(check == false){
                header.removeClass("stuck");
                check = true;
            }
        }
    })
}

function search_header(){
    $("#search-hd").click(function(){
        $("body").append("<div class = 'overlay-search'></div>");
        $("body").append("<form class = 'form-s-header'><input class = 'form-control' placeholder='Search'/><button><i class='fa fa-search'></i></button></form>");
        $(".form-s-header").fadeIn();
        $(".form-s-header").addClass("d-flex");
        $(".overlay-search").click(function(){
            $(".form-s-header").remove();
            $(".overlay-search").remove();
        });
    });
}