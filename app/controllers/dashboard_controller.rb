class DashboardController < ApplicationController

  layout "clientdash"

  def show
    name = params[:name]
    @dash = Dash.where(:name => name)[0] 
  end

end
