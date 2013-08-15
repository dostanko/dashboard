class User
  include Mongoid::Document
 
  roles = [:SUPER_ADMIN, :ADMIN, :CONTENT_MANAGER, :VIEWER]
 
  field :email,    type: String
  field :role,     type: String,   :default => :VIEWER
 
  validates_presence_of :email, :role
end