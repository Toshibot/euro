// ==========================================================================
// Initialisation
// ==========================================================================

// Core Functions 
data();


// Data - Fixture/Results

function dataFixture(data_teams) {

    // Variables
    var self = this;
    var matchday = [];
    self.matchesURI = "https://api.football-data.org/v2/competitions/2018/matches";
    self.matchdayURI = "https://api.football-data.org/v2/competitions";

    self.ajax = function(uri, method, data) {
       var request = {
          url: uri,
          type: method,
          accepts: "application/json",
          cache: false,
          dataType: "json",
          data: JSON.stringify(data),
          headers: {"X-Auth-Token": "5c8b70988e784fca8186b93d38b1bae7"},
          error: function (jqXHR) {
                console.log("ajax error " + jqXHR.status);
          }
 
       };
 
       return $.ajax(request);
    }

    // Matchday
    self.ajax(self.matchdayURI, 'GET').done(function(data){
        var competitions = data.competitions;

        for (i = 0; i < competitions.length; i++) {
            const comp = competitions[i];
            
            if (comp.id == 2018) {
                matchday.push(comp.currentSeason.currentMatchday);
            }
        }
        
        fixture_build();
    });

    function fixture_build(){

        self.ajax(self.matchesURI, 'GET').done(function(data) {

            var matches = data.matches;
            var today = new Date;
            var testDate = new Date('2018-04-24');
            var currentRound = [];
            var currentRoundNo = matchday[0];

            $('.js-fixture-round').text("Matchday " + currentRoundNo);

            for (i = 0; i < matches.length; i++) {
                const element = matches[i];
                
                if (element.matchday == currentRoundNo) {
                    currentRound.push(element);
                }
            }

            for (i = 0; i < currentRound.length; i++) {
                const match = currentRound[i];

                fixtureItem(match, data_teams);
            }
        })
    }
}


//
// Data
// ====
function dataLadder(data_teams) { 

    var self = this;

    self.ajax = function(uri, method, data) {
       var request = {
          url: uri,
          type: method,
          accepts: "application/json",
          cache: false,
          dataType: "json",
          data: JSON.stringify(data),
          headers: {"X-Auth-Token": "5c8b70988e784fca8186b93d38b1bae7"},
          error: function (jqXHR) {
                console.log("ajax error " + jqXHR.status);
          }
 
       };
 
       return $.ajax(request);
    }
    
    self.tasksURI = "https://api.football-data.org/v2/competitions/2018/standings";

    self.ajax(self.tasksURI, 'GET').done(function(data) {
        // console.log(data);

        var ladder_a = data.standings[0].table;
        var ladder_b = data.standings[1].table;
        var ladder_c = data.standings[2].table;
        var ladder_d = data.standings[3].table;
        var ladder_e = data.standings[4].table;
        var ladder_f = data.standings[5].table;

        // Construct the Ladder
        for (i = 0; i < ladder_a.length; i++) {
            const ladder_item_a = ladder_a[i];
            const ladder_item_b = ladder_b[i];
            const ladder_item_c = ladder_c[i];
            const ladder_item_d = ladder_d[i];
            const ladder_item_e = ladder_e[i];
            const ladder_item_f = ladder_f[i];
            ladderItem(ladder_item_a, i+1, data_teams, 'a');
            ladderItem(ladder_item_b, i+1, data_teams, 'b');
            ladderItem(ladder_item_c, i+1, data_teams, 'c');
            ladderItem(ladder_item_d, i+1, data_teams, 'd');
            ladderItem(ladder_item_e, i+1, data_teams, 'e');
            ladderItem(ladder_item_f, i+1, data_teams, 'f');
        }
    })

}

function data() {
   $.getJSON('data/data-teams.json', function(data_teams){
      dataFixture(data_teams);
      dataLadder(data_teams);
   })
}
//
// Layout - Vertically Centered
// ==========================================================================

// ***
// This function vertically centers an object element within 
// its parent element by calculating the height of the parent,
// the height of the child and adding padding to the top and 
// bottom of the child element.
//
// Parent Element
// --------------
// The parent element must be a jQuery object.
// eg: $('.o-vert-center')
//
// Child Element
// -------------
// The child element must be a direct child of the parent and
// be passed through the function with only its classname.
// eg: '.o-vert-center__object'
// *

function vertCenter(element, child) {

    var parentHeight = element.parent().height();
    // This will give the element the same height
    // and line-height as it's parent container.
    element.css({
        'height': parentHeight + 'px',
        'line-height': parentHeight + 'px'
    });
    
    element.children(child).css({
        'height': element.children(child).height(),
        'padding-top': ( parentHeight - element.children(child).height() )/2 + 'px',
        'padding-bottom': ( parentHeight - element.children(child).height() )/2 + 'px'
    });
}

function clearStyles(element, child) {
    element.attr('style', '');
    child.attr('style', '');
}

// Function applied to the following parent/child classes:
// vertCenter($('.o-vert-center'), '.o-vert-center__object');

// On window resize clear previous styles then re-run the function.
$(window).on('resize', function() {
    // clearStyles($('.o-vert-center'), $('.o-vert-center__object'));
    // vertCenter($('.o-vert-center'), '.o-vert-center__object');
});


function dateTime(d) {

    var date = new Date(d);

    function day(d) {
        var day = d.getDay();

        if (day == 0) {
            return 'Sunday';
        } else if (day == 1) {
            return 'Monday';
        } else if (day == 2) {
            return 'Tuesday';
        } else if (day == 3) {
            return 'Wednesday';
        } else if (day == 4) {
            return 'Thursday';
        } else if (day == 5) {
            return 'Friday';
        } else if (day == 6) {
            return 'Saturday';
        }
    }

    function month(d) {
        var m = d.getMonth();

        if (m == 0) {
            return 'Jan';
        } else if (m == 1) {
            return 'Feb';
        } else if (m == 2) {
            return 'Mar';
        } else if (m == 3) {
            return 'Apr';
        } else if (m == 4) {
            return 'May';
        } else if (m == 5) {
            return 'Jun';
        } else if (m == 6) {
            return 'Jul';
        } else if (m == 7) {
            return 'Aug';
        } else if (m == 8) {
            return 'Sep';
        } else if (m == 9) {
            return 'Oct';
        } else if (m == 10) {
            return 'Nov';
        } else if (m == 11) {
            return 'Dec';
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

function fixtureItem(match, data_teams) {

    var date = dateTime(match.utcDate);
    var match_status = match.status;
    var home_team = match.homeTeam;
    var away_team = match.awayTeam;
    var home_team_data = data_teams[home_team.id];
    var away_team_data = data_teams[away_team.id];

    if (match_status == "IN_PLAY") {

        $('.js-fixture').before(
            '<div class="c-fixture__game c-fixture__game--in-progress">' +
                '<div class= "c-fixture__date c-date" >' +
                    '<span class="c-date__day">' + date.day + '</span>' +
                    '<span class="c-date__month">' + date.month + '</span>' +
                    '<span class="c-date__date">' + date.date + '</span>' +
                    '<span class="c-date__time">LIVE</span>' +
                '</div >' +
                '<div class="c-fixture__team js-fixture-team-1">' +
                    '<img class="js-team-img" src="' + home_team_data.kits.home.file + '" />' +
                    '<span class="js-team-text">' + home_team_data.name + '</span>' +
                    '<span class="c-fixture__score js-score-text">' + match.score.fullTime.homeTeam + '</span>' +
                '</div>' +
                '<div class="c-fixture__vs">vs</div>' +
                '<div class="c-fixture__team js-fixture-team-2">' +
                    '<img class="js-team-img" src="' + awayKit(away_team_data, home_team_data.kits.home) + '" />' +
                    '<span class="js-team-text">' + away_team_data.name + '</span>' +
                    '<span class="c-fixture__score js-score-text">' + match.score.fullTime.awayTeam + '</span>' +
                '</div>' +
                '<div class="c-fixture__venue js-fixture-venue">' + '</div>' +
            '</div>'
        );

    } else if (match_status == "PAUSED") {

        $('.js-fixture').before(
            '<div class="c-fixture__game c-fixture__game--in-progress">' +
                '<div class= "c-fixture__date c-date" >' +
                    '<span class="c-date__day">' + date.day + '</span>' +
                    '<span class="c-date__month">' + date.month + '</span>' +
                    '<span class="c-date__date">' + date.date + '</span>' +
                    '<span class="c-date__time">HT</span>' +
                '</div >' +
                '<div class="c-fixture__team js-fixture-team-1">' +
                    '<img class="js-team-img" src="' + home_team_data.kits.home.file + '" />' +
                    '<span class="js-team-text">' + home_team_data.name + '</span>' +
                    '<span class="c-fixture__score js-score-text">' + match.score.fullTime.homeTeam + '</span>' +
                '</div>' +
                '<div class="c-fixture__vs">vs</div>' +
                '<div class="c-fixture__team js-fixture-team-2">' +
                    '<img class="js-team-img" src="' + awayKit(away_team_data, home_team_data.kits.home) + '" />' +
                    '<span class="js-team-text">' + away_team_data.name + '</span>' +
                    '<span class="c-fixture__score js-score-text">' + match.score.fullTime.awayTeam + '</span>' +
                '</div>' +
                '<div class="c-fixture__venue js-fixture-venue">' + '</div>' +
            '</div>'
        );

    }else if (match_status == "FINISHED") {

        $('.js-fixture').before(
            '<div class="c-fixture__game c-fixture__game--completed">' +
                '<div class= "c-fixture__date c-date" >' +
                    '<span class="c-date__day">' + date.day + '</span>' +
                    '<span class="c-date__month">' + date.month + '</span>' +
                    '<span class="c-date__date">' + date.date + '</span>' +
                    '<span class="c-date__time">FT</span>' +
                '</div >' +
                '<div class="c-fixture__team js-fixture-team-1">' +
                    '<img class="js-team-img" src="' + home_team_data.kits.home.file + '" />' +
                    '<span class="js-team-text">' + home_team_data.name + '</span>' +
                    '<span class="c-fixture__score js-score-text">' + match.score.fullTime.homeTeam + '</span>' +
                '</div>' +
                '<div class="c-fixture__vs">vs</div>' +
                '<div class="c-fixture__team js-fixture-team-2">' +
                    '<img class="js-team-img" src="' + awayKit(away_team_data, home_team_data.kits.home) + '" />' +
                    '<span class="js-team-text">' + away_team_data.name + '</span>' +
                    '<span class="c-fixture__score js-score-text">' + match.score.fullTime.awayTeam + '</span>' +
                '</div>' +
                '<div class="c-fixture__venue js-fixture-venue">' + '</div>' +
            '</div>'
        );

    } else {

        $('.js-fixture').before(
            '<div class="c-fixture__game">' +
                '<div class= "c-fixture__date c-date" >' + 
                    '<span class="c-date__day">' + date.day + '</span>' +
                    '<span class="c-date__month">' + date.month + '</span>' +
                    '<span class="c-date__date">' + date.date + '</span>' +
                    '<span class="c-date__time">' + date.time + '</span>' +
                '</div >' +
                '<div class="c-fixture__team js-fixture-team-1">' +
                    '<img class="js-team-img" src="' + home_team_data.kits.home.file + '" />' +
                    '<span class="js-team-text">' + home_team_data.name + '</span>' +
                    '<span class="c-fixture__score js-score-text">-</span>' +
                '</div>' +
                '<div class="c-fixture__vs">vs</div>' +
                '<div class="c-fixture__team js-fixture-team-2">' +
                    '<img class="js-team-img" src="' + awayKit(away_team_data, home_team_data.kits.home) + '" />' +
                    '<span class="js-team-text">' + away_team_data.name + '</span>' +
                    '<span class="c-fixture__score js-score-text">-</span>' +
                '</div>' +
                '<div class="c-fixture__venue js-fixture-venue">' + '</div>' +
            '</div>'
        );
    }
}
function awayKit(away_team_data, home_team_kit){
    var away_team_kit = away_team_data.kits.away;
    var away_kit = away_team_kit.file;
    var third_kit = away_team_data.kits.third.file;

    if (home_team_kit.tone == away_team_kit.tone){
        return third_kit;
    } else {
        return away_kit;
    }
}

// Constructs the ladder Items
function ladderItem(ladder_item, number, data_teams, group) {
    $('#js-ladder-' + group + ' .c-ladder__item-' + number + ' div.c-ladder__team').children('span').text(data_teams[ladder_item.team.id].name);  
    $('#js-ladder-' + group + ' .c-ladder__item-' + number + ' div.c-ladder__team').children('img').attr('src', data_teams[ladder_item.team.id].logo);  
    $('#js-ladder-' + group + ' .c-ladder__item-' + number + ' div.c-ladder__played').text(ladder_item.playedGames);
    $('#js-ladder-' + group + ' .c-ladder__item-' + number + ' div.c-ladder__wins').text(ladder_item.won);
    $('#js-ladder-' + group + ' .c-ladder__item-' + number + ' div.c-ladder__losses').text(ladder_item.lost);
    $('#js-ladder-' + group + ' .c-ladder__item-' + number + ' div.c-ladder__draws').text(ladder_item.draw);
    $('#js-ladder-' + group + ' .c-ladder__item-' + number + ' div.c-ladder__points-for').text(ladder_item.goalsFor);
    $('#js-ladder-' + group + ' .c-ladder__item-' + number + ' div.c-ladder__points-against').text(ladder_item.goalsAgainst);
    $('#js-ladder-' + group + ' .c-ladder__item-' + number + ' div.c-ladder__percentage').text(ladder_item.goalDifference);
    $('#js-ladder-' + group + ' .c-ladder__item-' + number + ' div.c-ladder__points').text(ladder_item.points);
}
function roundCalc(d) {
   var currentDate = new Date(d);
   var month = currentDate.getMonth();
   var date = currentDate.getDate();
   var year = currentDate.getFullYear();

   // Gameday 1
   if (year == "2018" && month <= 7 && date <= 27) {
       return 1;

   // Gameday 2    
   } else if (year == "2018" && month == 7 && date <= 31 || year == "2018" && month == 8 && date == 2){
       return 2;

   // Gameday 3    
   } else if (year == "2018" && month == 8 && date <= 16){
      return 3;

   // Gameday 4    
   } else if (year == "2018" && month == 8 && date <= 23){
      return 4;

   // Gameday 5    
   } else if (year == "2018" && month == 8 && date <= 26){
      return 5;

   // Gameday 6    
   } else if (year == "2018" && month == 8 && date <= 30){
      return 6;

   // Gameday 7    
   } else if (year == "2018" && month == 9 && date <= 7){
      return 7;

   // Gameday 8    
   } else if (year == "2018" && month == 9 && date <= 21){
      return 8;

   // Gameday 9    
   } else if (year == "2018" && month == 9 && date <= 28){
      return 9;

   // Gameday 10    
   } else if (year == "2018" && month == 9 && date <= 31 || year == "2018" && month == 10 && date <= 4){
      return 10;

   // Gameday 11    
   } else if (year == "2018" && month == 10 && date <= 11){
      return 11;

   // Gameday 12    
   } else if (year == "2018" && month == 10 && date <= 25){
      return 12;

   // Gameday 13    
   } else if (year == "2018" && month == 10 && date <= 31 || year == "2018" && month == 11 && date <= 3){
      return 13;

   // Gameday 14    
   } else if (year == "2018" && month == 11 && date <= 9){
      return 14;

   // Gameday 15    
   } else if (year == "2018" && month == 11 && date <= 16){
      return 15;

   // Gameday 16    
   } else if (year == "2018" && month == 11 && date <= 19){
      return 16;

   // Gameday 17    
   } else if (year == "2018" && month == 11 && date <= 23){
      return 17;

   // Gameday 18    
   } else if (year == "2019" && month == 0 && date <= 20){
      return 18;

   // Gameday 19
   } else if (year == "2019" && month == 0 && date <= 27){
      return 19;

   // Gameday 20
   } else if (year == "2019" && month == 0 && date <= 31 || year == "2019" && month == 1 && date <= 3){
      return 20;

   // Gameday 21
   } else if (year == "2019" && month == 1 && date <= 10){
      return 21;

   // Gameday 22
   } else if (year == "2019" && month == 1 && date <= 18){
      return 22;

   // Gameday 23
   } else if (year == "2019" && month == 1 && date <= 25){
      return 23;

   // Gameday 24
   } else if (year == "2019" && month == 1 && date <= 25){
      return 24;

   // Gameday 25
   } else if (year == "2019" && month == 1 && date <= 31 || year == "2019" && month == 2 <= 3){
      return 25;

   // Gameday 26
   } else if (year == "2019" && month == 2 && date <= 11){
      return 26;

   }
}

//
// UI - Buttons
// ==========================================================================

// Variables
// var gitButton = document.getElementById('js-button-github');

// gitButton.addEventListener('click', function(){
//     window.open('https://github.com/Toshibot/webapp-boilerplate', '_blank');
// });
