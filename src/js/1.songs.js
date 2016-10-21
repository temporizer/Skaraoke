/* global jQuery */
(function($) {
    Array.prototype.move = function(from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
        return this;
    };
    
    var songRawData; // "global" variable to store our fucking songs
    var result = document.getElementById('result');
    
    var Songs = {
        // just stores the songs in a "global" variable, yea, I'm fucking lazy
        getRawSongData: function() {
            $.ajax({
                async: false,
                url: "https://voiceboxpdx.com/api/v1/songs?tag=Duets&by=popularity&per_page=100",
                success: function(data) {
                    songRawData = data['songs'];
                }
            });
            return songRawData;
        },
        // super fun slot machine-esque function to choose a random song
        getRandom: function() {
            var count = 0;
            var iterations = getRandomNumber(10, 25);
            var roulette = setInterval(function() 
            {
                var randIdx = getRandomNumber(0, songRawData.length - 1);
                var artist = Songs.fixNames(songRawData[randIdx]['artist']);
                var songTitle = Songs.fixSongTitle(songRawData[randIdx]['title']);
                
                result.innerHTML = songTitle + ' - ' + artist;
                
                count++;
                if (count === iterations) {
                    clearInterval(roulette);
                }
            }, 100);
        },
        // fixes the ass backwards artist names 
        fixNames: function(artistData) {
            var namesArr = artistData.split(' ');
            var idx;
            for (var i = 0; i < namesArr.length; i++) {
                if ($.inArray("The", namesArr) !== -1 && namesArr.length < 4) {
                    var id = $.inArray("The", namesArr);
                    namesArr.move(id, 0);
                }
                if (namesArr[i].indexOf(',') != -1 && namesArr.length > 4) {
                    namesArr.move(i, i + 1);
                    i++;
                }
            }
            var output = namesArr.join(' ');
            output = output.replace(/,/g, '');
            
            return output;
        },
        // fixes the ass backwards song titles
        fixSongTitle: function(songData) {
            var songArr = songData.split(' ');
            var idx;
            var id = $.inArray("The", songArr);
                if (id === songArr.length - 1) {
                    var id = $.inArray("The", songArr);
                    songArr.move(id, 0);
                }
            var output = songArr.join(' ');
            output = output.replace(/,/g, '');
            
            return output;
        },
        // utility method, just incase I wanna log some shit
        log: function(someShit) {
            console.log(someShit);
        },
        // sets up all our data and shit
        init: function() {
            this.getRawSongData();
        }
    }
    
    // if we need a fucking random number we have to get it from somewhere
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // let's party
    Songs.init();
    
    $('#click').on('click', function() {
        Songs.getRandom();
    });
})(jQuery);