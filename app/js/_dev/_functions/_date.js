
function dateTime(d) {

    var date = new Date(d);

    function day(d) {
        var day = d.getDay();

        if (day == 0) {
            return 'Sonntag';
        } else if (day == 1) {
            return 'Montag';
        } else if (day == 2) {
            return 'Dienstag';
        } else if (day == 3) {
            return 'Mittwoch';
        } else if (day == 4) {
            return 'Donnerstag';
        } else if (day == 5) {
            return 'Freitag';
        } else if (day == 6) {
            return 'Samstag';
        }
    }

    function month(d) {
        var m = d.getMonth();

        if (m == 0) {
            return 'Jan';
        } else if (m == 1) {
            return 'Feb';
        } else if (m == 2) {
            return 'Mär';
        } else if (m == 3) {
            return 'Apr';
        } else if (m == 4) {
            return 'Mai';
        } else if (m == 5) {
            return 'Jun';
        } else if (m == 6) {
            return 'Jul';
        } else if (m == 7) {
            return 'Aug';
        } else if (m == 8) {
            return 'Sep';
        } else if (m == 9) {
            return 'Okt';
        } else if (m == 10) {
            return 'Nov';
        } else if (m == 11) {
            return 'Dez';
        }
    }

    var dd = date.getDate();

    function time(d) {
        var h = d.getHours();
        var m = ('0'+d.getMinutes()).slice(-2);

        return h + ':' + m;
    }

    var dateObj = {
        day: day(date),
        month: month(date),
        date: dd,
        time: time(date)
    }

    return dateObj;
}