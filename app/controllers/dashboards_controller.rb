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

  def destroy
    dash_id = params[:id]
    result = Dash.find(dash_id).destroy
    respond_to do |format|
      format.json { render :json => {:errors => result ? "" : "Can't delete dash" } }
    end
  end
  
end
