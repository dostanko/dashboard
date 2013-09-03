require 'net/http'

class AdminController < ApplicationController
  def index
  end
  
  def login
    # SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed
    # uri = URI('http://heroes.epam.com/api/authentication/login')
    # res = Net::HTTP.post_form(uri, {'userName' => params[:login], 'password' => params[:password]})
    # puts res.body
    #User.create(email: "dostanko@gmail.com", role: "SUPER_ADMIN")
    current_user = User.where(:email => params[:login]).first
    session[:user_id] = current_user.id if current_user
    redirect_to :root
  end  
  
  def logout
    session[:user_id] = nil
    redirect_to :root
  end  
  
end
