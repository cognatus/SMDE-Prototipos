
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

function Calendar(month, year) {
  this.month = (isNaN(month) || month == null) ? current_date.getMonth() : month;
  this.year  = (isNaN(year) || year == null) ? current_date.getFullYear() : year;
  this.html = '';
}

Calendar.prototype.generateHTML = function(){

    // obtener primer dia del mes
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();
    $('.calendar #month').text( months_labels[this.month] );
    $('.calendar #year').text( this.year );
    $('.calendar #weekday').text( days_labels[current_date.getDay()] );
      
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
                html += '<div class="day v_top" onclick="carga(' + day + ')">';
                html += '<div class="pd_8"><div class="num"><span>';
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
    document.getElementById("elegido").innerHTML = "1 " + months_labels[mes] + " " + anio;
    writeCalendar(mes, anio);
}

function nextMonth() {
    mes++;
    if (mes > 11) {
        mes = 0;
        anio++;
    }
    document.getElementById("elegido").innerHTML = "1 " + months_labels[mes] + " " + anio;
    writeCalendar(mes, anio);
}

function writeCalendar(month, year){
	var cal = new Calendar(month,year);
	cal.generateHTML();
    document.getElementById("calendar_month_content").innerHTML = cal.getHTML();
    //$('#calendar_dayeventscont').css('height' , $('.calendar').height() - 55);
    $('.day_pos').hide();
    $('#calendar_month_content .day .pd_8').click(function(){
        var pos = $(this).find('.num span').position();
        $('.day_pos').show();
        if( $(this).find('.num span').text().length > 1){
            $('.day_pos').animate({ left : pos.left - 14.6 ,
                top : pos.top - 9 });
            }
        else{
            $('.day_pos').animate({ left : pos.left - 18.2 ,
                top : pos.top - 9 });
        }
    });
}

super_months_labels = ['Ene', 'Feb', 'Mar', 'Abr',
                    'May', 'Jun', 'Jul', 'Aug', 'Sep',
                    'Oct', 'Nov', 'Dic'];

$(document).ready(function(){
    $('.today_title .day_title').text(current_date.getDate());
    $('.today_title .month_title').text(super_months_labels[current_date.getMonth()]);
    $('.today_title .year_title').text(current_date.getFullYear());
    $('.calendar_month_content').append(writeCalendar());
});

function carga(x){
  console.log( 'Día' + x );
  console.log( 'Mes' + months_labels[mes] );
  console.log( 'Año' + anio );
  document.getElementById("elegido").innerHTML = x + " " + months_labels[mes] + " " + anio;
}