import { products } from './site';
import { recentWork } from './recent-work';
export function describePhoto(slug:string) {
  if (/moon/.test(slug)) return {subject:'Night sky',color:'Monochrome'};
  if (/hill|room|ward|house|door/.test(slug)) return {subject:'Architecture',color:'Earth tones'};
  if (/quiet-watch|flight/.test(slug)) return {subject:'Wildlife',color:slug==='quiet-watch'?'Green':'Blue'};
  if (/coast|harbor|storm/.test(slug)) return {subject:'Coast & water',color:'Blue'};
  if (/autumn|valley|gold|mountain|granite-run/.test(slug)) return {subject:/current|gold|run/.test(slug)?'Waterfalls & rivers':'Mountains',color:'Autumn'};
  return {subject:'Waterfalls & rivers',color:'Green'};
}
export const galleryPhotos = [...recentWork.map(p=>({...p,...describePhoto(p.slug),orientation:'portrait',location:'Autumn studies',description:p.alt,href:`/photography/${p.slug}`})),...products.map(p=>({...p,...describePhoto(p.slug),location:p.location || 'New England',href:`/shop/${p.slug}`}))];
