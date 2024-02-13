let allData;
let combatants;
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: 'borci.json',
        datasrc: 'borci',
        cache: false,
        // contentType: true,
        // processData: false,
        success: function (data) {
            allData = data
           // console.log("Loading comenses");
            combatants = Object.values(data)
            let fathersNameInitial;
            for(let combatant in data.borci){
                fathersNameInitial = data.borci[combatant].imeOca.substring(0,1)
              //  console.log(data.borci[combatant]);
                $("#gallery").append(` <div class="col-sm-3" style="text-align: center;">
                <img src="images/responsive_images/170px/${data.borci[combatant].slika}" width="250px" height="200px" id="${data.borci[combatant].id}" class="biography" alt="" data-bs-toggle='modal' data-bs-target='#myModal' loading='lazy'>
                <p class="full-name" class="biography">${data.borci[combatant].ime} ${fathersNameInitial}. ${data.borci[combatant].prezime}</p></div>`);
                
            }
        }
    })
    
    fetch("zrtve.json").then(response => response.json())
                       .then(data => {
                           console.log(data);
                           let html = '';
                           data.forEach(victim => {
                               let fullName = `${victim.ime} ${victim.imeOca.substring(0,1)}. ${victim.prezime}`;
                               html += `<div class="col-sm-3" style="text-align: center;"><p class="full-name" zrtva="${victim.id}">${fullName}</p></div>`
                               console.log(fullName);
                           })
                           console.log(html);
                           document.querySelector("#victims").innerHTML = html;
                       });
        $("footer").delay(800).fadeIn();
});


$(document).on('click', '.biography', function showCombatant (){
    //  $("#target").text($(this).attr('id'));
     let idGlobal = $(this).attr('id')-1;
    
            // let  = $(this).attr('id');
            // console.log('ID GLOBAL'+idGlobal);

            // console.log(idGlobal);
         
        
            let jsonArray = [];
            let resObj = allData;
         
           
            for(let key in resObj){
                    jsonArray.push(resObj[key][idGlobal]);
            }
            
            let filteredCombatant = jsonArray.filter(function(borac){
                // jsonArray.push(resObj[key][idGlobal]);
                $("#first_name").text(borac.ime);
                $("#fathers_name").text(" "+ borac.imeOca+" ");
                $("#last_name").text(borac.prezime);
                $("#bio").html(borac.bio);
                $("#modal-image").attr('src', 'images/responsive_images/170px/'+borac.slika);
                $("#life_time").text(borac.datumRodjenja + " - " + borac.datumSmrti);
                $("#life_places").text(borac.mjestoRodjenja + " - " +borac.mjestoSmrti);
              //  console.log(borac.slika);
                // image.src ='images/'+borac.slika;
                // $("#pdf").attr('image','images/'+borac.slika);
                return borac;
            });
           /* console.log("Filtrirani Borac");
            console.log(filteredCombatant);*/
        
        });
        
    
    // On modal close event, scrolls the content back to top!
    $('#myModal').on('hide.bs.modal', function () {
        $('#bio').scrollTop(0);
    });


        
    
