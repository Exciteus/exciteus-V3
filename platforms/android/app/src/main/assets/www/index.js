$(document).ready(function () {


    $('.drawer').drawer();



    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        console.log(StatusBar);
    }
    /*
    $(".event-item").click(function () {

        console.log("click");
        window.location.href = "event.html";
    });
    $(".event-item-highlight").click(function () {

        console.log("click");
        window.location.href = "event.html";
    });
    */

    window.onscroll = function () {
        myFunction()
    };

    // Get the header
    var header = document.getElementById("myHeader");

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        if (window.pageYOffset >= sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }



    console.log("request");
    var htmlstring = "";
    var output = document.getElementById("events");


    /* get data with json */
    $.ajax({
        type: 'GET',
        crossOrigin: true,
        url: "https://on-the-moment-dev.herokuapp.com/external/events/upcoming",

        dataType: "json",
        success: function (data) {
            $.each(data, function (index, element) {


                var time = timeConverter(element.startTime);
                /*

                nextstring = "<div class='event-item' id='" + element.id + "'><img class='icon' src='" + element.icon + "'><div class='event-div'><h2>" + element.title + "</h2><h3>" + element.place.name + "</h3><div class='event-div-info'><h4>" + time + "</h4><h5>" + element.promotion.name + "</h5></div></div></div>";
                */


                if (element.promotion.name != "") {
                    nextstring = "<div class='event-item' category='" + element.category + "' address='" + element.place.address + "' id='" + element.id + "' style='border-bottom: 2px solid #F71BAD;' ><img class='icon' src='" + element.icon + "'><div class='event-div'><h2>" + element.title + "</h2><h3>" + element.place.name + "</h3><div class='event-div-info'><h4>" + time + "</h4><h5>" + element.promotion.name + "</h5></div></div></div>";
                } else {
                    nextstring = "<div class='event-item'  category='" + element.category + "' address='" + element.place.address + "' id='" + element.id + "'><img class='icon' src='" + element.icon + "'><div class='event-div'><h2>" + element.title + "</h2><h3>" + element.place.name + "</h3><div class='event-div-info'><h4>" + time + "</h4><h5>" + element.promotion.name + "</h5></div></div></div>";
                }



                htmlstring += nextstring;
            });
            output.innerHTML = htmlstring;


            /* show page content -> stop preloader with 500ms delay! */

            setTimeout(function () {
                $('#preloader').fadeOut('slow', function () {
                    $(this).remove();
                });
            }, 500);



            $('.event-item').click(function () {
                var myid = $(this).attr("id");
                window.location.href = 'event.html?id=' + myid;

            })


        }
    });


    function timeConverter(UNIX_timestamp) {
        // Months array
        var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Convert timestamp to milliseconds
        var date = new Date(UNIX_timestamp * 1000);

        // Year
        var year = date.getFullYear();

        // Month
        var month = months_arr[date.getMonth()];

        // Day
        var day = date.getDate();

        // Hours
        var hours = date.getHours();

        // Minutes
        var minutes = "0" + date.getMinutes();



        // Display date time in MM-dd-yyyy h:m:s format
        var convdataTime = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2);
        return convdataTime;

    }








});


/*

[  
   {  
      "id":"evt-c8c1d659-9055-460e-a2d6-93f2d2f71a79",
      "icon":"https://not-implemented-yet.png",
      "title":"test-event-1",
      "place":{  
         "name":"Alma 2",
         "address":"Parkstraat"
      },
      "promotion":{  
         "name":""
      },
      "category":"TD",
      "startTime":1522156780138
   },
   {  
      "id":"evt-669d88e4-f180-4399-b78e-9b3f64fefe93",
      "icon":"https://not-implemented-yet.png",
      "title":"promotional",
      "place":{  
         "name":"Alma 2",
         "address":"Parkstraat somethign"
      },
      "promotion":{  
         "name":"Gratis bier."
      },
      "category":"TD",
      "startTime":1522157668595
   }
]


*/