module ApplicationHelper
  def loggedIn
    return session[:user_id]
  end 
end
