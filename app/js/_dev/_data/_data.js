
function data() {
   $.getJSON('data/data-teams.json', function(data_teams){
      dataFixture(data_teams);
      dataLadder(data_teams);
   })
}