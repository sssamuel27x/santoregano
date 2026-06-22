const pizza = (id, name, ingredients, small, large, emoji = '🍕') => ({
  id, name, ingredients, emoji, category: 'traditional', sizes: {
    small: { label: '25 cm', price: small },
    large: { label: '37 cm', price: large },
  },
});

export const traditional = [
  pizza('margherita', 'Margherita', 'Molho de tomate, mozzarella, tomate, azeitona, parmesão e manjericão.', 8.90, 14.90),
  pizza('pepperoni', 'Pepperoni', 'Molho de tomate, mozzarella e pepperoni.', 8.90, 16.90),
  pizza('moda-chefe', 'Moda do Chefe', 'Borda de catupiry, mozzarella, calabresa, cogumelos e manjericão.', 11.90, 18.99),
  pizza('calabresa', 'Calabresa', 'Molho de tomate, mozzarella, calabresa e cebola.', 9.90, 16.90),
  pizza('calabresa-especial', 'Calabresa Especial', 'Mozzarella, calabresa moída e catupiry.', 9.99, 17.90),
  pizza('baiana', 'Baiana', 'Mozzarella, calabresa moída, cebola, ovo e pimenta calabresa.', 8.99, 15.99),
  pizza('prosciutto', 'Prosciutto e Cogumelo', 'Molho de tomate, mozzarella, presunto e cogumelos.', 9.99, 17.50),
  pizza('chourico', 'Chouriço', 'Mozzarella, chouriço, cebola e azeitonas.', 9.90, 16.90),
  pizza('quatro-queijos', 'Quatro Queijos', 'Mozzarella, catupiry, provolone e gorgonzola.', 9.90, 17.90),
  pizza('frango-catupiry', 'Frango Catupiry', 'Mozzarella, frango desfiado e catupiry.', 9.90, 17.90),
  pizza('carne-sol', 'Carne do Sol', 'Mozzarella, carne de sol e catupiry.', 11.90, 17.90),
  pizza('sertaneja', 'Sertaneja', 'Carne do sol desfiada, bacon, tomate e cebola.', 12.90, 17.90),
  pizza('bacon', 'Bacon', 'Molho de tomate, mozzarella, fiambre, bacon e ovo.', 8.90, 15.90),
  pizza('portuguesa', 'Portuguesa', 'Fiambre, tomate, cebola roxa, pimento, ervilha e ovo.', 9.90, 16.90),
  pizza('brasileira', 'Brasileira', 'Fiambre, azeitonas e cream cheese.', 8.90, 15.90),
  pizza('camarao', 'Camarão', 'Molho de tomate, mozzarella e camarão selecionado.', 8.99, 16.90, '🦐'),
  pizza('camarao-especial', 'Camarão Especial', 'Camarão selecionado e catupiry.', 9.99, 17.90, '🦐'),
  pizza('carbonara', "Carbonara Sant'Orégano", 'Lombo do paio, bacon, tomate e ovo cozido.', 8.90, 17.90),
  pizza('milho', 'Milho Verde', 'Molho de tomate, mozzarella e milho verde.', 8.90, 15.90),
  pizza('mozzarella', 'Mozzarella', 'Molho de tomate, mozzarella e orégãos.', 8.20, 14.00),
  pizza('fiambre', 'Fiambre', 'Molho de tomate, mozzarella, fiambre e tomate.', 8.90, 15.00),
  pizza('frango-mozzarella', 'Frango Mozzarella', 'Molho de tomate, mozzarella e frango.', 8.90, 14.90),
  pizza('caipira', 'Caipira', 'Frango desfiado, bacon e milho.', 8.90, 15.90),
  pizza('americana', 'Americana', 'Fiambre, bacon e ovo.', 8.90, 15.90),
  pizza('atum', 'Atum', 'Mozzarella, atum, cebola e fio de azeite.', 8.80, 14.90),
  pizza('brocolos-bacon', 'Brócolos com Bacon', 'Mozzarella, brócolos e bacon.', 9.90, 15.90),
  pizza('vegetariana', 'Vegetariana', 'Milho, tomate seco, rúcula, parmesão, cogumelos e azeitonas.', 8.90, 15.90, '🌿'),
];

export const sweet = [
  { ...pizza('brigadeiro', 'Pizza Brigadeiro', 'Um leve toque de mozzarella e brigadeiro caseiro.', 8.90, 12.90, '🍫'), category: 'sweet' },
  { ...pizza('romeu-julieta', 'Romeu e Julieta', 'Mozzarella, natas frescas e goiabada derretida.', 9.90, 14.90, '🍓'), category: 'sweet' },
  { ...pizza('nutella', 'Nutella', 'Mozzarella, natas frescas e Nutella.', 9.90, 15.90, '🍯'), category: 'sweet' },
];

const simple = (category, values) => values.map(([id, name, price, ingredients, emoji]) => ({ id, name, price, ingredients, emoji, category }));

export const starters = simple('starters', [
  ['torradinha', 'Torradinha de Pão', 3.99, 'Pão torrado com azeite, orégãos, azeitonas e queijos.', '🥖'],
  ['azeitonas', 'Azeitonas com Queijo', 2.60, 'Azeitonas, queijo e orégãos.', '🫒'],
  ['calzone-calabresa', 'Calzone Calabreza Brasileira', 5.50, 'Mozzarella, calabresa, cebola e Catupiry.', '🫔'],
  ['calzone-portuguesa', 'Calzone À Portugueza', 4.99, 'Mozzarella, fiambre, cogumelos e ananás.', '🫔'],
  ['calzone-casa', 'Calzone A Moda da Casa', 4.99, 'Escolha quatro ingredientes do cardápio.', '🫔'],
  ['crocante-gorgonzola', 'Pizza Crocante de Gorgonzola', 3.99, 'Massa fina e crocante, azeite e gorgonzola.', '🍕'],
  ['crocante-calabresa', 'Pizza Crocante de Calabresa', 4.90, 'Massa fina, azeite, calabresa e gorgonzola.', '🍕'],
  ['crocante-parmesao', 'Pizza Crocante de Parmesão', 3.99, 'Massa fina e crocante com azeite e parmesão.', '🍕'],
  ['batatas', 'Batatas Fritas', 4.00, 'Batatas fritas crocantes.', '🍟'],
  ['batatas-bacon', 'Batatas Fritas com Bacon e Cheddar', 5.20, 'Bacon crocante e molho cheddar.', '🍟'],
  ['batatas-parmesao', 'Batatas Fritas com Parmesão', 5.00, 'Queijo parmesão ralado.', '🍟'],
]);

export const pasta = simple('pasta', [
  ['bolonhesa', 'Espaguete à Bolonhesa', 8.00, 'Molho de tomate, carne picada e parmesão.', '🍝'],
  ['parisiense', 'Espaguete à Parisiense', 12.90, 'Molho branco, frango, fiambre, bacon, ervilhas e parmesão.', '🍝'],
  ['massa-camarao', 'Espaguete Camarão', 13.90, 'Molho branco ou vermelho e camarão refogado.', '🍝'],
  ['salada-atum', 'Massa Salada de Atum', 9.90, 'Molho rosé ou vermelho, atum, rúcula, milho e parmesão.', '🍝'],
  ['salada-frango', 'Massa Salada de Frango', 9.90, 'Frango desfiado, rúcula, milho e queijo fumado.', '🍝'],
  ['lasanha-bolonhesa', 'Lasanha à Bolonhesa', 9.00, 'Molho de tomate, carne picada e mozzarella.', '🫕'],
  ['lasanha-queijos', 'Lasanha aos Quatro Queijos', 13.50, 'Mozzarella, provolone, gorgonzola e Catupiry.', '🫕'],
  ['lasanha-camarao', 'Lasanha de Camarão', 14.99, 'Camarão e mozzarella gratinada.', '🫕'],
  ['lasanha-frango', 'Lasanha de Frango', 13.50, 'Frango, mozzarella, bacon, fiambre e ervilhas.', '🫕'],
]);

export const meals = simple('meals', [
  ['bife-parmegiana', 'Bife à Parmegiana', 14.90, 'Bife de vitela, mozzarella, fiambre, arroz e batatas.', '🥩'],
  ['frango-parmegiana', 'Frango à Parmegiana', 12.90, 'Peito de frango, mozzarella, fiambre, arroz e batatas.', '🍗'],
  ['camarao-parmegiana', 'Camarão à Parmegiana', 16.90, 'Camarão, mozzarella, arroz e batatas fritas.', '🦐'],
  ['camarao-chiclete', 'Camarão Chiclete', 16.90, 'Camarão cremoso, queijo especial, arroz e batatas.', '🦐'],
]);

export const drinks = simple('drinks', [
  ['agua-500', 'Água mineral 500ml', 1.00, 'Água mineral fresca.', '💧'],
  ['agua-15', 'Água mineral 1,5L', 2.00, 'Garrafa familiar.', '💧'],
  ['pedras', 'Água das Pedras 250ml', 1.80, 'Água com gás.', '🫧'],
  ['frize', 'Frize', 1.80, 'Água com gás.', '🫧'],
  ['compal', 'Compal de frutas 200ml', 1.80, 'Néctar de fruta.', '🧃'],
  ['coca', 'Coca-Cola 330ml', 2.00, 'Lata 330ml.', '🥤'],
  ['coca-zero', 'Coca-Cola Zero 330ml', 2.00, 'Lata 330ml.', '🥤'],
  ['coca-vidro', 'Coca-Cola garrafa vidro', 2.00, 'Garrafa de vidro.', '🥤'],
  ['coca-1l', 'Coca-Cola 1L', 2.80, 'Garrafa 1L.', '🥤'],
  ['guarana', 'Guaraná 1,5L', 3.20, 'Garrafa familiar.', '🥤'],
  ['cerveja-mini', 'Cerveja mini', 1.50, 'Garrafa mini.', '🍺'],
  ['cerveja-330', 'Cerveja 330ml', 2.00, 'Garrafa 330ml.', '🍺'],
  ['cerveja-500', 'Cerveja 500ml', 3.00, 'Caneca 500ml.', '🍺'],
  ['fino', 'Fino / Cerveja à pressão', 1.50, 'Servida à pressão.', '🍺'],
  ['carlsberg', 'Carlsberg', 2.00, 'Cerveja fresca.', '🍺'],
  ['heineken', 'Heineken', 2.00, 'Cerveja fresca.', '🍺'],
  ['somersby', 'Somersby', 3.00, 'Sidra fresca.', '🍏'],
  ['sangria', 'Sangria', 2.50, 'Copo.', '🍷'],
  ['tango', 'Tango', 2.50, 'Copo.', '🍹'],
  ['panache', 'Panaché', 2.00, 'Copo.', '🍺'],
  ['cerveja-martini', 'Cerveja com Martini', 2.00, 'Copo.', '🍸'],
  ['vinho-branco', 'Vinho branco à pressão', 1.50, 'Copo.', '🍷'],
  ['vinho-casa', 'Vinho da casa (copo)', 2.00, 'Copo.', '🍷'],
  ['porto', 'Vinho do Porto (50ml)', 4.00, 'Cálice 50ml.', '🍷'],
  ['espresso', 'Espresso', 1.00, 'Café espresso.', '☕'],
  ['cappuccino', 'Cappuccino', 2.00, 'Café e leite cremoso.', '☕'],
  ['descafeinado', 'Descafeinado', 1.30, 'Café descafeinado.', '☕'],
]);

export const categories = [
  { id: 'traditional', label: 'Pizzas Tradicionais', short: 'Tradicionais', icon: '🍕', eyebrow: 'Do forno a lenha', items: traditional },
  { id: 'sweet', label: 'Pizzas Doces', short: 'Doces', icon: '🍫', eyebrow: 'Um final doce', items: sweet },
  { id: 'starters', label: 'Entradas', short: 'Entradas', icon: '🥖', eyebrow: 'Para começar', items: starters },
  { id: 'pasta', label: 'Massas & Lasanhas', short: 'Massas', icon: '🍝', eyebrow: 'Pasta & forno', items: pasta },
  { id: 'meals', label: 'Refeições', short: 'Refeições', icon: '🍽️', eyebrow: 'Pratos principais', items: meals },
  { id: 'drinks', label: 'Bebidas', short: 'Bebidas', icon: '🥤', eyebrow: 'Para acompanhar', items: drinks },
];

export const euro = (value) => `${value.toFixed(2).replace('.', ',')}€`;
