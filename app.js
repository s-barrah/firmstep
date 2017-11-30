
$(document).ready(function() {


    $('.filter-criteria label').click(function(e) {
        $('#notif').html('');
        e.preventDefault();
        var checkboxArray = new Array();
        var checkbox = $(this).find('input:checkbox');

        if(checkbox.is(':checked')){
            checkbox.prop("checked", false);
            if($('input:checkbox:checked').length > 0){
                filterProducts();
            }else{
                resetForm();

            }
        }else{
            checkbox.prop("checked", true);
            //$(this).addClass('active');
            var value = $(this).find('input:checkbox').val();
            var form = $(this).find('input:checkbox').closest('form');
            var formUrl = form.attr('action');
            //alert(value);
            //checkboxArray.push(value);
            //form.submit();
            //
            filterProducts();
        }

    });




});



function loadProducts(){

    var url = 'products.json';
    var a = {};
    var itm = '';
    $.getJSON(url, function (data) {
        a = data;

        $.each(a, function(idx, elem){

            itm += '<li class="item">';
            itm += '<a href="#" class="product-photo"><img src="'+elem.image.small+'" height="130" alt="'+elem.name+'"/></a>';
            itm += '<h2><a href="#">'+elem.name+'</a></h2>';
            itm += '<ul class="product-description">';
            itm += '<li><span>Manufacturer: </span><span data-man="'+elem.specs.manufacturer+'">'+elem.specs.manufacturer+'</span></li>';
            itm += '<li><span>Storage: </span><span data-storage="'+elem.specs.storage+'">'+elem.specs.storage+'</span> GB</li>';
            itm += '<li><span>OS: </span><span data-os="'+elem.specs.os+'">'+elem.specs.os+'</span></li>';
            itm += '<li><span>Camera: </span><span data-camera="'+elem.specs.camera+'">'+elem.specs.camera+'</span> Mpx</li>';
            itm += '<li><span>Description: </span data-description="'+elem.description+'"><span>'+elem.description+'</span></li>';
            //itm += '';
            itm += '</ul>';
            itm += '<p class="product-price">£'+elem.price +'</p>';
            //itm += '';
            itm += '</li>';

            // $('.products-list').append('<li><a href="#" class="product-photo"><img src="'+elem.image.small+'" height="130" alt="'+elem.name+'"/></a><h2><a href="#">'+elem.name+'</a></h2><ul class="product-description"><li><span>Manufacturer: </span>'+elem.specs.manufacturer+'</li><li><span>Storage: </span>'+elem.specs.storage+' GB</li><li><span>OS: </span>'+elem.specs.os+'</li><li><span>Camera: </span>'+elem.specs.camera+' Mpx</li><li><span>Description: </span>'+elem.description+'</li></ul><p class="product-price">£'+elem.price +'</p></li>');
        });
        $('.products-list').html(itm);

    });

}

function resetForm() {
	
    $('input:checkbox').prop("checked", false);
    loadProducts();

}

function filterProducts() {

    var checked = $(".filter-criteria label input:checkbox:checked").map(function(){
        return $(this).val();
    }).get(); // <----
    //console.log(checked);

    var filterManufacturer = [];
    var filterStorage = [];
    var filterOs = [];
    var filterCamera = [];
    //var filterMan = [];
    //var filterStorage = [];
    //var filterOs = [];
    //var filterCam = [];

    $.each($("input[name='manufacturer']:checked"), function(){
        filterManufacturer.push($(this).val());

    });
    $.each($("input[name='storage']:checked"), function(){
        filterStorage.push($(this).val());

    });
    $.each($("input[name='os']:checked"), function(){
        filterOs.push($(this).val());

    });
    $.each($("input[name='camera']:checked"), function(){
        filterCamera.push($(this).val());

    });

    console.log('Manufacturers: '+filterManufacturer.join(", ")+'; Storage: '+filterStorage.join(", ")+'; OS: '+filterOs.join(", ")+'; Camera: '+filterCamera.join(", "));
    //filterProducts(checkboxArray);

    $('.item').each(function(){
        var man = $(this).attr('data-man');
        var storage = $(this).attr('data-storage');
        var os = $(this).attr('data-os');
        var camera = $(this).attr('data-camera');
        if(jQuery.inArray(man,filterManufacturer) > -1)
            $(this).fadeIn('slow');
        else
            $(this).hide();
    });


    var url = 'products.json';
    var a = {};

    $.getJSON(url, function (data) {
        a = data;
        //console.log(a);
        var itm = '';
        var items1 = $.grep(a, function (element, index) {

            //return element.specs.manufacturer == "Samsung";
            return (filterManufacturer.indexOf(element.specs.manufacturer) !== -1) &&
                (filterStorage.indexOf(element.specs.storage) !== -1) ;
                //&&
               // element.specs.os > 9 &&
              //  element.specs.camera > 9;

        });


        var items = a.filter(function (el) {

           // return el.specs.manufacturer == "Samsung" &&
           //    el.specs.storage >= 16 &&
            //   el.specs.os == 'Android' &&
          //     el.specs.camera > 13;

            var result = true;
            if(filterManufacturer.length != 0 && filterManufacturer.indexOf(el.specs.manufacturer) < 0){
                //return manufacturer.indexOf(el.specs.manufacturer) !== -1;
                result = false;
                //result = (filterManufacturer.indexOf(el.specs.manufacturer) !== -1);
                //result.push(~filterMan.indexOf(el.specs.manufacturer));
            }
            if(filterStorage.length != 0 && filterStorage.indexOf(el.specs.storage) < 0){
                //return storage.indexOf(el.specs.storage) !== -1;
                result = false;
                //result += ' && '+ (filterStorage.indexOf(el.specs.storage) !== -1);
                //result.push(~filterStorage.indexOf(el.specs.storage));
            }
            if(filterOs.length != 0 && filterOs.indexOf(el.specs.os) < 0){
                //return os.indexOf(el.specs.os) !== -1;
                result = false;
                //result += ' && '+ (filterOs.indexOf(el.specs.os) !== -1);
                //result.push(~filterOs.indexOf(el.specs.os));
            }
            if(filterCamera.length != 0 && filterCamera.indexOf(el.specs.os) < 0){
                //return camera.indexOf(el.specs.camera) !== -1;
                result = false;
                //result += ' && '+ (filterCamera.indexOf(el.specs.camera) !== -1);
                //result.push(~filterCam.indexOf(el.specs.camera));
            }
            //console.log(result);
            //var final = result.join("&&");
            return result;

            //filterStorage.indexOf(el.specs.storage) !== -1 &&
            //filterOs.indexOf(el.specs.os) !== -1 &&
            //filterCam.indexOf(el.specs.camera) !== -1;

        });

        /*const filterItems = (query) => {
            return a.filter((el) =>
                el.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        }
        */

        //var items = filterStore( a, filter);

        console.log('Array Length: '+ items.length);
        if(items.length > 0){
            // items is a new array of the matching products
            $.each(items, function (i) {

                //console.log(items[i].name);


                itm += '<li>';
                itm += '<a href="#" class="product-photo"><img src="'+items[i].image.small+'" height="130" alt="'+items[i]  .name+'"/></a>';
                itm += '<h2><a href="#">'+items[i].name+'</a></h2>';
                itm += '<ul class="product-description">';
                itm += '<li><span>Manufacturer: </span>'+items[i].specs.manufacturer+'</li>';
                itm += '<li><span>Storage: </span>'+items[i].specs.storage+' GB</li>';
                itm += '<li><span>OS: </span>'+items[i].specs.os+'</li>';
                itm += '<li><span>Camera: </span>'+items[i].specs.camera+' Mpx</li>';
                itm += '<li><span>Description: </span>'+items[i].description+'</li>';
                //itm += '';
                itm += '</ul>';
                itm += '<p class="product-price">£'+items[i].price +'</p>';
                //itm += '';
                itm += '</li>';

            });

            $('.products-list').html(itm);

        }else{
            var message = '<div class="alert alert-danger text-center">No matching items found</div>';
            $('#notif').html(message);
            $('.products-list').html(message);
        }

    });
}
function newFilter() {

    var url = 'products.json';
    var availableFilters = [];
    var activeFilters = [];
    var $filters = $('input:checkbox').each(function() {
        var value = $(this).val();
        availableFilters.push(value);
        if ($(this).is(':checked')) {
            activeFilters.push(value);
        }
    });
    $.getJSON(url, function (data) {
        a = data;
        //console.log(a);
        var itm = '';
        var items = a.filter(function(item) {
            return availableFilters.every(function(filter) {
                return !!item[filter] === activeFilters.indexOf(filter) > -1;
            });
        });

        console.log('Array Length: '+ items.length);
        if(items.length > 0){
            // items is a new array of the matching products
            $.each(items, function (i) {

                //console.log(items[i].name);


                itm += '<li>';
                itm += '<a href="#" class="product-photo"><img src="'+items[i].image.small+'" height="130" alt="'+items[i]  .name+'"/></a>';
                itm += '<h2><a href="#">'+items[i].name+'</a></h2>';
                itm += '<ul class="product-description">';
                itm += '<li><span>Manufacturer: </span>'+items[i].specs.manufacturer+'</li>';
                itm += '<li><span>Storage: </span>'+items[i].specs.storage+' GB</li>';
                itm += '<li><span>OS: </span>'+items[i].specs.os+'</li>';
                itm += '<li><span>Camera: </span>'+items[i].specs.camera+' Mpx</li>';
                itm += '<li><span>Description: </span>'+items[i].description+'</li>';
                //itm += '';
                itm += '</ul>';
                itm += '<p class="product-price">£'+items[i].price +'</p>';
                //itm += '';
                itm += '</li>';

            });

            $('.products-list').html(itm);

        }else{
            var message = '<div class="alert alert-danger text-center">No matching items found</div>>';
            $('#notif').html(message);
        }
    });
}

function filterStore(dataStore, filter) {
    return $(dataStore).filter(function(index, item) {
        for( var i in filter ) {
            if(filter[i] instanceof Array){
                console.log(filter[i],item[i]);
                if($.inArray(parseInt(item[i],10),filter[i]) == -1)
                    return null;
                else
                    continue;
            }
            if( ! item[i].toString().match( filter[i] ) ) return null;
        }
        return item;
    });
}

function filterbyManufacturer(){
    var url = 'products.json';
    var a = {};

    $.getJSON(url, function (data) {
        a = data;
        $.grep(a, function( n, i ) {
            return n.specs.manufacturer==='google';
        });
    });
}

function filterbySize(){
    var url = 'products.json';
    var a = {};

    $.getJSON(url, function (data) {
        a = data;
        $.grep(a, function( n, i ) {
            return n.specs.storage==='google';
        });
    });
}

function filterbyOS(){
    var url = 'products.json';
    var a = {};

    $.getJSON(url, function (data) {
        a = data;
        $.grep(a, function( n, i ) {
            return n.specs.os==='google';
        });
    });
}

function filterbyCamera(){
    var url = 'products.json';
    var a = {};

    $.getJSON(url, function (data) {
        a = data;
        $.grep(a, function( n, i ) {
            return n.specs.camera==='google';
        });
    });
}

/*
var filteredJson = json.posts.filter(function (row) {
    if(row.title) {
        return true
    } else {
        return false;
    }
});
*/


function filter(e) {
    return document.getElementById(e.job).checked;
}