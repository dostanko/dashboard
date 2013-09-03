class User
  include Mongoid::Document
 
  roles = [:SUPER_ADMIN, :ADMIN, :CONTENT_MANAGER]
 
  field :email,    type: String
  #TODO 
  field :role,     type: String,   :default => :VIEWER
  
  has_and_belongs_to_many :dashboards
 
  validates_presence_of :email, :role
end