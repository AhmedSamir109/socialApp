## SocialApp
SocialApp is an Angular 17 demo social network that lets users authenticate, view a posts feed, create new posts, browse users, and manage their profile.
Core flows:

- **Auth**: Login and register forms; protected routes via a guard.
- **Posts**: View feed, create new posts, filter out hidden posts with a custom pipe.
- **Users**: List and view users via a dedicated feature area.
- **Profile**: Profile page with a change-password flow in its own module.

## Architecture:
Feature modules: user-profile, change-password, shared UI via shared.
Components: posts, create-new-post, login-form, register-form, navbar, not-found.
Services: users.service.ts, post.service.ts using HttpClient.
Pipes/Guards: filter-hidden-posts.pipe.ts, path.guard.ts.
Interceptor: loading.interceptor.ts to improve UX during HTTP calls.
Backend:
Uses json-server with db.json to provide a mock REST API for local development.

### Key Features
- Authentication UI: login and registration forms
- Protected routes via a route guard
- User profile with password change flow
- Posts feed with create-new-post component
- Users list and filtering of hidden posts via a custom pipe
- Loading interceptor for better UX on HTTP requests
- Local mock API using `json-server`

## Tech Stack
- Angular 17 (CLI 17.0.3)
- TypeScript
- RxJS
- Angular Router & HttpClient
- JSON Server (mock REST API)
- CSS

## Getting Started

### 1) Clone and install
git clone https://github.com/AhmedSamir109/socialApp.git
npm i


### 2) Run the mock API (JSON Server)
Install once (globally):
npm i -g json-server

Start the API (serves `db.json`):
json-server --watch db.json

### 3) Start the Angular dev server  (
ng s -o 
This opens the app in your default browser at `http://localhost:4200`.



## Project Structure
High-level layout of the workspace:
```text
d:\ITI WorkSpace\socialApp ITI\
  - angular.json
  - db copy.json
  - db.json
  - node_modules\
  - package-lock.json
  - package.json
  - README.md
  - src\
    - app\
      - app-routing.module.ts
      - app.component.css
      - app.component.html
      - app.component.ts
      - app.module.ts
      - change-password\
        - change-password\
          - change-password.component.css
          - change-password.component.html
          - change-password.component.ts
        - change-password-routing.module.ts
        - change-password.module.ts
      - components\
        - create-new-post\
          - create-new-post.component.css
          - create-new-post.component.html
          - create-new-post.component.ts
        - login-form\
          - login-form.component.css
          - login-form.component.html
          - login-form.component.ts
        - navbar\
          - navbar.component.css
          - navbar.component.html
          - navbar.component.ts
        - not-found\
          - not-found.component.css
          - not-found.component.html
          - not-found.component.ts
        - posts\
          - posts.component.css
          - posts.component.html
          - posts.component.ts
        - register-form\
          - register-form.component.css
          - register-form.component.html
          - register-form.component.ts
      - guards\
        - path.guard.ts
      - interceptor\
        - loading.interceptor.ts
      - models\
        - ipost.ts
        - iusers.ts
        - user-posts.ts
      - pipes\
        - filter-hidden-posts.pipe.ts
      - services\
        - post.service.ts
        - users.service.ts
      - shared\
        - shared.module.ts
        - users\
          - users.component.css
          - users.component.html
          - users.component.ts
      - user-profile\
        - profile\
          - profile.component.css
          - profile.component.html
          - profile.component.ts
        - user-profile-routing.module.ts
        - user-profile.module.ts
    - assets\
      - 323329329-256-k716332.jpg
      - 4.jpeg
      - images (7).jpeg
    - favicon.ico
    - index.html
    - main.ts
    - styles.css
  - tsconfig.app.json
  - tsconfig.json
  - tsconfig.spec.json




