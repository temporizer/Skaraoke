/* scripts */

(function($){
    $("#nav-toggle").on('click', function(e){
        var icon = '';
        
        $(this).toggleClass('open');
        icon = ($(this).hasClass('open')) ? '&#xE5CD;' : '&#xE5D2';
        $(this).html('<i class="material-icons">' + icon + '</i>')
    })
})(jQuery); /* global jQuery */