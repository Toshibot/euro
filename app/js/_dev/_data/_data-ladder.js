
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