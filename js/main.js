"use strict";
$(function () {

    function if_mobile() {
        if ($(window).width() < 760) return true;
    }

    function if_tab() {
        if ($(window).width() < 1001) return true;
    }

    /*** BANNER SLIDESHOW ***/
    $('.bx_slider').each(function () {
        var $this = $(this);
        $this.data('linkedEl', $this.bxSlider({
            auto: true,
            controls: false,
            pager: true,
            pause: 6500,
            autoHover: true,
            speed: 500,
            adaptiveHeight: true
        }));
    })

    /*** BANNER CARUSEL ***/
    $('.items_carusel>ul').each(function () {
        var x = 4;
        if (if_mobile()) {
            x = 1;
        }
        var $this = $(this);
        $this.data('linkedEl', $this.bxSlider({
            minSlides: x,
            maxSlides: x,
            slideWidth: 500,
            slideMargin: 0,
            pager: false,
            controls: true,
            autoHover: true,
            speed: 499,
            auto: false
        }));
    })

    /*** TABS ***/
    $('.tabs_controls li').click(function (e) {
        e.preventDefault();
        $(this).addClass('on').siblings().removeClass('on');
        $(this).parents('.tabs').find('.tab:eq(' + $(this).index() + ')').addClass('on').siblings().removeClass('on');
    }).first().click();


    /*** CUSTOM SELECTBOX ***/


    function close_pop(pop) {
        var pop = pop || $('.pop_up:visible'), glow = $('.pop_glow');
        $('html').removeClass('pop_called');
        pop.hide();
        glow.hide();
    }

    $('.pop_close, .pop_glow').click(function (e) {
        e.preventDefault();
        var pop = ($(this).parents('.pop_up').length) ? $(this).parents('.pop_up') : $('.pop_up:visible');
        close_pop(pop);
    })

    $('[data-pop-link]').click(function (e) {
        e.preventDefault();
        var pop = $('.pop_up[data-pop="' + $(this).attr('data-pop-link') + '"]');
        $('html').addClass('pop_called');
        $('.pop_glow').show().css('height', $(document).height());
        pop.show().css({'top': $(window).scrollTop() + $(window).height() / 2 - pop.height() / 2});
    })


    $('[data-section-link]').click(function (e) {
        e.preventDefault();
        $("html, body").animate({scrollTop: $('[data-section="' + $(this).attr('data-section-link') + '"]').offset().top + 'px'}, 400);
    })


    $('.img_thumbs a').click(function (e) {
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active').parents('.img_switch').find('.img_main').attr('src', $(this).attr('href'));
    })


    $('.cC').click(function (e) {
        e.preventDefault();
        if ($(this).is(':radio')) $("input[name='" + $(this).find('input').attr('name') + "']").prop('checked', false).parents('.cC').removeClass('checked');
        $(this).toggleClass('checked').find('input').click()
    }).each(function () {
        if ($(this).find('input').is(':checked')) $(this).addClass('checked')
    })

    $('.cC input').click(function (e) {
        e.stopPropagation()
    })


    $('.make_bg').each(function () {
        $(this).css('background-image', 'url(' + $(this).find('.make_bg_img').hide().attr('src') + ')');
    })


    $('.dropdown>a').click(function (e) {
        e.preventDefault();
        $(this).siblings('ul').slideToggle().parents('li').toggleClass('dropped');
    })

    $('.header_mobile_menu').click(function (e) {
        e.preventDefault();
        $('.header_nav_main').slideToggle();
    })


    $('.call_search').click(function () {
        $(this).parents('form').toggleClass('vsb');
        if ($('.vsb').length) {
            $('.search_itself input').focus()
        }
    })


    jpg_compare();


})


function moveOverlay(amt) {
    var overlay = $('.over_jpg'), current = parseInt(overlay.css('top'));
    overlay.css('top', current + amt)
}

function jpg_compare() {
    var img = $('body').attr('data-over-src') || 'images/over.jpg';
    $('body').append('<div class="over_jpg" style="background-image:url(' + img + ')"></div>')
    $('body').on("click", ".over_jpg", function () {
        $(this).toggleClass('h');
    })

    $(document).bind("keypress", function (e) {
        if (e.which == 17) {
            $('.over_jpg').toggle();
        }
        if (e.which == 44) {
            moveOverlay(-1)
        }
        if (e.which == 46) {
            moveOverlay(1)
        }
        if (e.which == 60) {
            moveOverlay(-10)
        }
        if (e.which == 62) {
            moveOverlay(10)
        }
        if (e.which == 109) {
            moveOverlay(-100)
        }
        if (e.which == 47) {
            moveOverlay(100)
        }
    });
}




































/* undefitied@gmail.com */
$(document).ready(function() {
    var win = $(window);

    /* Item Grid Slider */
    win.resize(function() {
        var percentage = '25',
            onPage = 4;

        if (win.width() <= 1310 && win.width() > 580) {
            percentage = '33';
            onPage = 3;
        } else if (win.width() <= 580) {
            percentage = '100';
            onPage = 1;
        }

        $('.item-slider').each(function() {
            $(this).find('.uf-slider').uFslider({
                width: percentage,
                widthType: 'percentage',
                widthPlus: '10',
                onPage: onPage
            });
        });
    });

    /* Item Image */
    $(document).on('click', '.item-image .link', function () {
        if (!$(this).hasClass('active')) {
            var par = $(this).closest('.item-image'),
                mini = $(this).closest('.mini');
            var src = $(this).attr('data-src') || $(this).attr('href') || $(this).find('img').attr('src');

            mini.find('.link').removeClass('active');
            $(this).addClass('active');

            par.find('.main img').attr('src', src);
        }
        return false;
    });

    /* Item 2 Variant */
    $(document).on('click', '.choose-block', function () {
        if (!$(this).hasClass('active')) {
            var par = $(this).closest('.choose-blocks');

            par.find('.choose-block').removeClass('active');
            $(this).addClass('active');
        }

        return false;
    });

    /* Form Validate */
    if ($().validate) {
        $('#form_example').validate({
            rules: {
                phone: {
                    required: true
                }
            },
            messages: {
                phone: {
                    required: "Телефон обязателен для заполнения"
                }
            }
        });
    }

    /* Phone Input */
    if ($().intlTelInput) {
        $('.input-phone').each(function() {
            $(this).intlTelInput({
                geoIpLookup: function(callback) {
                    $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                        var countryCode = (resp && resp.country) ? resp.country : "";
                        callback(countryCode);
                    });
                }
            });
        });
    }

    /* Remove File */
    $(document).on('click', '.files-block .link-delete', function () {
        $(this).closest('.files-block').slideUp(function() {
            $(this).remove();
        });
        return false;
    });

    /* Magnific Popup */
    if ($().magnificPopup) {
        $('.portfolio_preview_cell').magnificPopup({type:'image'});
    }

    /* Window Triggers */
    win.resize();
    win.scroll();
    win.load();
});






































