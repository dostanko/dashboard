module Dashboard

  class LayoutsController < ApplicationController

    def index
      respond_to do |format|
         format.json { render :json => {:dashboards => Layout.all } }  
      end
    end
    
    def new
       @layout_types = Layout.types
    end  

    def create
      type = params[:type]
      layout = Layout.create(type: type, dashboard_id: params[:dashboard_id])
      params = {}
      if layout.errors.count == 0
        layout.save!
      end
  
      respond_to do |format|
        format.json { render :json => {:errors => layout.errors.full_messages, 
          :layout =>  layout } }  
      end
    end

  end

end
