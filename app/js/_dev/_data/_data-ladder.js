
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

        var groups = ['a', 'b', 'c', 'd', 'e', 'f'];

        for (i = 0; i < groups.length; i++){
            const group = groups[i];
            const table = data.standings[i].table;

            ladder_build(table, group);
        }
        
        // Construct the Ladder
        function ladder_build(table, group){
            ladderItem(table[0], 1, data_teams, group);
            ladderItem(table[1], 2, data_teams, group);
            ladderItem(table[2], 3, data_teams, group);
            ladderItem(table[3], 4, data_teams, group);
        }
    })

}