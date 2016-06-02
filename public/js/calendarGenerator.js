
// these are labels for the days of the week
days_labels = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// these are human-readable month name labels, in order
months_labels = ['Enero', 'Febrero', 'Marzo', 'Abril',
                        'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
                        'Octubre', 'Noviembre', 'Diciembre'];

// these are the days of the week for each month, in order
days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// this is the current date
current_date = new Date();
mes = current_date.getMonth();
anio = current_date.getFullYear();
var realmes = mes + 1;

function Calendar(month, year) {
  this.month = (isNaN(month) || month == null) ? current_date.getMonth() : month;
  this.year  = (isNaN(year) || year == null) ? current_date.getFullYear() : year;
  this.html = '';
}

Calendar.prototype.generateHTML = function(){

    // obtener primer dia del mes
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();
    jQuery('.calendar #month').text( months_labels[this.month] );
    jQuery('#calendar_bgtitle').text( months_labels[current_date.getMonth()] );
    jQuery('.calendar #year').text( this.year );
    jQuery('.calendar #weekday').text( days_labels[current_date.getDay()] );
    jQuery('.bg_calendar').css('background-image' , 'url("/images/calendar_' + realmes + '.jpg")');
      
      // Numero de dias en el mes
      var monthLength = days_in_month[this.month];
      
      // Anio bisiesto
      if (this.month == 1) { // Febrero solamente!
            if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
                monthLength = 29;
            }
      }
      
    var html = '';

    // Llenar los dias
    var day = 1;
    // Bucle para las semanas
    for ( var i = 0; i < 9; i++ ) {
        // Dias de la semana
        for ( var j = 0; j <= 6; j++ ) { 
            if ( day <= monthLength && (i > 0 || j >= startingDay) ) {
                html += '<div class="day v_top" onclick="loadDay(' + day + ')">';
                html += '<div class="pd_8 circle hover"><div class="num"><span>';
                html += day;
                html += '</span><div class="dot_cont">';
                html += '</div></div></div></div>';
                day++;
            }
            else{
                html += '<div class="day v_top"></div>';
            }
        }
        // Detener el ciclo al terminar los dias del mes
        if (day > monthLength) {
            break;
        }

    }

    this.html = html;
}

Calendar.prototype.getHTML = function() {
    return this.html;
}

function prevMonth() {
    mes--;
    if (mes < 0) {
        mes = 11;
        anio--;
    }
    document.getElementById("selectedDate").innerHTML = '1 ' + months_labels[mes] + ' ' + anio;
    writeCalendar(mes, anio);
}

function nextMonth() {
    mes++;
    if (mes > 11) {
        mes = 0;
        anio++;
    }
    document.getElementById("selectedDate").innerHTML = '1 ' + months_labels[mes] + ' ' + anio;
    writeCalendar(mes, anio);
}

function writeCalendar(month, year){
    var cal = new Calendar(month,year);
    cal.generateHTML();
    document.getElementById("calendar_month_content").innerHTML = cal.getHTML();
    jQuery('.day_pos').hide();

    var origw = jQuery('.calendar_monthcontainer').width();
    var left = jQuery('.calendar_monthcontainer').position().left;

    jQuery('#calendar_month_content .day .pd_8').on('click' ,function(){

        if(jQuery(window).width() < 640){
            jQuery(window).scrollTop(jQuery('.calendar').outerHeight());
        }
        var origh = jQuery('.calendar').height();
        
        var pos = jQuery(this).position();

        jQuery('.day_pos').show();
        jQuery('.day_pos').animate({ 
            left : pos.left + ( jQuery('.day').width()/2 - jQuery('.day_pos').width()/2 ) ,
            top : pos.top
        }, function(){
            jQuery('#block_selectedDate').show();
        });
    });

}

super_months_labels = ['Ene', 'Feb', 'Mar', 'Abr',
                    'May', 'Jun', 'Jul', 'Aug', 'Sep',
                    'Oct', 'Nov', 'Dic'];

jQuery(document).ready(function(){
    jQuery('.today_title .day_title').text(current_date.getDate());
    jQuery('.today_title .month_title').text(super_months_labels[current_date.getMonth()]);
    jQuery('.today_title .year_title').text(current_date.getFullYear());
    jQuery('.calendar_month_content').append(writeCalendar());

    jQuery('#block_selectedDate').hide();

    jQuery('#backcalendar').click(function(){
        jQuery('#block_selectedDate').hide();
    });

});

function loadDay(calendarDay){

    var realm = mes + 1;

    var writeday = calendarDay.toString();
    writeday = writeday.length < 2 ? '0' + writeday : writeday;
    var writemonth = realm.toString();
    writemonth = writemonth.length < 2 ? '0' + writemonth : writemonth;

    /*console.log('Día Form: ' + writeday );
    console.log('Mes Form: ' + writemonth );*/

    document.calendarNewEvent.formCalendarDay.value = writeday;
    document.calendarNewEvent.formCalendarMonth.value = writemonth;
    document.calendarNewEvent.formCalendarYear.value = anio;
    document.getElementById("selectedDate").innerHTML = calendarDay + ' ' + super_months_labels[mes] + ' ' + anio;

    /*console.log('Día: ' + writeday);
    console.log('Mes: ' + months_labels[mes]);
    console.log('Año: ' + anio);*/

    var stringDate = writeday + '/' + writemonth + '/' + anio;

    jQuery('.cal_post').hide();
    jQuery('.cal_post[data-date="' + stringDate + '"]').show();
    jQuery('.cal_post[data-datepost="' + stringDate + '"]').show();

    function checkEmpty(){

        if(jQuery('.cal_post[style="display: block;"]').length == 0){
            jQuery('#calendar_list .listcontainer .empty_blocktext').show();
        }
        else{
            jQuery('#calendar_list .listcontainer .empty_blocktext').hide();
        }
    }

    setTimeout(checkEmpty, 900);

    jQuery('#backcalendar').click(function(){
        jQuery('.cal_post').show();
        if(jQuery('.cal_post').length > 0){
            jQuery('#calendar_list .empty_blocktext').hide();
        }
    });
    
}