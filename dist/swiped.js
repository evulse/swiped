(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.swiped = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    var back = document.querySelectorAll("[data-swiped-back]");
    var next = document.querySelectorAll("[data-swiped-next]");

    function scrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollLeft;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollLeft += perTick;

            console.log(perTick);
            if (element.scrollLeft === to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    }

    for(var i = 0; i<back.length; i++) {
        back[i].addEventListener('click', function(e) {
            var swiped = document.getElementById(this.getAttribute("data-swiped-back"));

            if ( 'scrollBehavior' in document.documentElement.style ) {
                swiped.children[0].scrollBy(swiped.children[0].children[0].clientWidth * -1, 0)
            } else {
                scrollTo(swiped.children[0], swiped.children[0].scrollLeft - swiped.children[0].children[0].clientWidth, 100);

            }
        });
    }

    for(var j = 0; j<next.length; j++) {
        next[j].addEventListener('click', function(e) {
            var swiped = document.getElementById(this.getAttribute("data-swiped-next"));

            if ('scrollBehavior' in document.documentElement.style ) {
                swiped.children[0].scrollBy(swiped.children[0].children[0].clientWidth, 0)
            } else {
                scrollTo(swiped.children[0], swiped.children[0].scrollLeft + swiped.children[0].children[0].clientWidth, 100);

            }
        });
    }

    return {};
}));
