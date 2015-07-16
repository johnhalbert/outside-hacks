        function makeRequest(query) {
          
          var request = gapi.client.youtube.search.list({
            q: query,
            part: 'snippet',
            maxResults: 3,
            type: 'video',
            videoEmbeddable: true,
            // videoSyndicated: true
          });

          request.execute(function (response) {
            // $('#youtubeSearchResults').empty();
            var youtubeSearchVideos = response.result.items;
            console.log(youtubeSearchVideos);
            
            $('#youtubeSearchResults').append("<div>");

            $.each(youtubeSearchVideos, function (index, item) {
            
              console.log(item);
              
              vidTitle = item.snippet.title;
              vidThumburl =  item.snippet.thumbnails.default.url;
              

              vidThumbId = item.id.videoId ? item.id.videoId : item.id.channelId;

              vidThumbimg = '<div videoId="' + vidThumbId + 
                '" class="youtubeThumbnail"><a href="https://www.youtube.com/watch?v=' + 
                vidThumbId + '"><img id="thumb" src="'+ vidThumburl +
                '" alt="No  Image Available." class="youtubeThumbnailImage"></a>';

              $('#youtubeSearchResults').append( vidTitle + vidThumbimg +  '</div>');
            });

            $('#youtubeSearchResults').append("</div>");


          });

        }

        var youtubeQueryStrings = [
          'mumford and sons',
          'james bay',
          'the fray'   
        ];

        function init() {
          gapi.client.setApiKey('AIzaSyD1za0BH_Y0fcA3y1oQqTLqg3goxoZMxgA');
          gapi.client.load('youtube', 'v3', function() {
            // data = jQuery.parseJSON( '{ "data": [{"name":"' + youtubeSearchString + '"}] }' );
            // console.log(data);
            // $.each(data["data"], function (index, value) {
              // makeRequest(value["name"]);
              for ( var query in youtubeQueryStrings ){
                
                makeRequest(youtubeQueryStrings[query]);
              }
            // });

          });

        }