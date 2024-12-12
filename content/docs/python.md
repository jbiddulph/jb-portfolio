Enter your environment:
source env/bin/activate

pip3 install django

python3 manage.py startproject [projectname]

Move env folder inside projectname

open vsCode

make sure you are in the environment
source env/bin/activate
python3 manage.py runserver

Create a new app within project
python3 manage.py startapp [appname]
add app to settings.py

If our app is named projects...
'projects.apps.ProjectsConfig'

Create models
python3 manage.py makemigrations
python3 manage.py migrate
