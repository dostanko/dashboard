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
    puts params
    puts 'ddd'
    name = params[:id]
    @dash = Dash.where(:name => name)[0] 
  end
  
end
