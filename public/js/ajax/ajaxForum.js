jQuery(document).ready(function(){

    /*jQuery('.hiddenreplyblock').hide();*/
    jQuery('.flat_input textarea').keyup(function(){
        var txt = jQuery(this).val();
        var sibl = jQuery(this).siblings('input[type="submit"]');
        if(txt != null && txt.trim() != ''){
            sibl.removeClass('opacity_color');
            sibl.addClass('txtprimary_color');
            sibl.removeAttr('disabled');
        }
        else{
            sibl.removeClass('txtprimary_color');
            sibl.addClass('opacity_color');
            sibl.attr('disabled','disabled');
        }
    });

});