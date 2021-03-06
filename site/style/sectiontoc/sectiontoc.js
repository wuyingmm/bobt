(function ($) {

    Drupal.behaviors.sectiontoc = {
        attach: function (context, settings) {

            $(document).ready(function () {
                    /* don't do this on the front page */
                    var pathname = $(location).attr('pathname');
                    if ((pathname === null) || (pathname.length === 0) ||
                        (pathname === '/') || (pathname === '/node'))
                        return;

                    /* define the object we'll use to do the work */
                    var stoc = {
                        init: function() {
                            /* a sequence number for any duplicate headings */
                            this.headingSeq = 0;

                            /* detect duplicate headings using this as a hash */
                            this.headingMap = {};
                        },

                        makeHeadingName: function(it) {
                            var words = it.split(' ');
                            var name = words.join('');

                            /* if we've used this before, make it unique */
                            if (typeof(this.headingMap[name]) != 'undefined')
                                name = name.concat('-' + this.headingSeq++);

                            /* remember this name is used */
                            this.headingMap[name] = true;
                    
                            return name;
                        },

                        doSection: function(toc, section, depth) {
                            var childLi = $('<li />').appendTo($(toc));
                            var titleSpan =
                            $(section).children('span.sectiontoc-title').
                                first();
                            var titleHtml = $(titleSpan).html();
                            var titleName = this.makeHeadingName(
                                $(titleSpan).text());

                            /* add the link to the toc li */
                            $('<a />').text(titleHtml).attr( {
                                    'href': '#' + titleName }).
                                appendTo(childLi);

                            /* wrap title with named anchor heading */
                            $(titleSpan).wrap('<h' + depth + ' />').
                                wrap('<a id="' + titleName + '" />');

                            /* recursively do this section's children */
                            var childToc = $('<ul />');
                            var childCount = 0;
                            $(section).children('div.sectiontoc-section').
                                each(function  (index, section) {
                                    stoc.doSection(
                                        childToc, section, depth + 1);
                                    childCount += 1;
                                    return true;
                                    });

                            /* if there were children, append them */
                            if (childCount > 0)
                                $(childToc).appendTo($(childLi));
                        }
                    };

                    stoc.init();

                    var toc = $('<ul />').appendTo($('div#sectiontoc-toc'));
                    $('div#sectiontoc-body').children('div.sectiontoc-section').
                        each(function (index, section) {
                                stoc.doSection(toc, section, 2);
                                return true;
                            });
                }); /* $(document).ready(...) */

        } /* attach */
    }; /* Drupal.behaviors.sectiontoc */

}(jQuery));
