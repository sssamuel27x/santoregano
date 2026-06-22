# Sant' Orégano — React

React/Vite rebuild of the Sant' Orégano website, with a persistent shopping cart and a menu-driven order flow.

Pizzas open a configurator before being added to the cart. Customers can keep one flavour or combine two half pizzas; a half-and-half pizza costs 50% of each selected flavour at the chosen size. Pizzas can also add an optional Catupiry, Mozzarella, Cream Cheese or Brigadeiro stuffed crust. Non-pizza products continue to add directly.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Main routes

- `/` — home
- `/pizzas` — full menu and cart actions
- `/encomenda` — calculated cart, customer details and WhatsApp checkout
- `/contactos` — opening hours and location
- `/admin/login` — secure Google administrator login
- `/admin` — product and price management

The legacy `.html` URLs are also supported, so `/pizzas.html`, `/encomenda.html` and `/contactos.html` still work when the host is configured to serve the React entry point for unmatched paths.

## Delivery distance

Home-delivery addresses are geocoded with OpenStreetMap Nominatim and routed by car with OSRM from Praça Conde de Águeda. The checkout displays driving distance and duration, then calculates the fee as €1 base plus €1 per completed 3 km. Delivery is limited to 25 km.

Lookups are debounced and cached locally for seven days. The public endpoints are appropriate for this low-volume restaurant site; for higher traffic, replace the endpoint constants in `src/pages/Order.jsx` with a hosted or commercial provider.

## Admin panel

Open `/admin/login` and sign in with the authorised Google account. The panel can add, edit and remove products in every category and restore the original menu. Changes are stored in Cloud Firestore and update the public menu in real time on every device.

The app uses the Firebase project `santoregano-8a10a` on the free Spark plan. Firestore rules allow everyone to read `menu/current`, but only the verified administrator account can write it. Google Authentication is enabled. When publishing on a custom domain, add that domain under Firebase Authentication → Settings → Authorised domains.
