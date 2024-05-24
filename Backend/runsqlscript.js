const { Balsamic, OliveOil, syncModels } = require('./db/models');

const balsamicData = [
    {
      name: 'Elderflower Balsamic',
      tags: 'balsamic, sweet, floral, white, desserts, Italian, young, mild',
      image: 'images/balsamics/elderflower.webp',
      description: 'This delicate Elderflower white Balsamic Vinegar, is both crispy and juicy with an intensely floral aroma of honeysuckle flowers. We have married the lovely floral characteristics of this cream-colored flower heads with our Ultra Premium White Condimento. The resulting collaboration is an intoxicating burst of unique flavor; bright, clean, and absolutely delicious! Great with seafood, grilled chicken/poultry, pork, in sparkling water as a spritzer, in cocktails, ice teas, as a glaze, in marinades and dressings.',
      pairings: []
    },
    {
      name: 'Blenheim Apricot Balsamic',
      tags: 'balsamic, sweet, fruity, white, dressing, Italian, young, medium',
      image: 'images/balsamics/apricot.webp',
      description: 'The Blenheim variety is both sweet and tart with an intensely aromatic aroma of honeysuckle and picked with a faint green tinge. We married this with our aged white balsamic condimento. The resulting collaboration, is intoxicating as it is crisp and tart. Great with grilled chicken, as a glaze or served with cheese.',
      pairings: []
    },
    {
      name: 'Sicilian Lemon Balsamic',
      tags: 'balsamic, tart, citrus, white, marinades, modern, young, mild',
      image: 'images/balsamics/sicilianlemon.webp',
      description: 'Playfully tart and pleasantly sweet, our Sicilian Lemon White Balsamic has perfectly balanced acidity and a crisp, lemon flavor and aroma. Fabulous with seafood, in dressings or in mixed drinks.',
      pairings: []
    },
    {
      name: 'Cascadian Raspberry Balsamic',
      tags: 'balsamic, sweet, fruity, white, desserts, Italian, young, medium',
      image: 'images/balsamics/craspberry.webp',
      description: 'Juicy, tart raspberry and luscious white balsamic come together in this bright, versatile infused balsamic. Use it in shrubs, mixed cocktails, as a glaze or marinade for poultry, in wilted spinach salad, over fresh cut fruit, to glaze salmon, and much, much more!',
      pairings: []
    },
    {
      name: 'Peach Balsamic',
      tags: 'balsamic, sweet, fruity, white, dressing, Italian, young, mild',
      image: 'images/balsamics/peach.webp',
      description: 'Made with White Trebbiano Grape Must, our White Peach Balsamic undergoes the cooking and barrel aging process of Balsamic Vinegar of Modena but is not caramelized therefore it retains its white color. The result is a crisp vinegar with a touch of sweetness reminiscent of handcrafted vinegars from northern Italy.',
      pairings: []
    },
    {
      name: 'Cranberry-Pear Balsamic',
      tags: 'balsamic, tart, fruity, white, dressing, modern, young, mild',
      image: 'images/balsamics/cranberry.webp',
      description: 'This White Balsamic is clean, crisp and very tart and boasts a lovely deep, rose blush. It has an amazingly fruity, complex bouquet that shines in a multitude of culinary applications. Use to dress fruit or vegetable salads, as a marinade, a glaze for poultry, with gelatin for a delicious fruit aspic or even in a mixed drink!',
      pairings: []
    },
    {
      name: 'Tarragon Balsamic',
      tags: 'balsamic, herbaceous, white, marinades, Italian, aged, medium',
      image: 'images/balsamics/tarragon.webp',
      description: 'Our Tarragon White Balsamic Vinegar is bursting with the clean fresh herbal flavor of Tarragon. You can use it to add a lovely anise flavor to salad dressings. It\'s particularly amazing drizzled on roasted vegetables, and exquisite for deglazing a pan and making a pan sauce! Try it in your next bearnaise. Tarragon also pairs well with salmon, chicken, and vegetables, especially artichokes, fava beans, asparagus, and carrots. Use it in shrubs and mixed drinks such as a sparkling tarragon white balsamic and lemon gin and tonic! The possibilities are endless.',
      pairings: []
    },
    {
      name: 'Ultra Premium Balsamic',
      tags: 'balsamic, rich, complex, white, reductions, Italian, aged, bold',
      image: 'images/balsamics/up.webp',
      description: 'Our Ultra-Premium White Balsamic is the highest quality white balsamic condiment grade in the world. It\'s unique in North America and exclusively made for our discerning consumer from Italian Trebbiano, Albana, and Montuni grapes which add body, complexity, and richness that Trebbiano grapes alone cannot achieve. The grapes are entirely hand-picked by experienced workers who select only the sweetest clusters for maximum Brix content and created through natural fermentation. It contains a blend of white grape must with 100% Italian Barrel Aged White Wine Vinegar which are both made from Albana, Trebbiano, and Montuni grapes grown in the region of Modena, Italy exclusively.',
      pairings: []
    },
    {
      name: 'Jalapeno Balsamic',
      tags: 'balsamic, spicy, bold, white, marinades, modern, grilled, meats, bold',
      image: 'images/balsamics/jalapeno.webp',
      description: 'Sweet, spicy, and tart, like you would expect from this chili-infused condiment. Use this to light up your marinades, splash in ceviche, spice up a salsa, or blend into a dressing to top fruits or salads.',
      pairings: []
    },
    {
      name: 'Honey Ginger Balsamic',
      tags: 'balsamic, sweet, spicy, white, desserts, modern, vegetables, salads, bold',
      image: 'images/balsamics/honeyginger.webp',
      description: 'Honey and ginger play well together and bring a gentle, spicy heat which balances perfectly with the moderate, natural acidity of our white balsamic vinegar. Wonderful with seafood, vinaigrettes, pork, and chicken. Creates a zing for those Asian dishes!',
      pairings: []
    },
    {
      name: 'Umeboshi Plum Balsamic',
      tags: 'balsamic, sweet, fruity, white, dressing, modern, cheese, fruits, medium',
      image: 'images/balsamics/plum.webp',
      description: 'If you take a hint of apricot, combine it with the floral note of golden-ripe Japanese plums, and the luscious, sweet-tart characteristics of our aged white balsamic from Modena, Italy.',
      pairings: []
    },
    {
      name: 'Lemongrass Mint Balsamic',
      tags: 'balsamic, fresh, herbaceous, white, marinades, modern, vegetables, salads, medium',
      image: 'images/balsamics/lemongrass.webp',
      description: 'Our Thai Lemongrass-Mint White Balsamic Condimento is tart, crisp, clean, and absolutely delicious. The natural flavors of Thai lemongrass and mint cooperate beautifully and make a dazzling base for marinades, dressings.',
      pairings: []
    },
    {
      name: 'Coconut Balsamic',
      tags: 'balsamic, sweet, tropical, white, desserts, modern, cheese, fruits, mild',
      image: 'images/balsamics/coconut.webp',
      description: 'Our Coconut White Balsamic is wonderfully sweet, pleasingly tart, and redolent with the clean, natural flavor of coconut. It makes a fantastic dressing or marinade and is divine paired with our Persian Lime Olive oil.',
      pairings: []
    },
    {
      name: 'Key Lime Balsamic',
      tags: 'balsamic, tart, citrus, white, marinades, modern, grilled, meats, mild',
      image: 'images/balsamics/keylime.webp',
      description: 'Use our sweet, floral Key Lime White Balsamic in shrubs, marinades, mixed cocktails, pickles, over berries, or cut up fruit. Makes a wonderful glaze or addition to marinades and dressings. Excellent when mixed with sparkling water for a refreshing, crisp beverage.',
      pairings: []
    },
    {
      name: 'Alfoos Mango Balsamic',
      tags: 'balsamic, sweet, tropical, white, dressing, modern, vegetables, salads, medium',
      image: 'images/balsamics/mango.webp',
      description: 'Fantastic with shrimp, scallops, salad, and in salsas for a tropical, sweet-tart twist! The Alfoos mango cultivar is considered by many to be one of the best in terms of sweetness, richness, and flavor.',
      pairings: []
    },
    {
      name: 'Pineapple Balsamic',
      tags: 'balsamic, sweet, tropical, white, dressing, modern, cheese, fruits, mild',
      image: 'images/balsamics/pineapple.webp',
      description: 'Our Golden Pineapple Balsamic is sweet and tart with the heady aroma of fresh ripe pineapple. This amazing, zesty balsamic is the perfect complement to fruit salads and fresh berries. Adds substantial flavor without discoloring salads.',
      pairings: []
    },
    {
      name: 'Grapefruit Balsamic',
      tags: 'balsamic, tart, citrus, white, marinades, modern, desserts, sweets, mild',
      image: 'images/balsamics/grapefruit.webp',
      description: 'Our Grapefruit White Balsamic sparkles with crisp, clean citrus flavor. It has a perfect balance of acidity and natural sweetness. Try this amazing balsamic in dressings, paired with fennel. It makes a show-stopping white balsamic grapefruit granita.',
      pairings: []
    },
    {
      name: 'Pomegranate-Quince Balsamic',
      tags: 'balsamic, tart, fruity, white, reductions, modern, grilled, meats, mild',
      image: 'images/balsamics/pomegranateq.webp',
      description: 'This sparkling ruby jewel-toned white balsamic owes its tart, crisp flavor to Juicy California Grenadines and Floral Winter Quince. It\'s made from authentic white balsamic condimento, aged for up to 12 years in Modena, Italy.',
      pairings: []
    },
    {
      name: 'Cara Cara Orange Balsamic',
      tags: 'balsamic, sweet, citrus, white, dressing, modern, vegetables, salads, mild',
      image: 'images/balsamics/cara.webp',
      description: 'This confectionary white balsamic condimento is aged for up to 12 years in Modena, Italy. It\'s made from creamy, sultry Madagascar Vanilla and bright, fruity Cara Cara Orange. Absolutely delightful with chocolate, fruit salads, in sparkling water, mixed drinks, or drizzled over yogurt and vanilla ice cream.',
      pairings: []
    },
    {
      name: 'Gravenstein Apple Balsamic',
      tags: 'balsamic, sweet, fruity, white, dressing, modern, cheese, fruits, bold',
      image: 'images/balsamics/gravenstein.webp',
      description: 'The Gravenstein Apple is prized for its amazing ambrosia perfume, and crisp, sweet-tart flavor. This balsamic captures the essence of this prized apple and is great in marinades, on salads, or drizzled over grilled chicken.',
      pairings: []
    },
    {
      name: 'Suyo Cucumber Balsamic',
      tags: 'balsamic, fresh, green, white, marinades, modern, vegetables, salads, mild',
      image: 'images/balsamics/suyo.webp',
      description: 'A refreshing take on balsamic, featuring the light and crisp flavor of cucumber. It\'s perfect for dressing salads or as a marinade for summer vegetables, adding a unique twist to your dishes.',
      pairings: []
    },
    {
      name: 'Serrano Honey Balsamic',
      tags: 'balsamic, spicy, sweet, white, marinades, modern, grilled, meats, bold',
      image: 'images/balsamics/serrano.webp',
      description: 'A perfect blend of heat from serrano peppers and sweetness from honey, this balsamic is ideal for adding a spicy kick to your marinades or as a glaze for grilled meats.',
      pairings: []
    },
    {
      name: 'Strawberry Balsamic',
      tags: 'balsamic, sweet, fruity, red, desserts, sweets, modern, cheese, fruits, medium',
      image: 'images/balsamics/strawberry.webp',
      description: 'Rich and sweet with a tart edge, this balsamic brings the flavor of ripe strawberries to your dishes. Perfect for dressing salads, drizzling over desserts, or as a dip for fresh fruits.',
      pairings: []
    },
    {
      name: 'Blueberry Balsamic',
      tags: 'balsamic, sweet, fruity, red, dressing, salads, modern, vegetables, salads, medium',
      image: 'images/balsamics/blueberry.webp',
      description: 'The luscious taste of blueberries infuses this balsamic, making it a wonderful addition to salads, cheeses, or even cocktails for a fruity twist.',
      pairings: []
    },
    {
      name: 'Raspberry Balsamic',
      tags: 'balsamic, sweet, fruity, red, desserts, sweets, modern, cheese, fruits, bold',
      image: 'images/balsamics/raspberry.webp',
      description: 'This balsamic vinegar oozes with the natural flavor of fresh, ripe raspberries. It\'s perfectly balanced, making it an ideal addition to both savory dishes and desserts.',
      pairings: []
    },
    {
      name: 'Blackberry Ginger Balsamic',
      tags: 'balsamic, spicy, fruity, red, marinades, modern, grilled, meats, bold',
      image: 'images/balsamics/blackberry.webp',
      description: 'A unique combination of juicy blackberries and fiery ginger, this balsamic is a game-changer for marinades and glazes, offering a spicy kick that is sure to delight.',
      pairings: []
    },
    {
      name: 'Black Cherry Balsamic',
      tags: 'balsamic, sweet, fruity, red, desserts, sweets, modern, cheese, fruits, bold',
      image: 'images/balsamics/blackcherry.webp',
      description: 'Sweet, rich, and bursting with the flavor of dark cherries, this balsamic is a luxurious addition to desserts, salads, and meats, providing a deep fruitiness that enriches every bite.',
      pairings: []
    },
    {
      name: 'Pomegranate Balsamic',
      tags: 'balsamic, tart, fruity, red, dressing, salads, modern, vegetables, salads, bold',
      image: 'images/balsamics/pomegranate.webp',
      description: 'The intense flavor of pomegranate makes this balsamic a perfect match for robust salads, meats, and cheeses, offering a tartness that elevates the dish\'s flavors.',
      pairings: []
    },
    {
      name: 'Black Currant Balsamic',
      tags: 'balsamic, sweet, fruity, red, desserts, sweets, modern, cheese, fruits, medium',
      image: 'images/balsamics/blackcurrant.webp',
      description: 'Deep, rich, and luscious, this balsamic boasts the natural flavor of black currant. It\'s perfect for drizzling over desserts, mixing into cocktails, or adding a fruity depth to sauces and marinades.',
      pairings: []
    },
    {
      name: 'Mission Fig Balsamic',
      tags: 'balsamic, sweet, fruity, red, dressing, salads, Italian, aged, vegetables, salads, medium',
      image: 'images/balsamics/fig.webp',
      description: 'Sweet with a hint of tartness, our Mission Fig Balsamic vinegar is a harmonious blend of ripe figs and aged balsamic. Ideal for dressing salads, drizzling over cheeses, or enhancing sauces with its rich, figgy depth.',
      pairings: []
    },
    {
      name: 'Maple Balsamic',
      tags: 'balsamic, sweet, rich, red, marinades, modern, aged, grilled, meats, bold',
      image: 'images/balsamics/maple.webp',
      description: 'Infused with the natural sweetness of maple, this balsamic adds a warm, comforting touch to dishes. Use it as a marinade for meats, a glaze for roasted vegetables, or a drizzle over pancakes for a gourmet touch.',
      pairings: []
    },
    {
      name: 'Cinnamon Pear Balsamic',
      tags: 'balsamic, spicy, fruity, red, desserts, sweets, Italian, young, cheese, fruits, medium',
      image: 'images/balsamics/cinnamon.webp',
      description: 'The warm spice of cinnamon and the sweet juiciness of pears combine in this balsamic to create a flavor that\'s both comforting and invigorating. Perfect for autumn dishes, drizzled over desserts, or added to warm beverages.',
      pairings: []
    },
    {
      name: 'Espresso Balsamic',
      tags: 'balsamic, rich, bold, red, reductions, modern, aged, desserts, sweets, bold',
      image: 'images/balsamics/espresso.webp',
      description: 'Rich and intense, our Espresso Balsamic captures the essence of freshly brewed espresso. Ideal for adding depth to desserts, glazes, and marinades, or for creating an extraordinary vinaigrette.',
      pairings: []
    },
    {
      name: 'Red Apple Balsamic',
      tags: 'balsamic, sweet, fruity, red, dressing, salads, modern, young, vegetables, salads, medium',
      image: 'images/balsamics/redapple.webp',
      description: 'Crisp and delightfully sweet, this balsamic brings the flavor of fresh red apples to your table. Excellent for dressing salads, drizzling over desserts, or adding a fresh twist to sparkling water.',
      pairings: []
    },
    {
      name: 'Dark Chocolate Balsamic',
      tags: 'balsamic, rich, decadent, red, desserts, sweets, modern, aged, cheese, fruits, bold',
      image: 'images/balsamics/darkchocolate.webp',
      description: 'This velvety balsamic combines the luxurious richness of dark chocolate with the tangy depth of aged balsamic. A dream for drizzling over strawberries, ice cream, or adding an unexpected twist to savory dishes.',
      pairings: []
    },
    {
      name: 'Tahitian Vanilla Balsamic',
      tags: 'balsamic, sweet, floral, red, desserts, sweets, Italian, young, cheese, fruits, medium',
      image: 'images/balsamics/vanilla.webp',
      description: 'Infused with the exotic flavor of Tahitian vanilla, this balsamic is a sweet, floral delight. Enhance the flavor of fresh fruits, desserts, or use it to create a memorable vinaigrette.',
      pairings: []
    },
    {
      name: 'Neapolitan Herb Balsamic',
      tags: 'balsamic, herbaceous, red, marinades, Italian, aged, grilled, meats, medium',
      image: 'images/balsamics/neapolitanherb.webp',
      description: 'Brimming with the flavors of Italian herbs, this balsamic is a must for creating marinades or dressings that sing with herbal goodness. Perfect for elevating grilled meats or roasted vegetables.',
      pairings: []
    },
    {
      name: 'Tangerine Balsamic',
      tags: 'balsamic, tart, citrus, red, dressing, salads, modern, young, vegetables, salads, medium',
      image: 'images/balsamics/tangerine.webp',
      description: 'Vibrant and zesty, our Tangerine Balsamic is a citrus lovers dream. Use it to brighten up salads, marinades, or add a splash to sparkling water for a refreshing beverage.',
      pairings: []
    },
    {
      name: 'Lavender Balsamic',
      tags: 'balsamic, floral, red, desserts, sweets, Italian, young, cheese, fruits, mild',
      image: 'images/balsamics/lavender.webp',
      description: 'Delicately floral and slightly sweet, our Lavender Balsamic adds a touch of elegance to any dish. Ideal for drizzling over soft cheeses, fresh fruits, or adding a floral note to salads and marinades.',
      pairings: []
    },
    {
      name: 'A-Premium Balsamic',
      tags: 'balsamic, rich, complex, red, reductions, modern, aged, grilled, meats, bold',
      image: 'images/balsamics/apremium.webp',
      description: 'A sophisticated and robust balsamic, perfect for those who appreciate the complexity of aged vinegar. Use it to add depth to reductions, marinades, or even as a luxurious drizzle over steak.',
      pairings: []
    },
    {
      name: 'Traditional Aged 18 Year Balsamic',
      tags: 'balsamic, rich, aged, red, reductions, Italian, aged, cheese, fruits, bold',
      image: 'images/balsamics/aged18year.webp',
      description: 'Our finest balsamic, aged for up to 18 years for unmatched depth and complexity. A treasure in any kitchen, it is perfect for enhancing the flavors of cheeses, fruits, and even ice cream.',
      pairings: []
    },
    {
      name: 'Denissimo Balsamic',
      tags: 'balsamic, rich, decadent, red, reductions, modern, aged, desserts, sweets, bold',
      image: 'images/balsamics/denissimo.webp',
      description: 'The pinnacle of our balsamic collection, Denissimo is crafted for those who demand the very best. Its rich, decadent flavor is ideal for finishing dishes, from meats to desserts, adding a note of luxury.',
      pairings: []
    },
    {
      name: 'Raw Unfiltered Apple Cider Vinegar',
      tags: 'balsamic, wine, tart, tangy, dressing, salads, modern, young',
      image: 'images/balsamics/rawapplecider.webp',
      description: '',
      pairings: []
    },
    {
      name: 'Red Wine Vinegar',
      tags: 'balsamic, wine, rich, complex, marinades, Italian, medium, grilled, meats',
      image: 'images/balsamics/redwinevinegar.webp',
      description: '',
      pairings: []
    },
    {
      name: 'Champagne Vinegar',
      tags: 'balsamic, wine, mild, delicate, dressing, salads, modern, young, vegetables, salads',
      image: 'images/balsamics/champagnevinegar.webp',
      description: '',
      pairings: []
    },
    {
      name: 'Sherry Wine Vinegar',
      tags: 'balsamic, wine, rich, complex, reductions, Spanish, aged, cheese, fruits',
      image: 'images/balsamics/sherrywinevinegar.webp',
      description: '',
      pairings: []
    }
  ];

  const oliveOilData = [
    {
      name: 'Tuscan Herb',
      tags: 'oliveOil, herbaceous, dipping, mild, Italian',
      image: 'images/oliveoils/tuscan-herb.jpg',
      description: 'Made with certified Ultra-Premium Extra Virgin Olive Oil, our Tuscan Herb Infused Olive Oil contains a harmonious and delicious combination of herbal flavors including oregano, rosemary, marjoram and garlic. Use to saute, grill, broil, roast, and bake. It brings spectacular flavor to just about anything. Try with chicken, vegetables, potatoes, pork, pasta, rice, turkey, sauces, marinades, vinaigrettes, aioli, bread dipping and more.',
      pairings: ['Traditional aged 18 Balsamic', 'Sicilian Lemon']
    },
    {
      name: 'Garlic',
      tags: 'oliveOil, bold, cooking, medium, Mediterranean',
      image: 'images/oliveoils/garlic.webp',
      description: 'Our Garlic Olive Oil is made with certified Ultra Premium Extra Virgin Olive Oil. It\'s the garlic lover\'s delight! This hearty, healthy olive oil is redolent with the pungent flavor of fresh garlic. Its versatility knows no bounds. Use for sauteing, roasting, grilling, drizzling on salads, vegetables in marinades, with poultry, seafood, pork, dressings and baked foods. Particularly delightful as a replacement for butter over pasta, baked potatoes, rice or mashed potatoes. Try drizzling on steaks before grilling, or simply for bread dipping with herbs.',
      pairings: []
    },
    {
      name: 'Butter',
      tags: 'oliveOil, smooth, baking, mild, general',
      image: 'images/oliveoils/butter.webp',
      description: 'This great healthy alternative to butter is wonderful for baking, sauteing, or drizzling. Refrigerate until the olive solidifies and you can spread on toast or muffins. In its natural form drizzle over popcorn! 100% plant base, using ultra-premium extra virgin olive oil.',
      pairings: []
    },
    {
      name: 'Olive Wood Smoked',
      tags: 'oliveOil, smoky, cooking, strong, general',
      image: 'images/oliveoils/smokedwood.webp',
      description: 'Savory notes of smoky olive wood are infused with the highest quality, fresh UP Certified extra virgin olive oil to make our Olive Wood Smoked Olive Oil. Our smoked olive oil is natural with no artificial ingredients, preservatives, or refined carrier oils! The flavor of olive wood smoke is close to that of oak wood smoke. In Andalusia, Spain, olive wood is commonly used for grilling fish, poultry, meats, and vegetables.',
      pairings: []
    },
    {
      name: 'Lemon',
      tags: 'oliveOil, citrus, dressing, mild, Mediterranean',
      image: 'images/oliveoils/lemon.webp',
      description: 'Our Lemon Olive Oil is produced by crushing whole, fresh lemons with early harvest green olives at the time of harvest. Its bright and zesty flavor is perfect to saute shrimp or scallops or to drizzle on chicken or fish. This whole fruit fusion can be used for baking and is fabulous in marinades, dressings and is even more aromatic on roasted, steamed or sauteed vegetables due to its concentrated flavor.',
      pairings: []
    },
    {
      name: 'Persian Lime',
      tags: 'oliveOil, citrus, marinades, mild, Mexican',
      image: 'images/oliveoils/persianlime.webp',
      description: 'Zesty Persian Lime is married with an extra virgin olive oil for an unbelievable fresh fragrant burst of citrus. This flavored oil will take your recipes to the next flavor dimension. Fantastic with fruits, fish, poultry, salsas, marinades, and dressings.',
      pairings: []
    },
    {
      name: 'Navel Orange',
      tags: 'oliveOil, zesty, sweet, dressing, mild, general',
      image: 'images/oliveoils/navelorange.webp',
      description: 'Made with fresh Navel Oranges and early harvest Arbequina olives, we crush both together to make this whole fruit fusion-combination of whole, fresh citrus fruit crushed with early harvest olives. Our whole fruit Navel Orange is zesty, bright, and exceedingly versatile; use it on fish, in desserts, baking, with seafood, chicken, pork, fruit, salads and so much more.',
      pairings: []
    },
    {
      name: 'Cilantro and Roasted Onion',
      tags: 'oliveOil, savory, cooking, medium, Mexican',
      image: 'images/oliveoils/cilantro.webp',
      description: 'Made with the perfectly blended flavors of roasted, sweet Cippolini onions and cilantro. Wonderful with sauteed vegetables, great as a marinade for meat, fish, and poultry.',
      pairings: []
    },
    {
      name: 'Gochujang',
      tags: 'oliveOil, spicy, marinade, strong, Asian',
      image: 'images/oliveoils/gochujang.webp',
      description: 'Our Gochujang Olive Oil is a spicy-umami flavor-fest combining the rich, savory, fermented flavors inherent to the epic Korean condiment for which it\'s named. Use it to marinate, roast or stir-fry veggies, tofu, chicken, pork, or beef. Brush it on shrimp just off the grill. It\'s lovely in dressings and cucumber salad. It\'s particularly spectacular for frying eggs or to make an epic mayonnaise. Drizzle it over soup, stews, pasta, and much more!',
      pairings: []
    },
    {
      name: 'Oregano',
      tags: 'oliveOil, earthy, cooking, medium, Mediterranean',
      image: 'images/oliveoils/oregano.webp',
      description: 'Made with fresh oregano crushed with early harvest, fresh picked Greek olives, using 100% Mechanical cold extraction methods. Fresh, bright, and herbaceous. This is by far one of the most difficult flavors to translate into an oil because the essential oil of oregano rarely if ever tastes like the fresh herb, whereas this cold pressed agrumato oregano is spot on. We are amazed how beautiful this oil turned out. Pulls out the earthy and delicate flavors of the oregano creating an amazing fused oil. Fantastic anywhere you\'d like the fresh, herbaceous flavors or oregano. Use in marinades, salad, for bread dipping, and brushed on vegetables, with poultry and more.',
      pairings: []
    },
    {
      name: 'Basil',
      tags: 'oliveOil, fresh, salads, dressing, mild, Italian',
      image: 'images/oliveoils/basil.webp',
      description: 'Fresh, bright, and herbaceous. This amazing infusion is made from Certified Ultra-Premium Olive Oil infused with essential basil oil. Fantastic anywhere you\'d like fresh, herbaceous flavor of basil. Use in marinades, salads, for bread dipping, brushed on vegetables, with poultry, and more. Try it on a summer salad or caprese and let your taste buds travel to the shores of Mediterranean.',
      pairings: []
    },
    {
      name: 'Wild Mushroom and Sage',
      tags: 'oliveOil, savory, cooking, medium, general',
      image: 'images/oliveoils/wildmushroom.webp',
      description: 'Made with UP Certified Extra Virgin Olive oil, our Mushroom and Sage Olive Oil contains a delicious combination of fresh, herbaceous sage combined with an array of wild mushrooms including Cremini, Shitake, Porcini. The result is a rich, savory experience that can be used in many culinary applications. Try drizzled over cream of mushroom soup, on risotto, roasted potatoes, with chicken and all types of poultry, in stuffing, croutons, on pasta, with grilled or roasted vegetables, sprayed on popcorn with a sprinkle of sea salt and cracked, in aioli, cream sauces and much more.',
      pairings: []
    },
    {
      name: 'Wild Fernleaf Dill',
      tags: 'oliveOil, herbaceous, dipping, marinades, mild, Mediterranean',
      image: 'images/oliveoils/fernleafdill.webp',
      description: 'Made with UP Certified Extra Virgin Olive Oil, highly aromatic, vibrant infused olive oil is a must-have Mediterranean culinary staple. We recommend using it in dressings, marinades, with cucumbers chopped salads, drizzled over spinach, fish, green beans, poultry, meat, in soups, egg dishes, creamy sauces, aioli or olive oil based mayonnaise, for making tartar sauces, roasted vegetables, braised white beans, or baking delectable herb breads and rolls. All natural, no artificial flavors/additional ingredients.',
      pairings: []
    },
    {
      name: 'Ginger and Black Garlic',
      tags: 'oliveOil, bold, cooking, medium, Asian',
      image: 'images/oliveoils/gingergarlic.webp',
      description: 'Made with Certified Ultra Premium Extra Virgin Olive Oil, Our Ginger & Black Garlic Infused Olive Oil is out of this World! Earthy savory, and sweet, it great for marinades, bread dipping, incorporating into dressings, finishing chicken or fish off the grill, stir fries, sauces, and more!',
      pairings: []
    },
    {
      name: 'Greek Thyme',
      tags: 'oliveOil, savory, marinades, medium, Mediterranean',
      image: 'images/oliveoils/greekthyme.webp',
      description: 'Our Greek thyme fused olive oil is made by combining early green Koroneiki olives with fresh cut thyme. Perfect as a finisher, drizzled on chicken noodle soup and pairs with peach white balsamic or combined with pomegranate dark balsamic for roasting lamb. Spectacular for caramelizing onions over low heat.',
      pairings: []
    },
    {
      name: 'Dark Toasted Sesame Oil',
      tags: 'oliveOil, nutty, cooking, strong, Asian',
      image: 'images/oliveoils/darktoasted.webp',
      description: 'Our Dark Toasted Sesame Oil is made from toasted sesame seeds, creating a rich, nutty flavor that adds depth to stir fries, marinades, dressings, and sauces. Perfect for Asian-inspired dishes.',
      pairings: []
    },
    {
      name: 'All Natural White Truffle Oil',
      tags: 'oliveOil, earthy, finishing, strong, Italian',
      image: 'images/oliveoils/whitetruffle.webp',
      description: 'Our All Natural White Truffle Oil is made with premium white truffles, adding a luxurious and earthy aroma to any dish. Use it as a finishing oil for pasta, risotto, and gourmet pizzas.',
      pairings: []
    },
    {
      name: 'All Natural Black Truffle Oil',
      tags: 'oliveOil, earthy, finishing, strong, Italian',
      image: 'images/oliveoils/blacktruffle.webp',
      description: 'Made with real black truffles, this olive oil provides an intense and earthy flavor, perfect for drizzling over dishes to add a touch of luxury. Great with pasta, risotto, and gourmet pizzas.',
      pairings: []
    },
    {
      name: 'Toasted Walnut Oil',
      tags: 'oliveOil, nutty, dressing, strong, general',
      image: 'images/oliveoils/toastedwalnut.webp',
      description: 'Our Toasted Walnut Oil is made from premium toasted walnuts, providing a rich and nutty flavor. Ideal for salad dressings, marinades, and baking.',
      pairings: []
    }
];

const seedDatabase = async () => {
  await syncModels();

  await Balsamic.bulkCreate(balsamicData);
  await OliveOil.bulkCreate(oliveOilData);

  console.log('Database seeded successfully');
};

seedDatabase().catch(error => {
  console.error('Error seeding the database:', error);
});
