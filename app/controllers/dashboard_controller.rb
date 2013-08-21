class DashboardController < ApplicationController

  def show
    name = params[:name]
    @dash = Dash.where(:name => name)[0] 
  end

end
