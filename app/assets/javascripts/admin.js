Global = {};
Global.CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
Global.mask = $('#mask');

var Dashboard = {};

Dashboard.createForm = (function(){
    var me =  $('#add_dashboard_form');
    var inputs =  me.find('input');
    var alertView =  me.find('.alert');
    
    $('#add_dashboard_btn').click( function() {
        var successFun = function(data){
            var url =  "http://" + window.location.host + "/dashboards/" + data.dashboard.name;
            window.location.href = url;
        };
        var params = {};
        $.each(inputs, function(index, input){
            params[$(input).attr('name')] = $(input).attr('value')
        }); 
        alertView.css("visibility", "hidden"); 
        $.ajax({
            type: 'POST',
            url: '/dashboards',
            headers: {
               'X-CSRF-Token': Global.CSRF_TOKEN 
            },
            data: params,
            dataType: 'json',
            success: function(data){
                if (data.errors.length > 0){
                    alertView.text(data.errors);
                    alertView.css("visibility", "visible"); 
                } else {
                    successFun(data);
                }
            //Global.mask.hide();
            },
            error: function(xhr, type){
            //Global.mask.hide();
            }
        }); 
    });

    me.find('.hide_form').click( function() {
        me.removeClass("visible_form");
    });

    return me;
}());

Dashboard.delForm = (function(){
    var me = $('.delete_dash_form')[0];

    var inputName = $('#del_dash_name')[0];
    me.curDashName;
    me.curDashId;

    me.show = function(dataset){
        me.curDashName = dataset.dash_name;
        me.curDashId = dataset.dash_id;
        inputName.value = "";
        //me.find('.alert').css('visibility', 'hidden');
        $(me).css("visibility", "visible");
        Global.mask.css("visibility", "visible");
    }
   
    $('#del_dash_btn').click( function(){
        if (me.curDashName !== inputName.value){
            return;
        }
        $.ajax({
            type: 'DELETE',
            url: '/dashboards',
            headers: {
               'X-CSRF-Token': Global.CSRF_TOKEN 
            },
            data: {id : me.curDashId},
            dataType: 'json',
            success: function(data){
            },
            error: function(data){
            }
        });
    });

    $(me).find('.hide_form').click( function() {
        Global.mask.css("visibility", "hidden");
        $(me).css("visibility", "hidden");
    });

    return me;
}());


$('#dashboards_table').on('click', '.delete_dash', function() {
//closest doesnt work
    var dataset = $(this).parents('tr')[0].dataset;
    Dashboard.delForm.show(dataset);
});


Dashboard.loadAll = function(){
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
                tbody.append(
                  '<tr data-dash_id="' + dash._id.$oid + '" data-dash_name="' + dash.name + '"><td>'
                       + dash.name + '</td><td>' 
                  + '/dashboard/'+ dash.name + '</td><td>' 
                  + '/' + '</td><td>' 
                  + '<a href="' + editUrl + '" class="small button">edit</a>' 
                  + '<button class="small button delete_dash">delete</button>' 
                  + '</td></tr>');
            });
           // Global.mask.hide();
        },
        error: function(xhr, type){
            console.log("server error");
           // Global.mask.hide();
        }
    });
};


$( function() {
    if ($('#dashboards_table').length == 1) {
        Dashboard.loadAll();
    }
});

