import { products, getSizeOptions, finishOptions, buildSku } from '../data/site';
import { printReadiness, pixelsNeeded } from '../lib/print-quality';
// Inventory only. Never uses compressed website photos as production files.
console.log(JSON.stringify(products.flatMap(product => getSizeOptions(product.orientation).flatMap(size => {
  const quality = printReadiness(product.id, size.label);
  return finishOptions.map(finish => ({
    storeSku: buildSku(product.id, size.label, finish.label), title: product.title, size: size.label, finish: finish.label,
    prodigiSku: null, printMasterUrl: null, cropApproved: false,
    printReady: quality.ready, masterPpi: quality.ppi, pixelsNeeded: pixelsNeeded(size.label), note: quality.reason,
  }));
})), null, 2));
