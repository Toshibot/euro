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