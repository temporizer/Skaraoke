/* scripts */

(function($){
    
    // menu button state toggle
    $("#nav-toggle").on('click', function(e){
        var icon = '';
        $(this).toggleClass('open');
        icon = ($(this).hasClass('open')) ? '&#xE5CD;' : '&#xE5D2';
        $(this).html('<i class="material-icons">' + icon + '</i>')
    });
    
    // set content position (cuz absolute positioned header)
    var headerHeight = $('#main-header').outerHeight();
    $('#gangsta-wrappa').animate('margin-top', headerHeight + 'px');
    
    
    
})(jQuery); /* global jQuery */