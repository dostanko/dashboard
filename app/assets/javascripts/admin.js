Global = {};
Global.CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

$('#add_dashboard_btn').click( function() { 
    var form =  $('#add_dashboard_form');
    form.addClass('visible_form');
    form.find('input').val('');
    form.find('.alert').css('visibility', 'hidden');
});

$('#create_dashboard').click( function() {
    var successFun = function(data){
        var url =  "http://" + window.location.host + "/dashboards/" + data.dashboard.name;
        window.location.href = url;
    };
    Dashboard.crate(successFun, this );
});

$('.hide_form').click( function() { 
    $(this).parents('.visible_form').removeClass('visible_form');
});

//todo more general logic for requests, seporate form and just ajax
Dashboard = {};
Dashboard.crate = function(successFun, btn){
    var form = $($(btn).parents('.dash_form')[0]);
    var params = {};
    var inputs = form.find('input');
    $.each(inputs, function(index, input){
        params[$(input).attr('name')] = $(input).attr('value')
    });  
    var mask = $('#mask')
    mask.css('visibility', 'visible');

    var erAlert = form.find('.alert');
    erAlert.css('visibility', 'hidden');    

    $.ajax({
        type: 'POST',
        url: '/dashboards',
        headers: {
           'X-CSRF-Token': Global.CSRF_TOKEN 
        },
        data: params,
        dataType: 'json',
        timeout: 300,
        success: function(data){
            if (data.errors.length > 0){
                erAlert.text(data.errors);
                erAlert.css('visibility', 'visible'); 
            } else {
                successFun(data);
            }
            mask.css('visibility', 'hidden');
        },
        error: function(xhr, type){
            alert("server error");
            mask.css('visibility', 'hidden');
        }
    });
};

Dashboard.loadAll = function(){
    var mask = $('#mask')
    $.ajax({
        type: 'GET',
        url: '/dashboards',
        headers: {
           'X-CSRF-Token': Global.CSRF_TOKEN 
        },
        dataType: 'json',
        timeout: 300,
        success: function(data){
            var tbody = $('#dashboards_table').find('tbody');
            tbody.text('');
            $.each(data.dashboards, function(index, dash){
                var editUrl =  "http://" + window.location.host + "/dashboards/" + dash.name;
                tbody.append('<tr><td>' + dash.name + '</td><td>' 
                  + '/dashboard/'+ dash.name + '</td><td>' 
                  + '/' + '</td><td>' 
                  + '<a href="' + editUrl + '" class="small button">edit</a>' 
                  + '<a href="#" class="small button">delete</a>' 
                  + '</td></tr>');
            });
            mask.css('visibility', 'hidden');
        },
        error: function(xhr, type){
            alert("server error");
            mask.css('visibility', 'hidden');
        }
    });
};

Dashboard.deletePopup = function(name, id){

};

$( function() {
    if ($('#dashboards_table').length == 1) {
        Dashboard.loadAll();
    }
});

