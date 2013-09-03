Global = {};
Global.CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
Global.mask = $('#mask');

var Dashboard = {};

Dashboard.createForm = (function(){
    var me =  $('#add_dashboard_form');
    if (!me)
       return null;
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
        Global.mask.css("visibility", "visible"); 
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
                Global.mask.css("visibility", "hidden");
            },
            error: function(xhr, type){
                Global.mask.css("visibility", "hidden");
            }
        }); 
    });

    me.find('.hide_form').click( function() {
        me.removeClass("visible_form");
    });

    return me;
}());

Dashboard.delForm = (function(){
    var me = $($('.delete_dash_form')[0]);

    if (!me)
       return null;

    var inputName = $('#del_dash_name')[0];
    var alertView =  me.find('h6.alert');
    me.curDashName;
    me.curDashId;

    me.show = function(dataset){
        me.curDashName = dataset.dash_name;
        me.curDashId = dataset.dash_id;
        inputName.value = "";
        //me.find('.alert').css('visibility', 'hidden');
        me.css("visibility", "visible");
        Global.mask.css("visibility", "visible");
    }
   
    $('#del_dash_btn').click( function(){
        if (me.curDashName !== inputName.value){
            alertView.text("Name doesn't match");
            alertView.css("visibility", "visible"); 
            return;
        }
        $.ajax({
            type: 'DELETE',
            url: '/dashboards/' +  me.curDashId,
            headers: {
               'X-CSRF-Token': Global.CSRF_TOKEN 
            },
            dataType: 'json',
            success: function(data){
                Dashboard.table.loadAll();
                closeMe();
            },
            error: function(data){
            }
        });
    });

    me.find('.hide_form').click( function() {
        closeMe();
    });

    function closeMe(){
        Global.mask.css("visibility", "hidden");
        alertView.css("visibility", "hidden"); 
        me.css("visibility", "hidden");
    };

    return me;
}());

Dashboard.table  = (function(){
    var me = $('#dashboards_table');
    if (me.length === 0)
       return null;

    me.on('click', '.delete_dash', function() {
            var dataset = $(this).parents('tr')[0].dataset;
            Dashboard.delForm.show(dataset);
    });
  
 
    me.loadAll = function(){
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

    me.loadAll();
    return me;
}());

Dashboard.editNav = (function(){
    var me = $("#edit_dash_nav");
    if (me.length === 0)
       return null;

    var activeLi;
    var activePanel;

    me.on('click', 'li', function(el) {
        activeLi.removeClass("active");
        activePanel.hide();
        setActiveLi(this);
    });

    function setActiveLi(newLi){
        activeLi = $(newLi);
        activeLi.addClass("active");
        activePanel = $("#" + newLi.dataset.panel);
        activePanel.show();
    };

    setActiveLi(me.find('li')[0]);
  
    return me;
}());

Dashboard.templatesTable = (function(){
    var me = $("#layout_templates");
    var selectedTd;
    var selectedTemplate;
    if (me.length === 0)
        return null;

    me.on('click', 'td', function(el) {
	    selectTd(this);
	});		

	function selectTd(newTd){
		if (!newTd)
		    return;
		$(selectedTd).removeClass("selected");
		selectedTd = newTd;
		$(selectedTd).addClass("selected");
	//	selectedTemplate == newLi.dataset.template;
	};
	selectTd(me.find("td")[0]);
    return me;	
}());

Dashboard.layputsTable = (function(){
    var me = $("#");
    if (me.length === 0)
        return null;

    me.load = function(){

    };

    me.load(); 

    return me;
}());

Dashboard.layputSchedule = (function(){
	var me = $('#schedule_view');
	if (me.length === 0)
        return null;

    me.find('.close').on('click', function(){
		me.css('visibility', 'hidden');
		Global.mask.css('visibility', 'hidden');
    });

    //@start_min - mins from 00:00 
    //@len  - in mins
    //@periodicity - in mins
    //@end_min   - mins from 00:00 
    me.addSchedule = function(params){	
	    if (!params.periodicity){    
	        for (var i=params.start_min; i < params.start_min + params.len; i++){	
	 	        var cell = $('#min' + i);		
	            cell.css('background', 'pink');
	        };
	    } else {
	        for (var i=params.start_min; i <= params.end_min; i = i + params.periodicity){	
		        for (var j=i; j < i + params.len; j++){	
				    var cell = $('#min' + j);		
				    cell.css('background', 'pink');
				}
	        };		 
	    }
    };
    me.addSchedule({start_min: 65, len: 40, periodicity: 120, end_min: 960});
    return me;
}());


$('#show_new_schedule').on('click', function(){
	Dashboard.layputSchedule.css('visibility', 'visible');
	Global.mask.css('visibility', 'visible');
});



