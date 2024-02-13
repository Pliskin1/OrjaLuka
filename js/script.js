$(document).ready(function () {
    // let my_columns = [];
    // $.each(data[0], function(key, value) {
    //     let my_item = {};
    //     my_item.data = key;
    //     my_item.title = value;
    //     my_columns.push(my_item.data);
    // });


    let table = $('#myTable').DataTable({
       
        "ajax" : {"url":"borci.json", "dataSrc":"borci"},
        "autoWidth": false,
 
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [0]
            }
        ],
        "bDestroy": true, // za ponovno inicijalizvoanje tabele
        "iDisplayLength": 50,
        "columns": [
            {title: "Slika", data: "slika",
            render: function(data,type,row){
                return `<img  src='images/small_images/${data}' id='${row.id}' class='slikaBorca' width="70px" height="70px" alt="Fotografija nedostupna" data-bs-toggle='modal' data-bs-target='#myModal' >`;
            }
            },
            {title: "Ime", data: "ime" },
            {title: "Ime oca", data: "imeOca" },
            {title: "Prezime", data: "prezime" },
            {title: "Zanimanje", data: "zanimanje"},
            {title: "Mjesto rođenja", data: "mjestoRodjenja" },
            {title: "Datum rođenja", data: "datumRodjenja" },
            {title: "Mjesto smrti", data: "mjestoSmrti" },
            {title: "Datum smrti", data: "datumSmrti" },
            
        ],
        // paging: false
        // scrollY: "700px",
        // scrollX: true,
        // scrollCollapse: true,
        
        // fixedColumns: true,
        // "bDestroy": true, // za ponovno inicijalizvoanje tabele
        // autoWidth: false,
        // // order: [[1, 'asc']],
            
  
})
$('#myTable thead th').each(function (my_columns) {
    var title = $('#myTable thead th').eq($(this).index()).text();
    $(this).html('<input type="text" placeholder="' + title + '" data-index="' + my_columns + '" style="width: 100%; " />');
});

// Filter event handler
$(table.table().container()).on('keyup', 'thead input', function () {
    table
        .column($(this).data('index'))
        .search(this.value)
        .draw();
});

       //Prevents sorting when column input field is clicked
       document.addEventListener("click", e => {
        var target = e.target;
        if ($(target).closest("th").hasClass("sorting") && $(target).prop("tagName") == "INPUT") {
            /* You can replace or add more element types in condition. */
            e.stopPropagation();
            e.preventDefault();
        }
        }, true);
});

 

// function getId(){
//     return 0;
// }

$(document).on('click', '.slikaBorca', function showCombatant (){
    //  $("#target").text($(this).attr('id'));
     let idGlobal = $(this).attr('id')-1;
   


     $.ajax({
        type: "GET",
        url: 'borci.json',
        data: JSON.stringify({ 'id': idGlobal }),
        cache: false,
            // contentType: true,
            // processData: false,
        success: function (data) {
            let  = $(this).attr('id');
            // console.log('ID GLOBAL'+idGlobal);

            // console.log(idGlobal);
            let jsonArray = [];
            let resObj = data;
         
           
            for(let key in resObj){
                    jsonArray.push(resObj[key][idGlobal]);
                    $("#first_name").text(resObj[key][idGlobal].ime);
                    $("#fathers_name").text(" ("+ resObj[key][idGlobal].imeOca+") ");
                    $("#last_name").text(resObj[key][idGlobal].prezime);
                    $("#bio").html(resObj[key][idGlobal].bio);
                    $("#modal-image").attr('src', 'images/small_images/'+resObj[key][idGlobal].slika);
                    $("#life_time").text(resObj[key][idGlobal].datumRodjenja + "-" + resObj[key][idGlobal].datumSmrti);
                    $("#life_places").text(resObj[key][idGlobal].mjestoRodjenja + "-" + resObj[key][idGlobal].mjestoSmrti);
                    console.log(resObj[key][idGlobal].slika);
                    // image.src ='images/'+resObj[key][idGlobal].slika;
                    $("#pdf").attr('image','images/'+resObj[key][idGlobal].slika);

            }
           },error: function(data){
            console.log(data);
        }
    })});

// On modal close event, scrolls the content back to top!
    $('#myModal').on('hide.bs.modal', function () {
        $('#bio').scrollTop(0);
    })

// Detecting arrow keys
document.onkeyup = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        console.log("UP KEY");
    }
    else if (e.keyCode == '40') {
        console.log("DOWN KEY");
    }
    else if (e.keyCode == '37') {
        console.log("LEFT KEY");
    }
    else if (e.keyCode == '39') {
        console.log("RIGHT KEY");
    }

}