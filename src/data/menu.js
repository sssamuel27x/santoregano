const pizza = (id, name, ingredients, small, large, emoji = '🍕') => ({
  id, name, ingredients, emoji, category: 'traditional', sizes: {
    small: { label: '25 cm', price: small },
    large: { label: '37 cm', price: large },
  },
});

export const MENU_VERSION = '2026-06-29';

export const stuffedCrusts = [
  { id: 'catupiry', name: 'Catupiry', price: 6 },
  { id: 'mozzarella', name: 'Mozzarella', price: 5 },
  { id: 'cream-cheese', name: 'Cream Cheese', price: 8 },
  { id: 'brigadeiro', name: 'Brigadeiro', price: 6 },
];

export const traditional = [
  pizza('margherita', 'Margherita', 'Molho de tomate, mozzarella, tomate, azeitona, parmesão e manjericão.', 9.50, 16.50),
  pizza('pepperoni', 'Pepperoni', 'Molho de tomate, mozzarella e pepperoni picante.', 10.50, 17.90),
  pizza('moda-chefe', 'Moda do Chefe', 'Molho de tomate, borda de Catupiry, mozzarella, calabresa, cogumelos e manjericão.', 11.90, 18.99),
  pizza('calabresa', 'Calabresa', 'Molho de tomate, mozzarella, calabresa e cebola.', 9.50, 17.90),
  pizza('calabresa-especial', 'Calabresa Especial', 'Molho de tomate, mozzarella, calabresa moída e Catupiry.', 10.90, 18.90),
  pizza('baiana', 'Baiana', 'Molho de tomate, mozzarella, calabresa moída, cebola, ovo e pimenta calabresa.', 9.50, 17.90),
  pizza('capricciosa', 'Capricciosa', 'Molho de tomate, mozzarella, tomate, fiambre e cogumelos.', 9.50, 17.50),
  pizza('chourico', 'Chouriço', 'Molho de tomate, mozzarella, chouriço, cebola e azeitonas.', 9.90, 17.50),
  pizza('quatro-queijos', 'Quatro Queijos', 'Molho de tomate, mozzarella, Catupiry, provolone e gorgonzola.', 10.50, 17.90),
  {
    ...pizza('frango-catupiry', 'Frango Catupiry ou Cream Cheese', 'Molho de tomate, mozzarella, frango desfiado e Catupiry ou Cream Cheese.', 10.50, 17.90),
    choice: {
      label: 'Queijo cremoso',
      options: [
        { id: 'catupiry', name: 'Catupiry' },
        { id: 'cream-cheese', name: 'Cream Cheese' },
      ],
    },
  },
  pizza('carne-sol', 'Carne do Sol', 'Molho de tomate, mozzarella, carne de sol, cebola e Catupiry.', 11.90, 18.90),
  pizza('sertaneja', 'Sertaneja', 'Molho de tomate, mozzarella, carne do sol desfiada, bacon, tomate e cebola.', 11.90, 18.90),
  pizza('bacon', 'Bacon', 'Molho de tomate, mozzarella, fiambre, bacon e ovo.', 9.50, 17.50),
  pizza('portuguesa', 'Portuguesa', 'Molho de tomate, mozzarella, fiambre, tomate, cebola roxa, pimento, ervilha e ovo.', 10.50, 18.50),
  pizza('brasileira', 'Brasileira', 'Molho de tomate, mozzarella, pepperoni picante, azeitonas e Catupiry.', 9.50, 17.50),
  pizza('camarao', 'Camarão', 'Molho de tomate, mozzarella e camarão selecionado.', 10.50, 18.90, '🦐'),
  pizza('camarao-especial', 'Camarão Especial', 'Molho de tomate, mozzarella, camarão selecionado e Catupiry.', 11.90, 18.90, '🦐'),
  pizza('carbonara', "Carbonara Sant'Orégano", 'Molho de tomate, mozzarella, lombo do paio, provolone, bacon, tomate e ovo cozido.', 10.50, 17.90),
  pizza('milho', 'Milho Verde', 'Molho de tomate, mozzarella e milho verde.', 9.50, 16.90),
  pizza('mozzarella', 'Mozzarella', 'Molho de tomate, mozzarella e tomate em rodelas.', 8.99, 15.90),
  pizza('fiambre', 'Fiambre', 'Molho de tomate, mozzarella, fiambre e tomate.', 9.50, 15.90),
  pizza('frango-mozzarella', 'Frango Mozzarella', 'Molho de tomate, mozzarella e frango.', 9.90, 16.90),
  pizza('caipira', 'Caipira', 'Molho de tomate, mozzarella, frango, fiambre, bacon e milho.', 10.90, 17.90),
  pizza('americana', 'Americana', 'Molho de tomate, mozzarella, fiambre, bacon e ovo.', 9.90, 16.90),
  pizza('atum', 'Atum', 'Molho de tomate, mozzarella, atum, cebola e fio de azeite.', 10.50, 16.90),
  pizza('brocolos-bacon', 'Brócolos com Bacon', 'Molho de tomate, mozzarella, brócolos e bacon.', 10.50, 16.90),
  pizza('vegetariana', 'Vegetariana', 'Molho de tomate, mozzarella, milho verde, tomate seco, rúcula, parmesão, manjericão, cogumelos e azeitonas.', 10.50, 17.90, '🌿'),
];

export const sweet = [
  { ...pizza('brigadeiro', 'Pizza Brigadeiro', 'Um leve toque de mozzarella e brigadeiro caseiro.', 10.50, 15.90, '🍫'), category: 'sweet' },
  { ...pizza('romeu-julieta', 'Romeu e Julieta', 'Um leve toque de mozzarella, natas frescas e goiabada derretida.', 10.50, 15.90, '🍓'), category: 'sweet' },
  { ...pizza('nutella', 'Nutella', 'Um leve toque de mozzarella, natas frescas e Nutella.', 10.90, 15.90, '🍯'), category: 'sweet' },
  { ...pizza('ananas', 'Ananás', 'Molho de tomate, mozzarella e ananás.', 9.90, 16.90, '🍍'), category: 'sweet' },
  { ...pizza('delicia-banana-morangos', 'Delícia de Banana e Morangos', 'Molho de natas especial, chocolate artesanal, banana e morangos.', 9.90, 17.90, '🍌'), category: 'sweet' },
];

const simple = (category, values) => values.map(([id, name, price, ingredients, emoji]) => ({ id, name, price, ingredients, emoji, category }));

export const starters = simple('starters', [
  ['torradinha', 'Torradinha de Pão', 3.99, 'Pão torrado com azeite, orégãos, azeitonas e queijos.', '🥖'],
  ['azeitonas', 'Azeitonas com Queijo', 3.60, 'Azeitonas, queijo e orégãos.', '🫒'],
  ['calzone-calabresa', 'Calzone Calabresa Brasileira', 9.90, 'Mozzarella, calabresa, cebola e Catupiry.', '🫔'],
  ['calzone-portuguesa', 'Calzone À Portuguesa', 10.99, 'Mozzarella, fiambre, cogumelos e ananás.', '🫔'],
  ['calzone-casa', 'Calzone À Moda da Casa', 14.99, 'Escolha cinco ingredientes do cardápio.', '🫔'],
  ['crocante-gorgonzola', 'Pizza Crocante de Gorgonzola', 6.50, 'Massa super fina e crocante, azeite extra virgem e gorgonzola.', '🍕'],
  ['crocante-calabresa', 'Pizza Crocante de Calabresa', 6.99, 'Massa super fina e crocante, azeite extra virgem, calabresa e gorgonzola.', '🍕'],
  ['crocante-parmesao', 'Pizza Crocante de Parmesão', 5.99, 'Massa super fina e crocante, azeite extra virgem e parmesão.', '🍕'],
  ['batatas', 'Batatas Fritas 250g', 3.90, 'Batatas fritas crocantes.', '🍟'],
  ['batatas-bacon', 'Batatas Fritas com Bacon e Cheddar', 5.20, 'Bacon crocante e molho cheddar.', '🍟'],
  ['batatas-parmesao', 'Batatas Fritas com Parmesão', 4.90, 'Queijo parmesão ralado.', '🍟'],
]);

const pastaChoice = {
  label: 'Escolha a sua massa',
  options: [
    { id: 'talharim', name: 'Talharim' },
    { id: 'penne', name: 'Penne' },
    { id: 'espaguete', name: 'Espaguete' },
  ],
};

export const pasta = [
  ...simple('pasta', [
    ['bolonhesa', 'Espaguete à Bolonhesa', 9.90, 'Molho de tomate, carne picada e parmesão.', '🍝'],
    ['parisiense', 'Espaguete à Parisiense', 11.90, 'Molho branco especial da casa, frango, fiambre, bacon, ervilhas e parmesão.', '🍝'],
    ['massa-camarao', 'Espaguete Camarão', 13.90, 'Molho branco ou vermelho e camarão refogado no alho e azeite.', '🍝'],
    ['salada-atum', 'Massa Salada de Atum', 9.90, 'Molho rosé ou vermelho, atum, rúcula, milho e parmesão.', '🍝'],
    ['salada-frango', 'Massa Salada de Frango', 9.90, 'Molho rosé ou vermelho, frango desfiado, rúcula, milho e queijo fumado.', '🍝'],
  ]).map((product) => ({ ...product, choice: pastaChoice })),
  ...simple('pasta', [
  ['lasanha-bolonhesa', 'Lasanha à Bolonhesa', 11.50, 'Molho de tomate, carne picada e mozzarella.', '🫕'],
  ['lasanha-queijos', 'Lasanha aos Quatro Queijos', 13.50, 'Mozzarella, provolone, gorgonzola e Catupiry.', '🫕'],
  ['lasanha-camarao', 'Lasanha de Camarão', 14.99, 'Camarão e mozzarella gratinada.', '🫕'],
  ['lasanha-frango', 'Lasanha de Frango', 14.50, 'Molho de tomate ou branco especial da casa, frango, mozzarella, bacon, fiambre e ervilhas.', '🫕'],
  ]),
];

export const meals = simple('meals', [
  ['bife-parmegiana', 'Bife à Parmegiana', 14.90, 'Bife de vitela, mozzarella, fiambre, arroz e batatas.', '🥩'],
  ['camarao-parmegiana', 'Camarão à Parmegiana', 16.90, 'Camarão, mozzarella, arroz e batatas fritas.', '🦐'],
  ['camarao-chiclete', 'Camarão Chiclete', 16.90, 'Camarão cremoso, queijo especial, arroz e batatas.', '🦐'],
]);

export const drinks = simple('drinks', [
  ['agua-500', 'Água mineral 500ml', 1.20, 'Água mineral fresca.', '💧'],
  ['agua-15', 'Água mineral 1,5L', 2.90, 'Garrafa familiar.', '💧'],
  ['pedras', 'Água das Pedras 250ml', 2.00, 'Água com gás.', '🫧'],
  ['frize', 'Frize', 1.80, 'Água com gás.', '🫧'],
  ['compal', 'Compal de frutas 200ml', 1.80, 'Néctar de fruta.', '🧃'],
  ['coca', 'Coca-Cola 330ml', 2.00, 'Lata 330ml.', '🥤'],
  ['coca-zero', 'Coca-Cola Zero 330ml', 2.20, 'Lata 330ml.', '🥤'],
  ['coca-vidro', 'Coca-Cola garrafa vidro', 2.00, 'Garrafa de vidro.', '🥤'],
  ['coca-1l', 'Coca-Cola 1L', 3.20, 'Garrafa 1L.', '🥤'],
  ['guarana', 'Guaraná 1,5L', 3.50, 'Garrafa familiar.', '🥤'],
  ['cerveja-mini', 'Cerveja mini', 1.50, 'Garrafa mini.', '🍺'],
  ['cerveja-330', 'Cerveja 330ml', 2.50, 'Garrafa 330ml.', '🍺'],
  ['cerveja-500', 'Cerveja 500ml', 4.00, 'Cerveja 500ml.', '🍺'],
  ['fino', 'Fino / Cerveja à pressão', 1.50, 'Servida à pressão.', '🍺'],
  ['carlsberg', 'Carlsberg', 1.70, 'Cerveja fresca.', '🍺'],
  ['heineken', 'Heineken', 2.00, 'Cerveja fresca.', '🍺'],
  ['somersby', 'Somersby', 3.50, 'Sidra fresca.', '🍏'],
  ['sangria', 'Sangria de pressão', 3.50, 'Copo.', '🍷'],
  ['tango', 'Tango', 2.50, 'Copo.', '🍹'],
  ['panache', 'Panaché', 1.80, 'Copo.', '🍺'],
  ['cerveja-martini', 'Cerveja com Martini', 2.00, 'Copo.', '🍸'],
  ['vinho-branco', 'Vinho branco à pressão', 1.50, 'Copo.', '🍷'],
  ['vinho-casa', 'Vinho tinto tradicional (taça 75ml)', 2.00, 'Taça 75ml.', '🍷'],
  ['porto', 'Vinho do Porto (75ml)', 4.00, 'Taça 75ml.', '🍷'],
  ['vinho-especial-casa', 'Vinho especial da Casa 75ml', 6.00, 'Taça 75ml.', '🍷'],
  ['vinho-mateus', 'Vinho Mateus 75ml', 2.00, 'Taça 75ml.', '🍷'],
  ['espresso', 'Espresso', 1.00, 'Café espresso.', '☕'],
  ['cappuccino', 'Cappuccino', 2.00, 'Café e leite cremoso.', '☕'],
  ['descafeinado', 'Descafeinado', 1.30, 'Café descafeinado.', '☕'],
  ['meia-leite', 'Meia de leite', 1.50, 'Café com leite.', '☕'],
]);

export const categories = [
  { id: 'traditional', label: 'Pizzas Tradicionais', short: 'Tradicionais', icon: '🍕', eyebrow: 'Do forno a lenha', items: traditional },
  { id: 'sweet', label: 'Pizzas Agridoce & Doces', short: 'Agridoce & Doces', icon: '🍫', eyebrow: 'Sabores especiais', items: sweet },
  { id: 'starters', label: 'Entradas', short: 'Entradas', icon: '🥖', eyebrow: 'Para começar', items: starters },
  { id: 'pasta', label: 'Massas & Lasanhas', short: 'Massas', icon: '🍝', eyebrow: 'Pasta & forno', items: pasta },
  { id: 'meals', label: 'Refeições', short: 'Refeições', icon: '🍽️', eyebrow: 'Pratos principais', items: meals },
  { id: 'drinks', label: 'Bebidas', short: 'Bebidas', icon: '🥤', eyebrow: 'Para acompanhar', items: drinks },
];

export const euro = (value) => `${value.toFixed(2).replace('.', ',')}€`;
