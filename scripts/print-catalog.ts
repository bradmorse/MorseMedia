import { products, getSizeOptions, finishOptions, buildSku } from '../data/site';
// Inventory only. Never uses compressed website photos as production files.
console.log(JSON.stringify(products.flatMap(product => getSizeOptions(product.orientation).flatMap(size => finishOptions.map(finish => ({
  storeSku: buildSku(product.id, size.label, finish.label), title: product.title, size: size.label, finish: finish.label,
  prodigiSku: null, printMasterUrl: null, cropApproved: false,
})))), null, 2));
