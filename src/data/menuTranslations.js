const enProducts = {
  margherita: ['Margherita', 'Tomato sauce, mozzarella, tomato, olive, Parmesan and basil.'],
  pepperoni: ['Pepperoni', 'Tomato sauce, mozzarella and spicy pepperoni.'],
  'moda-chefe': ["Chef's Style", 'Tomato sauce, Catupiry-stuffed edge, mozzarella, calabresa sausage, mushrooms and basil.'],
  calabresa: ['Calabresa', 'Tomato sauce, mozzarella, calabresa sausage and onion.'],
  'calabresa-especial': ['Special Calabresa', 'Tomato sauce, mozzarella, ground calabresa sausage and Catupiry.'],
  baiana: ['Baiana', 'Tomato sauce, mozzarella, ground calabresa sausage, onion, egg and calabresa pepper.'],
  capricciosa: ['Capricciosa', 'Tomato sauce, mozzarella, tomato, ham and mushrooms.'],
  chourico: ['Chouriço', 'Tomato sauce, mozzarella, chouriço sausage, onion and olives.'],
  'quatro-queijos': ['Four Cheeses', 'Tomato sauce, mozzarella, Catupiry, provolone and gorgonzola.'],
  'frango-catupiry': ['Chicken with Catupiry or Cream Cheese', 'Tomato sauce, mozzarella, shredded chicken and Catupiry or Cream Cheese.'],
  'carne-sol': ['Sun-Cured Beef', 'Tomato sauce, mozzarella, sun-cured beef, onion and Catupiry.'],
  sertaneja: ['Country Style', 'Tomato sauce, mozzarella, shredded sun-cured beef, bacon, tomato and onion.'],
  bacon: ['Bacon', 'Tomato sauce, mozzarella, ham, bacon and egg.'],
  portuguesa: ['Portuguese Style', 'Tomato sauce, mozzarella, ham, tomato, red onion, bell pepper, peas and egg.'],
  brasileira: ['Brazilian Style', 'Tomato sauce, mozzarella, spicy pepperoni, olives and Catupiry.'],
  camarao: ['Shrimp', 'Tomato sauce, mozzarella and selected shrimp.'],
  'camarao-especial': ['Special Shrimp', 'Tomato sauce, mozzarella, selected shrimp and Catupiry.'],
  carbonara: ["Sant'Orégano Carbonara", 'Tomato sauce, mozzarella, smoked pork loin, provolone, bacon, tomato and boiled egg.'],
  milho: ['Sweet Corn', 'Tomato sauce, mozzarella and sweet corn.'],
  mozzarella: ['Mozzarella', 'Tomato sauce, mozzarella and sliced tomato.'],
  fiambre: ['Ham', 'Tomato sauce, mozzarella, ham and tomato.'],
  'frango-mozzarella': ['Chicken Mozzarella', 'Tomato sauce, mozzarella and chicken.'],
  caipira: ['Caipira', 'Tomato sauce, mozzarella, chicken, ham, bacon and corn.'],
  americana: ['American Style', 'Tomato sauce, mozzarella, ham, bacon and egg.'],
  atum: ['Tuna', 'Tomato sauce, mozzarella, tuna, onion and a drizzle of olive oil.'],
  'brocolos-bacon': ['Broccoli with Bacon', 'Tomato sauce, mozzarella, broccoli and bacon.'],
  vegetariana: ['Vegetarian', 'Tomato sauce, mozzarella, sweet corn, sun-dried tomato, arugula, Parmesan, basil, mushrooms and olives.'],
  brigadeiro: ['Brigadeiro Pizza', 'A light touch of mozzarella and homemade brigadeiro.'],
  'romeu-julieta': ['Romeo and Juliet', 'A light touch of mozzarella, fresh cream and melted guava paste.'],
  nutella: ['Nutella', 'A light touch of mozzarella, fresh cream and Nutella.'],
  ananas: ['Pineapple', 'Tomato sauce, mozzarella and pineapple.'],
  'delicia-banana-morangos': ['Banana and Strawberry Delight', 'Special cream sauce, handmade chocolate, banana and strawberries.'],
  torradinha: ['Toasted Bread', 'Toasted bread with olive oil, oregano, olives and cheeses.'],
  azeitonas: ['Olives with Cheese', 'Olives, cheese and oregano.'],
  'calzone-calabresa': ['Brazilian Calabresa Calzone', 'Mozzarella, calabresa sausage, onion and Catupiry.'],
  'calzone-portuguesa': ['Portuguese Style Calzone', 'Mozzarella, ham, mushrooms and pineapple.'],
  'calzone-casa': ['House Style Calzone', 'Choose five ingredients from the menu.'],
  'crocante-gorgonzola': ['Crispy Gorgonzola Pizza', 'Very thin and crispy dough, extra virgin olive oil and gorgonzola.'],
  'crocante-calabresa': ['Crispy Calabresa Pizza', 'Very thin and crispy dough, extra virgin olive oil, calabresa sausage and gorgonzola.'],
  'crocante-parmesao': ['Crispy Parmesan Pizza', 'Very thin and crispy dough, extra virgin olive oil and Parmesan.'],
  batatas: ['French Fries 250g', 'Crispy French fries.'],
  'batatas-bacon': ['French Fries with Bacon and Cheddar', 'Crispy bacon and cheddar sauce.'],
  'batatas-parmesao': ['French Fries with Parmesan', 'Grated Parmesan cheese.'],
  bolonhesa: ['Spaghetti Bolognese', 'Tomato sauce, minced meat and Parmesan.'],
  parisiense: ['Parisian Spaghetti', 'Special house white sauce, chicken, ham, bacon, peas and Parmesan.'],
  'massa-camarao': ['Shrimp Spaghetti', 'White or red sauce and shrimp sautéed with garlic and olive oil.'],
  'salada-atum': ['Tuna Pasta Salad', 'Rosé or red sauce, tuna, arugula, corn and Parmesan.'],
  'salada-frango': ['Chicken Pasta Salad', 'Rosé or red sauce, shredded chicken, arugula, corn and smoked cheese.'],
  'lasanha-bolonhesa': ['Lasagna Bolognese', 'Tomato sauce, minced meat and mozzarella.'],
  'lasanha-queijos': ['Four Cheese Lasagna', 'Mozzarella, provolone, gorgonzola and Catupiry.'],
  'lasanha-camarao': ['Shrimp Lasagna', 'Shrimp and gratinated mozzarella.'],
  'lasanha-frango': ['Chicken Lasagna', 'Tomato sauce or special house white sauce, chicken, mozzarella, bacon, ham and peas.'],
  'bife-parmegiana': ['Veal Steak Parmigiana', 'Veal steak, mozzarella, ham, rice and potatoes.'],
  'camarao-parmegiana': ['Shrimp Parmigiana', 'Shrimp, mozzarella, rice and French fries.'],
  'camarao-chiclete': ['Creamy Shrimp', 'Creamy shrimp, special cheese, rice and potatoes.'],
  'agua-500': ['Mineral Water 500ml', 'Fresh mineral water.'],
  'agua-15': ['Mineral Water 1.5L', 'Family-size bottle.'],
  pedras: ['Água das Pedras 250ml', 'Sparkling water.'],
  frize: ['Frize', 'Sparkling water.'],
  compal: ['Compal Fruit Juice 200ml', 'Fruit nectar.'],
  coca: ['Coca-Cola 330ml', '330ml can.'],
  'coca-zero': ['Coca-Cola Zero 330ml', '330ml can.'],
  'coca-vidro': ['Coca-Cola Glass Bottle', 'Glass bottle.'],
  'coca-1l': ['Coca-Cola 1L', '1L bottle.'],
  guarana: ['Guaraná 1.5L', 'Family-size bottle.'],
  'cerveja-mini': ['Mini Beer', 'Mini bottle.'],
  'cerveja-330': ['Beer 330ml', '330ml bottle.'],
  'cerveja-500': ['Beer 500ml', '500ml beer.'],
  fino: ['Draft Beer', 'Served on draft.'],
  carlsberg: ['Carlsberg', 'Fresh beer.'],
  heineken: ['Heineken', 'Fresh beer.'],
  somersby: ['Somersby', 'Fresh cider.'],
  sangria: ['Draft Sangria', 'Glass.'],
  tango: ['Tango', 'Glass.'],
  panache: ['Panaché', 'Glass.'],
  'cerveja-martini': ['Beer with Martini', 'Glass.'],
  'vinho-branco': ['Draft White Wine', 'Glass.'],
  'vinho-casa': ['Traditional Red Wine (75ml glass)', '75ml glass.'],
  porto: ['Port Wine (75ml)', '75ml glass.'],
  'vinho-especial-casa': ['House Special Wine 75ml', '75ml glass.'],
  'vinho-mateus': ['Mateus Wine 75ml', '75ml glass.'],
  espresso: ['Espresso', 'Espresso coffee.'],
  cappuccino: ['Cappuccino', 'Coffee with creamy milk.'],
  descafeinado: ['Decaffeinated Coffee', 'Decaffeinated coffee.'],
  'meia-leite': ['Coffee with Milk', 'Coffee with milk.'],
};

const esProducts = {
  margherita: ['Margherita', 'Salsa de tomate, mozzarella, tomate, aceituna, parmesano y albahaca.'],
  pepperoni: ['Pepperoni', 'Salsa de tomate, mozzarella y pepperoni picante.'],
  'moda-chefe': ['Al Estilo del Chef', 'Salsa de tomate, borde relleno de Catupiry, mozzarella, calabresa, champiñones y albahaca.'],
  calabresa: ['Calabresa', 'Salsa de tomate, mozzarella, calabresa y cebolla.'],
  'calabresa-especial': ['Calabresa Especial', 'Salsa de tomate, mozzarella, calabresa molida y Catupiry.'],
  baiana: ['Baiana', 'Salsa de tomate, mozzarella, calabresa molida, cebolla, huevo y pimienta calabresa.'],
  capricciosa: ['Capricciosa', 'Salsa de tomate, mozzarella, tomate, jamón y champiñones.'],
  chourico: ['Chorizo', 'Salsa de tomate, mozzarella, chorizo, cebolla y aceitunas.'],
  'quatro-queijos': ['Cuatro Quesos', 'Salsa de tomate, mozzarella, Catupiry, provolone y gorgonzola.'],
  'frango-catupiry': ['Pollo con Catupiry o Queso Crema', 'Salsa de tomate, mozzarella, pollo desmenuzado y Catupiry o queso crema.'],
  'carne-sol': ['Carne de Sol', 'Salsa de tomate, mozzarella, carne de sol, cebolla y Catupiry.'],
  sertaneja: ['Sertaneja', 'Salsa de tomate, mozzarella, carne de sol desmenuzada, bacon, tomate y cebolla.'],
  bacon: ['Bacon', 'Salsa de tomate, mozzarella, jamón, bacon y huevo.'],
  portuguesa: ['Portuguesa', 'Salsa de tomate, mozzarella, jamón, tomate, cebolla morada, pimiento, guisantes y huevo.'],
  brasileira: ['Brasileña', 'Salsa de tomate, mozzarella, pepperoni picante, aceitunas y Catupiry.'],
  camarao: ['Gambas', 'Salsa de tomate, mozzarella y gambas seleccionadas.'],
  'camarao-especial': ['Gambas Especial', 'Salsa de tomate, mozzarella, gambas seleccionadas y Catupiry.'],
  carbonara: ["Carbonara Sant'Orégano", 'Salsa de tomate, mozzarella, lomo ahumado, provolone, bacon, tomate y huevo cocido.'],
  milho: ['Maíz Dulce', 'Salsa de tomate, mozzarella y maíz dulce.'],
  mozzarella: ['Mozzarella', 'Salsa de tomate, mozzarella y tomate en rodajas.'],
  fiambre: ['Jamón', 'Salsa de tomate, mozzarella, jamón y tomate.'],
  'frango-mozzarella': ['Pollo Mozzarella', 'Salsa de tomate, mozzarella y pollo.'],
  caipira: ['Caipira', 'Salsa de tomate, mozzarella, pollo, jamón, bacon y maíz.'],
  americana: ['Americana', 'Salsa de tomate, mozzarella, jamón, bacon y huevo.'],
  atum: ['Atún', 'Salsa de tomate, mozzarella, atún, cebolla y un hilo de aceite de oliva.'],
  'brocolos-bacon': ['Brócoli con Bacon', 'Salsa de tomate, mozzarella, brócoli y bacon.'],
  vegetariana: ['Vegetariana', 'Salsa de tomate, mozzarella, maíz dulce, tomate seco, rúcula, parmesano, albahaca, champiñones y aceitunas.'],
  brigadeiro: ['Pizza Brigadeiro', 'Un ligero toque de mozzarella y brigadeiro casero.'],
  'romeu-julieta': ['Romeo y Julieta', 'Un ligero toque de mozzarella, nata fresca y guayaba derretida.'],
  nutella: ['Nutella', 'Un ligero toque de mozzarella, nata fresca y Nutella.'],
  ananas: ['Piña', 'Salsa de tomate, mozzarella y piña.'],
  'delicia-banana-morangos': ['Delicia de Plátano y Fresas', 'Salsa especial de nata, chocolate artesanal, plátano y fresas.'],
  torradinha: ['Pan Tostado', 'Pan tostado con aceite de oliva, orégano, aceitunas y quesos.'],
  azeitonas: ['Aceitunas con Queso', 'Aceitunas, queso y orégano.'],
  'calzone-calabresa': ['Calzone Calabresa Brasileña', 'Mozzarella, calabresa, cebolla y Catupiry.'],
  'calzone-portuguesa': ['Calzone a la Portuguesa', 'Mozzarella, jamón, champiñones y piña.'],
  'calzone-casa': ['Calzone al Estilo de la Casa', 'Elige cinco ingredientes del menú.'],
  'crocante-gorgonzola': ['Pizza Crujiente de Gorgonzola', 'Masa muy fina y crujiente, aceite de oliva virgen extra y gorgonzola.'],
  'crocante-calabresa': ['Pizza Crujiente de Calabresa', 'Masa muy fina y crujiente, aceite de oliva virgen extra, calabresa y gorgonzola.'],
  'crocante-parmesao': ['Pizza Crujiente de Parmesano', 'Masa muy fina y crujiente, aceite de oliva virgen extra y parmesano.'],
  batatas: ['Patatas Fritas 250g', 'Patatas fritas crujientes.'],
  'batatas-bacon': ['Patatas Fritas con Bacon y Cheddar', 'Bacon crujiente y salsa cheddar.'],
  'batatas-parmesao': ['Patatas Fritas con Parmesano', 'Queso parmesano rallado.'],
  bolonhesa: ['Espaguetis a la Boloñesa', 'Salsa de tomate, carne picada y parmesano.'],
  parisiense: ['Espaguetis a la Parisiense', 'Salsa blanca especial de la casa, pollo, jamón, bacon, guisantes y parmesano.'],
  'massa-camarao': ['Espaguetis con Gambas', 'Salsa blanca o roja y gambas salteadas con ajo y aceite de oliva.'],
  'salada-atum': ['Ensalada de Pasta con Atún', 'Salsa rosada o roja, atún, rúcula, maíz y parmesano.'],
  'salada-frango': ['Ensalada de Pasta con Pollo', 'Salsa rosada o roja, pollo desmenuzado, rúcula, maíz y queso ahumado.'],
  'lasanha-bolonhesa': ['Lasaña a la Boloñesa', 'Salsa de tomate, carne picada y mozzarella.'],
  'lasanha-queijos': ['Lasaña de Cuatro Quesos', 'Mozzarella, provolone, gorgonzola y Catupiry.'],
  'lasanha-camarao': ['Lasaña de Gambas', 'Gambas y mozzarella gratinada.'],
  'lasanha-frango': ['Lasaña de Pollo', 'Salsa de tomate o salsa blanca especial de la casa, pollo, mozzarella, bacon, jamón y guisantes.'],
  'bife-parmegiana': ['Filete de Ternera a la Parmesana', 'Filete de ternera, mozzarella, jamón, arroz y patatas.'],
  'camarao-parmegiana': ['Gambas a la Parmesana', 'Gambas, mozzarella, arroz y patatas fritas.'],
  'camarao-chiclete': ['Gambas Cremosas', 'Gambas cremosas, queso especial, arroz y patatas.'],
  'agua-500': ['Agua Mineral 500ml', 'Agua mineral fresca.'],
  'agua-15': ['Agua Mineral 1,5L', 'Botella familiar.'],
  pedras: ['Água das Pedras 250ml', 'Agua con gas.'],
  frize: ['Frize', 'Agua con gas.'],
  compal: ['Compal de Frutas 200ml', 'Néctar de fruta.'],
  coca: ['Coca-Cola 330ml', 'Lata 330ml.'],
  'coca-zero': ['Coca-Cola Zero 330ml', 'Lata 330ml.'],
  'coca-vidro': ['Coca-Cola Botella de Vidrio', 'Botella de vidrio.'],
  'coca-1l': ['Coca-Cola 1L', 'Botella 1L.'],
  guarana: ['Guaraná 1,5L', 'Botella familiar.'],
  'cerveja-mini': ['Cerveza Mini', 'Botella mini.'],
  'cerveja-330': ['Cerveza 330ml', 'Botella 330ml.'],
  'cerveja-500': ['Cerveza 500ml', 'Cerveza 500ml.'],
  fino: ['Cerveza de Barril', 'Servida de barril.'],
  carlsberg: ['Carlsberg', 'Cerveza fresca.'],
  heineken: ['Heineken', 'Cerveza fresca.'],
  somersby: ['Somersby', 'Sidra fresca.'],
  sangria: ['Sangría de Barril', 'Copa.'],
  tango: ['Tango', 'Copa.'],
  panache: ['Panaché', 'Copa.'],
  'cerveja-martini': ['Cerveza con Martini', 'Copa.'],
  'vinho-branco': ['Vino Blanco de Barril', 'Copa.'],
  'vinho-casa': ['Vino Tinto Tradicional (copa 75ml)', 'Copa 75ml.'],
  porto: ['Vino de Oporto (75ml)', 'Copa 75ml.'],
  'vinho-especial-casa': ['Vino Especial de la Casa 75ml', 'Copa 75ml.'],
  'vinho-mateus': ['Vino Mateus 75ml', 'Copa 75ml.'],
  espresso: ['Espresso', 'Café espresso.'],
  cappuccino: ['Cappuccino', 'Café con leche cremosa.'],
  descafeinado: ['Descafeinado', 'Café descafeinado.'],
  'meia-leite': ['Café con Leche', 'Café con leche.'],
};

const frProducts = {
  margherita: ['Margherita', 'Sauce tomate, mozzarella, tomate, olive, parmesan et basilic.'],
  pepperoni: ['Pepperoni', 'Sauce tomate, mozzarella et pepperoni piquant.'],
  'moda-chefe': ['Façon du Chef', 'Sauce tomate, bord farci au Catupiry, mozzarella, saucisse calabresa, champignons et basilic.'],
  calabresa: ['Calabresa', 'Sauce tomate, mozzarella, saucisse calabresa et oignon.'],
  'calabresa-especial': ['Calabresa Spéciale', 'Sauce tomate, mozzarella, calabresa hachée et Catupiry.'],
  baiana: ['Baiana', 'Sauce tomate, mozzarella, calabresa hachée, oignon, œuf et piment calabresa.'],
  capricciosa: ['Capricciosa', 'Sauce tomate, mozzarella, tomate, jambon et champignons.'],
  chourico: ['Chouriço', 'Sauce tomate, mozzarella, chouriço, oignon et olives.'],
  'quatro-queijos': ['Quatre Fromages', 'Sauce tomate, mozzarella, Catupiry, provolone et gorgonzola.'],
  'frango-catupiry': ['Poulet Catupiry ou Cream Cheese', 'Sauce tomate, mozzarella, poulet effiloché et Catupiry ou Cream Cheese.'],
  'carne-sol': ['Carne do Sol', 'Sauce tomate, mozzarella, carne do sol, oignon et Catupiry.'],
  sertaneja: ['Sertaneja', 'Sauce tomate, mozzarella, carne do sol effilochée, bacon, tomate et oignon.'],
  bacon: ['Bacon', 'Sauce tomate, mozzarella, jambon, bacon et œuf.'],
  portuguesa: ['Portugaise', 'Sauce tomate, mozzarella, jambon, tomate, oignon rouge, poivron, petits pois et œuf.'],
  brasileira: ['Brésilienne', 'Sauce tomate, mozzarella, pepperoni piquant, olives et Catupiry.'],
  camarao: ['Crevettes', 'Sauce tomate, mozzarella et crevettes sélectionnées.'],
  'camarao-especial': ['Crevettes Spéciales', 'Sauce tomate, mozzarella, crevettes sélectionnées et Catupiry.'],
  carbonara: ["Carbonara Sant'Orégano", 'Sauce tomate, mozzarella, longe fumée, provolone, bacon, tomate et œuf dur.'],
  milho: ['Maïs Doux', 'Sauce tomate, mozzarella et maïs doux.'],
  mozzarella: ['Mozzarella', 'Sauce tomate, mozzarella et rondelles de tomate.'],
  fiambre: ['Jambon', 'Sauce tomate, mozzarella, jambon et tomate.'],
  'frango-mozzarella': ['Poulet Mozzarella', 'Sauce tomate, mozzarella et poulet.'],
  caipira: ['Caipira', 'Sauce tomate, mozzarella, poulet, jambon, bacon et maïs.'],
  americana: ['Américaine', 'Sauce tomate, mozzarella, jambon, bacon et œuf.'],
  atum: ['Thon', 'Sauce tomate, mozzarella, thon, oignon et un filet d’huile d’olive.'],
  'brocolos-bacon': ['Brocolis avec Bacon', 'Sauce tomate, mozzarella, brocolis et bacon.'],
  vegetariana: ['Végétarienne', 'Sauce tomate, mozzarella, maïs doux, tomate séchée, roquette, parmesan, basilic, champignons et olives.'],
  brigadeiro: ['Pizza Brigadeiro', 'Une légère touche de mozzarella et brigadeiro maison.'],
  'romeu-julieta': ['Roméo et Juliette', 'Une légère touche de mozzarella, crème fraîche et pâte de goyave fondue.'],
  nutella: ['Nutella', 'Une légère touche de mozzarella, crème fraîche et Nutella.'],
  ananas: ['Ananas', 'Sauce tomate, mozzarella et ananas.'],
  'delicia-banana-morangos': ['Délice Banane et Fraises', 'Sauce spéciale à la crème, chocolat artisanal, banane et fraises.'],
  torradinha: ['Pain Grillé', 'Pain grillé avec huile d’olive, origan, olives et fromages.'],
  azeitonas: ['Olives avec Fromage', 'Olives, fromage et origan.'],
  'calzone-calabresa': ['Calzone Calabresa Brésilienne', 'Mozzarella, calabresa, oignon et Catupiry.'],
  'calzone-portuguesa': ['Calzone à la Portugaise', 'Mozzarella, jambon, champignons et ananas.'],
  'calzone-casa': ['Calzone Façon Maison', 'Choisissez cinq ingrédients du menu.'],
  'crocante-gorgonzola': ['Pizza Croustillante au Gorgonzola', 'Pâte très fine et croustillante, huile d’olive extra vierge et gorgonzola.'],
  'crocante-calabresa': ['Pizza Croustillante Calabresa', 'Pâte très fine et croustillante, huile d’olive extra vierge, calabresa et gorgonzola.'],
  'crocante-parmesao': ['Pizza Croustillante au Parmesan', 'Pâte très fine et croustillante, huile d’olive extra vierge et parmesan.'],
  batatas: ['Frites 250g', 'Frites croustillantes.'],
  'batatas-bacon': ['Frites avec Bacon et Cheddar', 'Bacon croustillant et sauce cheddar.'],
  'batatas-parmesao': ['Frites au Parmesan', 'Parmesan râpé.'],
  bolonhesa: ['Spaghetti Bolognaise', 'Sauce tomate, viande hachée et parmesan.'],
  parisiense: ['Spaghetti Parisienne', 'Sauce blanche spéciale maison, poulet, jambon, bacon, petits pois et parmesan.'],
  'massa-camarao': ['Spaghetti aux Crevettes', 'Sauce blanche ou rouge et crevettes sautées à l’ail et à l’huile d’olive.'],
  'salada-atum': ['Salade de Pâtes au Thon', 'Sauce rosée ou rouge, thon, roquette, maïs et parmesan.'],
  'salada-frango': ['Salade de Pâtes au Poulet', 'Sauce rosée ou rouge, poulet effiloché, roquette, maïs et fromage fumé.'],
  'lasanha-bolonhesa': ['Lasagne Bolognaise', 'Sauce tomate, viande hachée et mozzarella.'],
  'lasanha-queijos': ['Lasagne aux Quatre Fromages', 'Mozzarella, provolone, gorgonzola et Catupiry.'],
  'lasanha-camarao': ['Lasagne aux Crevettes', 'Crevettes et mozzarella gratinée.'],
  'lasanha-frango': ['Lasagne au Poulet', 'Sauce tomate ou sauce blanche spéciale maison, poulet, mozzarella, bacon, jambon et petits pois.'],
  'bife-parmegiana': ['Steak de Veau Parmigiana', 'Steak de veau, mozzarella, jambon, riz et pommes de terre.'],
  'camarao-parmegiana': ['Crevettes Parmigiana', 'Crevettes, mozzarella, riz et frites.'],
  'camarao-chiclete': ['Crevettes Crémeuses', 'Crevettes crémeuses, fromage spécial, riz et pommes de terre.'],
  'agua-500': ['Eau Minérale 500ml', 'Eau minérale fraîche.'],
  'agua-15': ['Eau Minérale 1,5L', 'Bouteille familiale.'],
  pedras: ['Água das Pedras 250ml', 'Eau gazeuse.'],
  frize: ['Frize', 'Eau gazeuse.'],
  compal: ['Compal aux Fruits 200ml', 'Nectar de fruit.'],
  coca: ['Coca-Cola 330ml', 'Canette 330ml.'],
  'coca-zero': ['Coca-Cola Zero 330ml', 'Canette 330ml.'],
  'coca-vidro': ['Coca-Cola Bouteille en Verre', 'Bouteille en verre.'],
  'coca-1l': ['Coca-Cola 1L', 'Bouteille 1L.'],
  guarana: ['Guaraná 1,5L', 'Bouteille familiale.'],
  'cerveja-mini': ['Bière Mini', 'Petite bouteille.'],
  'cerveja-330': ['Bière 330ml', 'Bouteille 330ml.'],
  'cerveja-500': ['Bière 500ml', 'Bière 500ml.'],
  fino: ['Bière Pression', 'Servie à la pression.'],
  carlsberg: ['Carlsberg', 'Bière fraîche.'],
  heineken: ['Heineken', 'Bière fraîche.'],
  somersby: ['Somersby', 'Cidre frais.'],
  sangria: ['Sangria Pression', 'Verre.'],
  tango: ['Tango', 'Verre.'],
  panache: ['Panaché', 'Verre.'],
  'cerveja-martini': ['Bière avec Martini', 'Verre.'],
  'vinho-branco': ['Vin Blanc Pression', 'Verre.'],
  'vinho-casa': ['Vin Rouge Traditionnel (verre 75ml)', 'Verre 75ml.'],
  porto: ['Vin de Porto (75ml)', 'Verre 75ml.'],
  'vinho-especial-casa': ['Vin Spécial Maison 75ml', 'Verre 75ml.'],
  'vinho-mateus': ['Vin Mateus 75ml', 'Verre 75ml.'],
  espresso: ['Espresso', 'Café espresso.'],
  cappuccino: ['Cappuccino', 'Café avec lait crémeux.'],
  descafeinado: ['Décaféiné', 'Café décaféiné.'],
  'meia-leite': ['Café au Lait', 'Café avec lait.'],
};

const categories = {
  en: {
    traditional: { label: 'Traditional Pizzas', short: 'Traditional', eyebrow: 'From the wood-fired oven' },
    sweet: { label: 'Sweet & Sweet-Savory Pizzas', short: 'Sweet', eyebrow: 'Special flavours' },
    starters: { label: 'Starters', short: 'Starters', eyebrow: 'To begin' },
    pasta: { label: 'Pasta & Lasagna', short: 'Pasta', eyebrow: 'Pasta & oven' },
    meals: { label: 'Meals', short: 'Meals', eyebrow: 'Main dishes' },
    drinks: { label: 'Drinks', short: 'Drinks', eyebrow: 'To go with it' },
  },
  es: {
    traditional: { label: 'Pizzas Tradicionales', short: 'Tradicionales', eyebrow: 'Del horno de leña' },
    sweet: { label: 'Pizzas Agridulces y Dulces', short: 'Dulces', eyebrow: 'Sabores especiales' },
    starters: { label: 'Entrantes', short: 'Entrantes', eyebrow: 'Para empezar' },
    pasta: { label: 'Pastas y Lasañas', short: 'Pastas', eyebrow: 'Pasta y horno' },
    meals: { label: 'Platos', short: 'Platos', eyebrow: 'Platos principales' },
    drinks: { label: 'Bebidas', short: 'Bebidas', eyebrow: 'Para acompañar' },
  },
  fr: {
    traditional: { label: 'Pizzas Traditionnelles', short: 'Traditionnelles', eyebrow: 'Du four à bois' },
    sweet: { label: 'Pizzas Sucrées-Salées et Sucrées', short: 'Sucrées', eyebrow: 'Saveurs spéciales' },
    starters: { label: 'Entrées', short: 'Entrées', eyebrow: 'Pour commencer' },
    pasta: { label: 'Pâtes & Lasagnes', short: 'Pâtes', eyebrow: 'Pâtes & four' },
    meals: { label: 'Plats', short: 'Plats', eyebrow: 'Plats principaux' },
    drinks: { label: 'Boissons', short: 'Boissons', eyebrow: 'Pour accompagner' },
  },
};

const choices = {
  en: {
    'frango-catupiry': { label: 'Creamy cheese', options: { catupiry: 'Catupiry', 'cream-cheese': 'Cream Cheese' } },
    pasta: { label: 'Choose your pasta', options: { talharim: 'Tagliatelle', penne: 'Penne', espaguete: 'Spaghetti' } },
  },
  es: {
    'frango-catupiry': { label: 'Queso cremoso', options: { catupiry: 'Catupiry', 'cream-cheese': 'Queso crema' } },
    pasta: { label: 'Elige tu pasta', options: { talharim: 'Tallarines', penne: 'Penne', espaguete: 'Espaguetis' } },
  },
  fr: {
    'frango-catupiry': { label: 'Fromage crémeux', options: { catupiry: 'Catupiry', 'cream-cheese': 'Cream Cheese' } },
    pasta: { label: 'Choisissez vos pâtes', options: { talharim: 'Tagliatelles', penne: 'Penne', espaguete: 'Spaghetti' } },
  },
};

const products = { en: enProducts, es: esProducts, fr: frProducts };
const normalizeLanguage = (language) => (language === 'en' || language === 'es' || language === 'fr' ? language : 'pt');

export function translateProduct(product, language) {
  const lang = normalizeLanguage(language);
  const translation = products[lang]?.[product?.id];
  if (!product || !translation) return product;
  return { ...product, name: translation[0], ingredients: translation[1] };
}

export function translateCategory(category, language) {
  const lang = normalizeLanguage(language);
  const translation = categories[lang]?.[category?.id];
  return translation ? { ...category, ...translation } : category;
}

export function translateChoice(choice, productId, language) {
  if (!choice) return choice;
  const lang = normalizeLanguage(language);
  const key = productId?.startsWith('massa-') || productId?.startsWith('salada-') || productId === 'bolonhesa' || productId === 'parisiense'
    ? 'pasta'
    : productId;
  const translation = choices[lang]?.[key];
  if (!translation) return choice;

  return {
    ...choice,
    label: translation.label || choice.label,
    options: choice.options.map((option) => ({
      ...option,
      name: translation.options?.[option.id] || option.name,
    })),
  };
}

export function translateCartItemName(item, productsMap, language) {
  if (item.configuration) {
    const {
      primaryId,
      secondaryId,
      primaryChoiceId,
      secondaryChoiceId,
    } = item.configuration;
    const primary = productsMap.get(primaryId);
    const secondary = secondaryId ? productsMap.get(secondaryId) : null;
    if (!primary) return item.name;

    const primaryProduct = translateProduct(primary, language);
    const primaryChoice = translateChoice(primary.choice, primary.id, language)?.options.find((option) => option.id === primaryChoiceId);
    const primaryName = `${primaryProduct.name}${primaryChoice ? ` (${primaryChoice.name})` : ''}`;

    if (!secondary) return primaryName;

    const secondaryProduct = translateProduct(secondary, language);
    const secondaryChoice = translateChoice(secondary.choice, secondary.id, language)?.options.find((option) => option.id === secondaryChoiceId);
    const secondaryName = `${secondaryProduct.name}${secondaryChoice ? ` (${secondaryChoice.name})` : ''}`;
    return `½ ${primaryName} + ½ ${secondaryName}`;
  }

  const product = productsMap.get(item.productId);
  if (!product) return item.name;
  const translated = translateProduct(product, language);
  const choice = translateChoice(product.choice, product.id, language)?.options.find((option) => option.id === item.choiceId);
  return `${translated.name}${choice ? ` (${choice.name})` : ''}`;
}
