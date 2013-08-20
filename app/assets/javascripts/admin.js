$('#add_dashboard_btn').click( function() { 
    var form =  $('#add_dashboard_form');
    form.addClass('visible_form');
    form.find('input').val('');
    form.find('.alert').css('visibility', 'hidden');
});

$('#create_dashboard').click( function() {
    var me = this;
    var successFun = function(data){
        $(me).parents('.visible_form').removeClass('visible_form');
        //todo reload dashboards     
    };
    Dashboard.crate(successFun, this);
});

$('#creating_dashboard').click( function() {
    var successFun = function(data){
        //todo sow full form
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
            form.find('.alert').append(data.errors);
            mask.css('visibility', 'hidden');
        }
    });
};
