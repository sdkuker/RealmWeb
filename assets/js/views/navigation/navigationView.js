define(['marionette',
        "tpl!templates/navigation/navControls.tpl"], function (Marionette, NavControlsTemplate) {
    var navigationView = Marionette.ItemView.extend({
        template: NavControlsTemplate,
        onShow: function() {
            $('#main-nav li a').on('click', function() {
                $(this).parent().parent().find('.active').removeClass('active');
                $(this).parent().addClass('active');
                //$(this).parent().addClass('active').css('font-weight', 'bold');
            });
        }
    });

    return navigationView;

});
