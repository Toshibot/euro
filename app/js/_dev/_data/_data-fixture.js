

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
