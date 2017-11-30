
$(document).ready(function() {


    $('.filter-criteria label').click(function(e) {
        $('#notif').html('');
        e.preventDefault();
        var checkboxArray = new Array();
        var checkbox = $(this).find('input:checkbox');

        if(checkbox.is(':checked')){
            checkbox.prop("checked", false);
            if($('input:checkbox:checked').length > 0){
                filterP();
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
            filterP();
        }

    });

    $('.clear-filter').click(function(e) {

        e.preventDefault();
        $('input:checkbox').prop("checked", false);
        var itm = '';
        var url = 'products.json';
        var a = {};

        $.getJSON(url, function (data) {
            a = data;

            $.each(a, function(idx, elem){

                itm += '<li>';
                itm += '<a href="#" class="product-photo"><img src="'+elem.image.small+'" height="130" alt="'+elem.name+'"/></a>';
                itm += '<h2><a href="#">'+elem.name+'</a></h2>';
                itm += '<ul class="product-description">';
                itm += '<li><span>Manufacturer: </span>'+elem.specs.manufacturer+'</li>';
                itm += '<li><span>Storage: </span>'+elem.specs.storage+' GB</li>';
                itm += '<li><span>OS: </span>'+elem.specs.os+'</li>';
                itm += '<li><span>Camera: </span>'+elem.specs.camera+' Mpx</li>';
                itm += '<li><span>Description: </span>'+elem.description+'</li>';
                //itm += '';
                itm += '</ul>';
                itm += '<p class="product-price">£'+elem.price +'</p>';
                //itm += '';
                itm += '</li>';

                // $('.products-list').append('<li><a href="#" class="product-photo"><img src="'+elem.image.small+'" height="130" alt="'+elem.name+'"/></a><h2><a href="#">'+elem.name+'</a></h2><ul class="product-description"><li><span>Manufacturer: </span>'+elem.specs.manufacturer+'</li><li><span>Storage: </span>'+elem.specs.storage+' GB</li><li><span>OS: </span>'+elem.specs.os+'</li><li><span>Camera: </span>'+elem.specs.camera+' Mpx</li><li><span>Description: </span>'+elem.description+'</li></ul><p class="product-price">£'+elem.price +'</p></li>');
            });
        });

        $('.products-list').html(itm);

    });



});



function loadProducts(){

    var url = 'products.json';
    var a = {};
    $.getJSON(url, function (data) {
        a = data;

        $.each(a, function(idx, elem){
            var itm = '';
            itm += '<li>';
            itm += '<a href="#" class="product-photo"><img src="'+elem.image.small+'" height="130" alt="'+elem.name+'"/></a>';
            itm += '<h2><a href="#">'+elem.name+'</a></h2>';
            itm += '<ul class="product-description">';
            itm += '<li><span>Manufacturer: </span>'+elem.specs.manufacturer+'</li>';
            itm += '<li><span>Storage: </span>'+elem.specs.storage+' GB</li>';
            itm += '<li><span>OS: </span>'+elem.specs.os+'</li>';
            itm += '<li><span>Camera: </span>'+elem.specs.camera+' Mpx</li>';
            itm += '<li><span>Description: </span>'+elem.description+'</li>';
            //itm += '';
            itm += '</ul>';
            itm += '<p class="product-price">£'+elem.price +'</p>';
            //itm += '';
            itm += '</li>';
            $('.products-list').append(itm);
            // $('.products-list').append('<li><a href="#" class="product-photo"><img src="'+elem.image.small+'" height="130" alt="'+elem.name+'"/></a><h2><a href="#">'+elem.name+'</a></h2><ul class="product-description"><li><span>Manufacturer: </span>'+elem.specs.manufacturer+'</li><li><span>Storage: </span>'+elem.specs.storage+' GB</li><li><span>OS: </span>'+elem.specs.os+'</li><li><span>Camera: </span>'+elem.specs.camera+' Mpx</li><li><span>Description: </span>'+elem.description+'</li></ul><p class="product-price">£'+elem.price +'</p></li>');
        });
    });

}

function resetForm() {

    //alert('Reset Form');

    //e.preventDefault();
    $('input:checkbox').prop("checked", false);

    var url = 'products.json';
    var a = {};
    var itm = '';
    $.getJSON(url, function (data) {
        a = data;

        $.each(a, function(idx, elem){

            itm += '<li>';
            itm += '<a href="#" class="product-photo"><img src="'+elem.image.small+'" height="130" alt="'+elem.name+'"/></a>';
            itm += '<h2><a href="#">'+elem.name+'</a></h2>';
            itm += '<ul class="product-description">';
            itm += '<li><span>Manufacturer: </span>'+elem.specs.manufacturer+'</li>';
            itm += '<li><span>Storage: </span>'+elem.specs.storage+' GB</li>';
            itm += '<li><span>OS: </span>'+elem.specs.os+'</li>';
            itm += '<li><span>Camera: </span>'+elem.specs.camera+' Mpx</li>';
            itm += '<li><span>Description: </span>'+elem.description+'</li>';
            //itm += '';
            itm += '</ul>';
            itm += '<p class="product-price">£'+elem.price +'</p>';
            //itm += '';
            itm += '</li>';
            //$('.products-list').append(itm);
            // $('.products-list').append('<li><a href="#" class="product-photo"><img src="'+elem.image.small+'" height="130" alt="'+elem.name+'"/></a><h2><a href="#">'+elem.name+'</a></h2><ul class="product-description"><li><span>Manufacturer: </span>'+elem.specs.manufacturer+'</li><li><span>Storage: </span>'+elem.specs.storage+' GB</li><li><span>OS: </span>'+elem.specs.os+'</li><li><span>Camera: </span>'+elem.specs.camera+' Mpx</li><li><span>Description: </span>'+elem.description+'</li></ul><p class="product-price">£'+elem.price +'</p></li>');
        });
        $('.products-list').html(itm);
    });


}

function filterP() {

    var checked = $(".filter-criteria label input:checkbox:checked").map(function(){
        return $(this).val();
    }).get(); // <----
    //console.log(checked);

    var manufacturer = [];
    var storage = [];
    var os = [];
    var camera = [];
    var filterMan = [];
    var filterStorage = [];
    var filterOs = [];
    var filterCam = [];

    $.each($("input[name='manufacturer']:checked"), function(){
        manufacturer.push($(this).val());
        //filterMan.push($(this).val());
    });
    $.each($("input[name='storage']:checked"), function(){
        storage.push($(this).val());
        //filterStorage.push($(this).val());
    });
    $.each($("input[name='os']:checked"), function(){
        os.push($(this).val());
        //filterOs.push($(this).val());
    });
    $.each($("input[name='camera']:checked"), function(){
        camera.push($(this).val());
        //filterCam.push($(this).val());
    });

    console.log('Manufacturers: '+manufacturer.join(", ")+'; Storage: '+storage.join(", ")+'; OS: '+os.join(", ")+'; Camera: '+camera.join(", "));
    //filterProducts(checkboxArray);


    var url = 'products.json';
    var a = {};

    $.getJSON(url, function (data) {
        a = data;
        //console.log(a);
        var itm = '';
        var items = $.grep(a, function (element, index) {

            //return element.specs.manufacturer == "Samsung";
            if (manufacturer.indexOf(element.specs.manufacturer) > -1) {
                return true;
            }else{
                return false;
            }

            if (storage.indexOf(element.specs.storage) > -1) {
                return true;
            }else{
                return false;
            }

            if (os.indexOf(element.specs.os) > -1) {
                return true;
            }else{
                return false;
            }

            if (camera.indexOf(element.specs.camera) > -1) {
                return true;
            }else{
                return false;
            }
        });

        var items9 = a.filter(function (el) {
            //return el.specs.manufacturer == "Samsung" &&
            //   el.specs.storage >= 16 &&
            //   el.specs.os == 'Android' &&
            //   el.specs.camera > 13;
            var result;
            if(manufacturer.length != 0){
                return manufacturer.indexOf(el.specs.manufacturer) !== -1;
                //result = manufacturer.indexOf(el.specs.manufacturer) !== -1;
                //result.push(~filterMan.indexOf(el.specs.manufacturer));
            }
            if(storage.length != 0){
                return storage.indexOf(el.specs.storage) !== -1;
                //result += ' && '+ storage.indexOf(el.specs.storage) > -1;
                //result.push(~filterStorage.indexOf(el.specs.storage));
            }
            if(os.length != 0){
                return os.indexOf(el.specs.os) !== -1;
                //result += ' && '+ os.indexOf(el.specs.os) > -1;
                //result.push(~filterOs.indexOf(el.specs.os));
            }
            if(camera.length != 0){
                return camera.indexOf(el.specs.camera) > -1;
                //result += ' && '+ camera.indexOf(el.specs.camera) !== -1;
                //result.push(~filterCam.indexOf(el.specs.camera));
            }
            //console.log(result);
            //var final = result.join("&&");
            //return result;
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

function filterProducts(arr){

    alert('Filter')

    var url = 'products.json';
    var a = {};
    var itm = '';
    if(arr.length==0)
    {
        $.getJSON(url, function (data) {
            a = data;

            $.each(a, function (idx, elem) {
                itm += '<li>';
                itm += '<a href="#" class="product-photo"><img src="'+elem.image.small+'" height="130" alt="'+elem.name+'"/></a>';
                itm += '<h2><a href="#">'+elem.name+'</a></h2>';
                itm += '<ul class="product-description">';
                itm += '<li><span>Manufacturer: </span>'+elem.specs.manufacturer+'</li>';
                itm += '<li><span>Storage: </span>'+elem.specs.storage+' GB</li>';
                itm += '<li><span>OS: </span>'+elem.specs.os+'</li>';
                itm += '<li><span>Camera: </span>'+elem.specs.camera+' Mpx</li>';
                itm += '<li><span>Description: </span>'+elem.description+'</li>';
                //itm += '';
                itm += '</ul>';
                itm += '<p class="product-price">£'+elem.price +'</p>';
                //itm += '';
                itm += '</li>';

            });
        });
    }
    else{
        $.getJSON(url, function (data) {
            a = data;

            $(arr).each(function (i, v) {
                $.each(a, function (key, elem) {

                    itm += '<li>';
                    itm += '<a href="#" class="product-photo"><img src="'+elem.image.small+'" height="130" alt="'+elem.name+'"/></a>';
                    itm += '<h2><a href="#">'+elem.name+'</a></h2>';
                    itm += '<ul class="product-description">';
                    itm += '<li><span>Manufacturer: </span>'+elem.specs.manufacturer+'</li>';
                    itm += '<li><span>Storage: </span>'+elem.specs.storage+' GB</li>';
                    itm += '<li><span>OS: </span>'+elem.specs.os+'</li>';
                    itm += '<li><span>Camera: </span>'+elem.specs.camera+' Mpx</li>';
                    itm += '<li><span>Description: </span>'+elem.description+'</li>';
                    //itm += '';
                    itm += '</ul>';
                    itm += '<p class="product-price">£'+elem.price +'</p>';
                    //itm += '';
                    itm += '</li>';
                    //$('.products-list').append(itm);
                });
            });
        });
    }
    $('.products-list').html(itm);
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