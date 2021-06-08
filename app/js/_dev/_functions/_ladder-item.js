
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