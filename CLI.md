ng g c core/header
ng g c core/footer
ng g c routes/home/home --type=page

ng g s shared/log/log
ng g c shared/page

ng g s routes/home/home.store
ng g interceptor core/cache

ng g s shared/cache

ng g c core/ThemeToggle

ng g environments

- \src\app\shared\env\env.token.ts
- \src\app\shared\global\global.store.ts

ng g c routes/home/home

ng g c routes/user/user --type=page
ng g c routes/user/register --type=page
ng g c routes/user/login --type=page
ng g c routes/user/reset-password --type=page
