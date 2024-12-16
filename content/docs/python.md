## Setting Up Your Django Environment

1. **Enter your environment:**
    ```sh
    source env/bin/activate
    ```

2. **Install Django:**
    ```sh
    pip3 install django
    ```

3. **Start a new project:**
    ```sh
    python3 manage.py startproject [projectname]
    ```

4. **Move `env` folder inside `[projectname]`:**
    ```sh
    mv env [projectname]
    ```

5. **Open VSCode:**
    ```sh
    code .
    ```

6. **Make sure you are in the environment:**
    ```sh
    source env/bin/activate
    ```

7. **Run the server:**
    ```sh
    python3 manage.py runserver
    ```

## Creating a New App

1. **Create a new app within the project:**
    ```sh
    python3 manage.py startapp [appname]
    ```

2. **Add the app to `settings.py`:**
    ```python
    # If our app is named projects...
    'projects.apps.ProjectsConfig'
    ```

## Creating and Applying Models

1. **Create models:**
    ```sh
    python3 manage.py makemigrations
    ```

2. **Apply migrations:**
    ```sh
    python3 manage.py migrate
    ```

## Creating and Registering Admin Superuser

1. **Create superuser:**
    ```sh
    python3 manage.py createsuperuser
    ```

2. **Register models in the admin.py:**
    ```python
    from django.contrib import admin
    # my model is School so here I go!
    from .models import School

    admin.site.register(School)
    ```

## Running the app and modifying with Tailwind

1. **Start Tailwind:**
    ```sh
    python3 manage.py tailwind start
    ```
