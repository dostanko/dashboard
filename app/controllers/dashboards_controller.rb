class DashboardsController < ApplicationController

  def index
    respond_to do |format|
      format.json { render :json => {:dashboards => Dash.all } }  
    end
  end

  def create
    name = params[:name]
    dashboard = Dash.create(name: name)
    params = {}
    if dashboard.errors.count == 0
       dashboard.save!
    end

    respond_to do |format|
      format.json { render :json => {:errors => dashboard.errors.full_messages, :dashboard =>  dashboard } }  
    end
  end

  def show
    name = params[:id]
    @dash = Dash.where(:name => name)[0] 
  end

  def delete
    dash_id = params[:dash_id]
    Dash.delete(dash_id)
    format.json { render :json => {:errors => "",  :dashboard =>  dashboard } }
  end
  
end
