import {ProductData} from '../interfaces/product-data';


const Brand: string[] = [
  'Stones', 'Sand', 'Clay', 'Gravel', 'Loam', 'Silt'
];
const productCode: string[] = [
  '1-ABC-003', '1-AZE-998', '1-RTY-788', '1-UIO-568', 'PQS-521', 'DFG-568', '1-GHJ-210', 'JKL-765', '1-WXC-231', '1-WEO-501',
];

const productname: string[] = [
    'Product 1',
    'Product 2',
    'Product 3',
    'Product 4',
    'Product 5',
    'Product 6',
    'Product 7',
    'Product 8',
    'Product 9',
    'Product 10',
];

export function createNewProductData(id: number): ProductData {
  const name = productname[Math.round(Math.random() * (productname.length - 1))];
  const code = productCode[Math.round(Math.random() * (productCode.length - 1))];
  const brand = Brand[Math.round(Math.random() * (Brand.length - 1))];

  let result: ProductData =  {
    id: id.toString(),
    name: name,
    brand: brand,
    code: code,
    price: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
    description: `This is ${name} product's description`
  };
  return result;
}
