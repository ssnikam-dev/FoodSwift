# Login, cart, search and restyle: what changed and what to add

## Flow
1. Anyone can browse restaurants, search, open menus and add items. The cart is saved in the browser (`fd_cart_guest`).
2. Clicking **Checkout / Place order** goes to `/orderSummary`, which is protected by `AuthGuard`.
   Anonymous users are redirected to `/auth?returnUrl=/orderSummary` (login / sign-up page).
3. After login or register:
   - items picked as a guest move into the account's cart and are saved on the server (`PUT /cart`);
   - if the guest cart was empty, the account's saved cart is loaded (`GET /cart`), so it is there on any device.
4. Logout clears the session and the on-screen cart; the saved cart stays on the server for the next login.

## Frontend (food-delivery-app)
New:  `auth/` (login/register page, `AuthService`, `AuthInterceptor`, `AuthGuard`), `cart/` (`CartService`, `/cart` page)
Changed: header (search, cart badge, login/logout menu), restaurant listing (search via `?q=`, skeleton and empty states,
stable images), food catalogue (menu search, veg-only filter, add/stepper, sticky cart bar), order summary (reads the cart,
uses the logged-in user id), routing (`''` redirect fixed, `AppRoutingModule` imported last), `styles.css` (new design tokens),
`index.html` (fonts).
Role check: `canActivate: [AuthGuard], data: { role: 'ADMIN' }` on any route.

## Backend contract the frontend expects (on `API_URL_UD`, port 9093)
| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/auth/register` | `{name,email,password}` | `{token, user:{id,name,email,role}}` (409 if the email exists) |
| POST | `/auth/login` | `{email,password}` | `{token, user}` (401 on bad credentials) |
| GET | `/cart` | n/a (Bearer token) | `{restaurant, items:[...]}` |
| PUT | `/cart` | `{restaurant, items}` | 204 |

## Backend code to add
**User service** (`backend-auth/user-service/`): your user service was not in the zip, so these are new files in a
`com.codedecode.user` package. Adjust the package name and merge with an existing `User` entity if you have one.
- `pom-additions.xml`: spring-security, validation, jjwt
- `application-additions.yaml`: `app.jwt.secret` (env var `JWT_SECRET`, 32+ chars), CORS origin
- `auth/`: `User`, `UserRepository`, `AuthDtos`, `AuthController` (BCrypt hashing, role forced to USER), `AuthExceptionHandler`
- `security/`: `JwtService` (issue and parse HS256 tokens), `JwtAuthFilter`, `SecurityConfig` (stateless, `/auth/**` public, the rest authenticated)
- `cart/`: `Cart`, `CartRepository`, `CartController` (user id taken from the token, never from the request body)

**Food catalogue service** (already edited in `foodcatalogue-service/`):
- JWT *verification* only (`security/` package, same `JWT_SECRET`), GET endpoints stay public
- `POST /foodCatalogue/addFoodItem` now requires `ROLE_ADMIN`
- new `GET /foodCatalogue/search/{restaurantId}?q=` (optional; the UI filters client-side today)

**Order service** (not in the zip): copy `JwtVerifier`, `JwtAuthFilter`, `SecurityConfig` from the food catalogue service
and set `JWT_SECRET`. Then ignore the `userId` in the request body:
```java
@PostMapping("/saveOrder")
public ResponseEntity<?> saveOrder(@RequestBody OrderDTO dto, Authentication auth) {
    dto.setUserId(((Long) auth.getPrincipal()).intValue());   // match your DTO's type
    ...
}
```

## Run notes
- Set the same `JWT_SECRET` for the user, food catalogue and order services.
- If you use an API gateway, route `/auth/**` and `/cart/**` to the user service. `set-env.js` already points every
  `API_URL_*` at one base URL.
- Create an admin by setting `role='ADMIN'` on a row in `app_user` (registration always creates USER).

## Not done / worth knowing
- I could not run `ng build` or `mvn compile` here (no network, no dependencies installed), so please build once and
  send me any errors.
- The token is kept in `localStorage` (simple, but readable by any XSS). Keep the Angular app free of `innerHTML` with
  untrusted data; for stricter setups switch to an httpOnly cookie.
- The generated `*.spec.ts` files reference the old header and were not updated.
- Payment is not part of this change; "Place order" posts to the existing order endpoint.
