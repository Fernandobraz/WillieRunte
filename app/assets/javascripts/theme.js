function setAssetsWidth(initial){
  var width = initial || 30;

  $('.gallery .assets').find('.asset').each(function(){
    width = width + $(this).outerWidth(true);
  });

  $('.gallery .assets #assets_wrap').width(width * 2);
  $('.gallery .assets').width(width);
};

function resizeImage(img) {
  var imageWidth = $(this).width();
  $(this).parent().parent().find(".img").css('width',imageWidth);  
}


$(document).ready(function(){
  setAssetsWidth();

  if ($.browser.msie  && parseInt($.browser.version, 10) === 7) {
    var elem_calc_width = $('.social_icons_wrap').children().width() + parseInt($('.social_icons_wrap').children().css('marginLeft').replace('px', '')) + parseInt($('.social_icons_wrap ').children().css('marginRight').replace('px', '')) + parseInt($('.social_icons_wrap ').children().css('paddingLeft').replace('px', '')) + parseInt($('.social_icons_wrap ').children().css('paddingRight').replace('px', ''));

    $('.social_icons_wrap').width(elem_calc_width);
  }
 
  if($('body').hasClass('gallery')){
    //tomek
    if( _4ORMAT_DATA.theme.gallery_image_height != 'Full Browser Height') {
      $('.asset').lazyloader('img', {
        duration: 500,
        before_show: function(img) {
          $(img).closest('.asset').removeClass('loading');
        },
        complete: function(){
          $(this).parent().find('.image_text').show();
          
          // do the image resize again... Safari has been observed to not
          // retrigger the image onload for pixel.gif as well as the lazy
          // loaded image.
          resizeImage(this);
          setAssetsWidth();
        }
      });
    }

    $('.asset img').load(function(){
      setAssetsWidth();
    });
    
    // This sets width of copy for images on horizontal
    $(".asset.image img").load(function() {
      resizeImage(this);
    });

    // This sets width of copy under videos on horizontal
    $(".asset.video .embed_container").load(function() {
      var videoWidth = $(this).width();
      $(this).css('width',videoWidth);
    });

    // This is used for text on image elements
    $('a.image_text').toggle(function() {
      $(this).parent().find(".image_text_container").show();
      $(this).parent().find('a.image_text').text('x');
    }, function() {
      $(this).parent().find(".image_text_container").hide();
      $(this).parent().find('a.image_text').text('info');     
    });    
  }
  
  // Lazy Load listing images
  if($('body').hasClass('listing')){
    $('.asset .img').lazyloader('img', 1000);

    // Resizes elements to make sure that elements with caption have the same heights
    maxHeight = 0;
    $('.images_have_text .listing_image').each(function(){
      maxHeight = Math.max(maxHeight, $(this).height());
    });
    $('.images_have_text .listing_image').css('height', maxHeight + 'px');
	}

  // jQuery css3 drop down menu
  $('li.category .dropdown').each(function(index) {
    var height = 0;
    
    $(this).addClass('dd-' + index);

    $(this).children('li').each(function() {
      height += $(this).height();
    });

    $('head').append('<style type="text/css">' + '#menu .category:hover .dd-' + index + ', #menu .category:focus .dd-0 { height: ' + height + 'px; }</' + 'style>')
  });
});

$(window).load(function() {
  var test_height = $('#content .container').height() + $('#menu_container').height() * 2;

  if($('body').hasClass('gallery')) {
    $('.asset.txt .wrap').jScrollPane();
    //tomek
    if (_4ORMAT_DATA.theme.gallery_image_height != 'Full Browser Height') {
      $('.asset.title .wrap').jScrollPane();
    }
  }

  if($('body').hasClass('gallery') && $(window).height() < test_height) {
    $('#content .container').css({
      'top': $('#menu_container').height(),
      'marginTop': '0'
    });
  } else {
    $('#content .container').css({
      'top': '',
      'marginTop': ''
    });
  }
});

$(window).resize(function() {
  var test_height = $('#content .container').height() + $('#menu_container').height() * 2;

  if($('body').hasClass('gallery') && $(window).height() < test_height) {
    $('#content .container').css({
      'top': $('#menu_container').height(),
      'marginTop': '0'
    });
  } else {
    $('#content .container').css({
      'top': '',
      'marginTop': ''
    });
  }
});

//tomek
function getWindowSpace() {
  var footer_space = 0;

  if (_4ORMAT_DATA.theme.gallery_image_height == 'Full Browser Height' && _4ORMAT_DATA.theme.post_text != null && _4ORMAT_DATA.theme.post_text != '') {
    footer_space = $('.footer_text').outerHeight(true);
  }

  return $(window).height() - $('#menu_container').height() - footer_space;
}

function setAssetsSize(all) {
  var width = 0;
  var captions = [];
  var captionHeight;

  windowSpace = getWindowSpace();
  //set max height to 1200 px ?
  windowSpace = windowSpace > 1200 ? 1200 : windowSpace;
  
  if (all) {
    $('.asset.image').not('.loading').find('img').css('height', windowSpace);
  }
  $('.asset').each(function(){
    var that = $(this);

    if (that.hasClass('txt')) {
      
      that.css({'height': windowSpace}).find('.wrap').css({'height': windowSpace}).jScrollPane();

    } else if (that.hasClass('title')) {
      
      if (!that.find('img').length) {
        that.css('height', windowSpace).find('.wrap').css('height', windowSpace).jScrollPane();
      } else {
        that.css('height', windowSpace);
      }
      captionHeight = that.find('.asset_copy').outerHeight(true); 
      captions.push(captionHeight);

    } else if (that.hasClass('video')) {

      captionHeight = that.find('.copy').outerHeight(true);
      captionHeight = captionHeight ? captionHeight : 0;
      captions.push(captionHeight);
    }
  });

  var height = windowSpace - Math.max.apply(Math, captions);
  
  $('.asset.video .youtube_cont, .asset.video .vimeo_cont').css({'height': height, 'width': height * 1.4});
  $('.asset.video').width(height * 1.4);
  $('.asset.title').find('img').css({'height': height});

  $('.asset').each(function(){
    var that = $(this);
    width = width + that.outerWidth(true);
  });
  
  $('.gallery .assets #assets_wrap').width(width * 2).height(windowSpace);
  $('.gallery .assets').width(width);

}

var windowSpace;

$(function(){
  if ($('body.gallery').length) {
    if (_4ORMAT_DATA.theme.gallery_image_height == 'Full Browser Height') {  
      $('body, html').css('overflow-y', 'hidden');

      if (!$.browser.msie || $.browser.version != '7.0') {
        $('#content .container').css({
          'overflow': 'hidden'
        });
      }
      
      $('.asset').lazyloader('img', {
          duration: 500,
          before_show: function(img) {
            $(img).closest('.asset').removeClass('loading');
            windowSpace = getWindowSpace();
            img.css('height', windowSpace);
          },
          complete: function(){
            $(this).parent().find('.image_text').show();
            setAssetsSize(true);
          }
      });
      setAssetsSize();
      $(window).resize(function(){
        setAssetsSize(true);
      });
      $(window).load(function() { 
        setAssetsSize(true);
        $('#content .container').css({
            'top': $('#menu_container').height(),
            'marginTop': '0'
        });
      });
    }
  }
});