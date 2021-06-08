
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