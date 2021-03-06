require "rvm/capistrano"
require "bundler/capistrano"

set :rvm_ruby_string, 'default'
set :application, "dashboard"
default_run_options[:pty] = true

set :scm, :git
set :repository,  "git@github.com:dostanko/dashboard.git"
set :deploy_to, "/Users/dash/#{application}"
#set :scm_passphrase, ""

set :keep_releases, 3
after "deploy:restart", "deploy:cleanup" 

set :user, "dash"
set :ssh_options, { :forward_agent => true }
set :branch, fetch(:branch, "master")   # from command line cap -S branch=branchname deploy
set :deploy_via, :remote_cache

server "epbyminw1499.minsk.epam.com", :app, :web
#set :use_sudo, false

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
  task :restart do
#TODO check if exists bundler
#gem install --version '1.3.5' bundler 
    run "cd '#{current_path}'; bundle exec thin restart -C thin.yml"
  end
end
