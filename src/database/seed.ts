import '../env';

import * as mongoose from 'mongoose';
import { prompt } from 'inquirer';

import { Database, Environment } from '../core';
import {
  CarModelService,
  CarMakeService,
  UserService,
  CarPostService,
  INewCarMakeBuffer,
  INewCarModelBuffer,
  INewUserBuffer,
  INewCarPostBuffer,
} from '../services';

type StrMap = Map<string, string>;

const userIdMap = new Map() as StrMap;
const carPostIdMap = new Map() as StrMap;
const commentIdMap = new Map() as StrMap;

const carMakeFixtures = [
  'Abarth',
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'BMW',
  'Cadillac',
  'Chevrolet',
  'Chrysler',
  'Dodge',
  'Fiat',
  'Ford',
  'Honda',
  'Hummer',
  'Infiniti',
  'Isuzu',
  'Jaguar',
  'Jeep',
  'Land Rover',
  'Lexus',
  'Lotus',
  'Mazda',
  'Mercedes-Benz',
  'Mini',
  'Mitsubishi',
  'Porsche',
  'Range Rover',
  'Scion',
  'Subaru',
  'Suzuki',
  'Toyota',
  'Volkswagen',
  'Volvo',
].map(name => ({ name })) as INewCarMakeBuffer[];

const carModelFixtures = [
  ['Abarth', '124 Spider', 2015],
  ['Abarth', '500', 2014, 2017],
  ['Alfa Romeo', '4C', 2013],
  ['Alfa Romeo', '156', 1996, 2007],
  ['Aston Martin', 'DB9', 2004, 2016],
  ['Aston Martin', 'Vanquish', 2001],
  ['Aston Martin', 'Valkyrie', 2018],
  ['Audi', 'A3', 1996],
  ['Audi', 'A4', 1994],
  ['Audi', 'A6', 1994],
  ['Audi', 'A5', 2007],
  ['Audi', 'A7', 2010],
  ['Audi', 'A8', 1994],
  ['Audi', 'R8', 2006],
  ['Audi', 'RS4', 2000],
  ['Audi', 'RS6', 2002],
  ['Audi', 'TT', 1998],
  ['Audi', 'Q2', 2016],
  ['Audi', 'Q5', 2008],
  ['Audi', 'Q7', 2005],
  ['Audi', 'Q8', 2018],
  ['BMW', 'X3', 2003],
  ['BMW', 'X5', 1999],
  ['BMW', 'X7', 2018],
  ['BMW', 'i8', 2014],
  ['BMW', 'X2', 2018],
  ['BMW', 'M3', 1985],
  ['BMW', 'M4', 2014],
  ['BMW', 'M5', 1985],
  ['BMW', 'M6', 1983],
  ['BMW', '328i', 1975],
  ['Cadillac', 'Escalade', 1999],
  ['Cadillac', 'CTS', 2003],
  ['Cadillac', 'CTS-V', 2004],
  ['Cadillac', 'ATS', 2013],
  ['Cadillac', 'ATS-V', 2016],
  ['Cadillac', 'XTS', 2013],
  ['Cadillac', 'CT6', 2016],
  ['Cadillac', 'XT5', 2017],
  ['Chevrolet', 'Cruze', 2009],
  ['Chevrolet', 'Onix', 2012],
  ['Chevrolet', 'SS', 2013],
  ['Chevrolet', 'Prisma', 2013],
  ['Chevrolet', 'Bolt', 2016],
  ['Chevrolet', 'Cruze Wagon', 2012],
  ['Chevrolet', 'Spin', 2012],
  ['Chevrolet', 'Sonic', 2011],
  ['Chevrolet', 'Orlando', 2010],
  ['Chevrolet', 'Sonic RS', 2012],
  ['Chevrolet', 'Trax', 2013],
  ['Chevrolet', 'Celta', 2000],
  ['Chevrolet', 'Z06', 2014],
  ['Chevrolet', 'Equinox', 2004],
  ['Chevrolet', 'Traverse', 2008],
  ['Chevrolet', 'Malibu', 1996],
  ['Chevrolet', 'Volt', 2011],
  ['Chevrolet', 'Camro', 1984],
  ['Chevrolet', 'Tahoe', 1991],
  ['Chevrolet', 'ZR1', 2008],
  ['Chrysler', '300', 2011],
  ['Chrysler', '200', 2011],
  ['Chrysler', '300C', 1957, 2010],
  ['Chrysler', '300M', 1998, 2004],
  ['Chrysler', 'Aspen', 2006, 2009],
  ['Dodge', 'Challenger', 2015],
  ['Dodge', 'Challenger SRT', 2015],
  ['Dodge', 'Challenger SRT Demon', 2017],
  ['Dodge', 'Durango SRT', 2017],
  ['Dodge', 'Charger', 2015],
  ['Dodge', 'Charger SRT', 2015],
  ['Dodge', 'Journey', 2011, 2014],
  ['Dodge', 'Durango', 2013],
  ['Dodge', 'Dart', 2012],
  ['Dodge', 'Viper SRT', 2012],
  ['Dodge', 'Charger SRT8', 2012],
  ['Fiat', 'Panda', 2017],
  ['Fiat', '500L', 2017],
  ['Fiat', 'Tipo', 2016],
  ['Fiat', '595', 2016],
  ['Fiat', '595C', 2016],
  ['Fiat', '124 Spider', 2016],
  ['Fiat', '500C', 2015],
  ['Fiat', '500', 2015],
  ['Ford', 'Focus', 1998],
  ['Ford', 'Explorer', 1990],
  ['Ford', 'Expedition', 1996],
  ['Ford', 'Fusion', 2006],
  ['Ford', 'Fiesta', 1976],
  ['Ford', 'Mustsang', 1964],
  ['Ford', 'F-150', 1948],
  ['Ford', 'F-250', 1948],
  ['Ford', 'F-350', 1999],
  ['Ford', 'E-150', 1960],
  ['Ford', 'E-250', 1960],
  ['Honda', 'Accord', 1976],
  ['Honda', 'Civic', 1972],
  ['Honda', 'Pilot', 2003],
  ['Honda', 'CR-V', 1996],
  ['Honda', 'Fit', 2001],
  ['Hummer', 'H1', 1992, 2006],
  ['Hummer', 'H2', 2002, 2009],
  ['Hummer', 'H3', 2006, 2010],
  ['Hummer', 'H0', 1984],
  ['Infiniti', 'Q60', 2013],
  ['Infiniti', 'QX70', 2013],
  ['Infiniti', 'Q70', 2013],
  ['Infiniti', 'Q30', 2015],
  ['Infiniti', 'QX60', 2013],
  ['Infiniti', 'QX80', 2014],
  ['Infiniti', 'Q50', 2013],
  ['Infiniti', 'QX50', 2013],
  ['Infiniti', 'G37', 2009, 2013],
  ['Infiniti', 'G35', 2001, 2008],
  ['Isuzu', 'MU-7', 2004],
  ['Isuzu', 'Rodeo', 2002, 2011],
  ['Isuzu', 'Ascender', 2001, 2008],
  ['Isuzu', 'Axiom', 2001, 2004],
  ['Isuzu', 'Amigo Cabrio', 1998, 2003],
  ['Isuzu', 'Trooper', 1998, 2002],
  ['Jaguar', 'XJR575', 2017],
  ['Jaguar', 'E-Pace', 2017],
  ['Jaguar', 'XJ', 2009, 2012],
  ['Jaguar', 'XKR', 2009, 2014],
  ['Jeep', 'Cherokee', 1974],
  ['Jeep', 'Grand Cherokee', 1992],
  ['Jeep', 'Wrangler', 1986],
  ['Jeep', 'Liberty', 2002, 2012],
  ['Land Rover', 'Defender', 1983, 2012],
  ['Land Rover', 'Discovery', 1989],
  ['Land Rover', 'Freelander', 1997, 2014],
  ['Lexus', 'IS', 1998],
  ['Lexus', 'LS', 1989],
  ['Lexus', 'GS', 1993],
  ['Lexus', 'SC', 1991, 2010],
  ['Lotus', 'Elise', 1996],
  ['Lotus', 'Exige', 2000],
  ['Lotus', 'Seven', 1957, 1973],
  ['Mazda', '3', 2003],
  ['Mazda', 'MX-5', 1989],
  ['Mazda', '5', 1999, 2017],
  ['Mazda', 'RX-8', 2002, 2012],
  ['Mazda', 'RX-7', 1978, 2002],
  ['Mercedes-Benz', 'G63', 2002],
  ['Mercedes-Benz', 'G55', 2005],
  ['Mercedes-Benz', 'G350', 2010],
  ['Mercedes-Benz', 'G500', 2005],
  ['Mercedes-Benz', 'S500', 2013],
  ['Mercedes-Benz', 'S400', 2014],
  ['Mercedes-Benz', 'C63', 2015],
  ['Mini', 'Countryman', 2010],
  ['Mini', 'Cooper', 1959],
  ['Mini', 'Clubman', 1959, 2000],
  ['Mini', 'Moke', 1964, 1993],
  ['Mitsubishi', 'Endeavor', 2002, 2011],
  ['Mitsubishi', 'Galant', 1998, 2012],
  ['Mitsubishi', 'Eclipse', 1990, 2012],
  ['Mitsubishi', 'Eclipse Spider', 2000, 2012],
  ['Mitsubishi', 'Lancer', 1998, 2015],
  ['Mitsubishi', 'Space Star', 2002],
  ['Mitsubishi', 'Outlander', 2010],
  ['Porsche', '911', 1963],
  ['Porsche', '991', 2012],
  ['Porsche', '997', 2004, 2012],
  ['Porsche', '994', 1982, 1991],
  ['Porsche', 'Panamera', 2010],
  ['Porsche', 'Cayenne', 2002],
  ['Range Rover', 'Sport', 2004],
  ['Range Rover', 'Evoque', 2011],
  ['Range Rover', 'Velar', 2017],
  ['Scion', 'tC', 2004],
  ['Scion', 'xB', 2000],
  ['Scion', 'xA', 2004, 2006],
  ['Subaru', 'Impreza', 1992],
  ['Subaru', 'WRX', 1994],
  ['Subaru', 'Forester', 1997],
  ['Subaru', 'Legacy', 1989],
  ['Suzuki', 'Jimmy', 1970],
  ['Suzuki', 'Carry', 1961],
  ['Suzuki', 'Swift', 1983],
  ['Suzuki', 'Cultus', 1970],
  ['Suzuki', 'Alto', 1979],
  ['Toyota', 'FJ Cruiser', 2006, 2017],
  ['Toyota', 'Prius', 1997],
  ['Toyota', '4Runner', 1984],
  ['Toyota', 'Highlander', 2000],
  ['Toyota', 'Supra', 1978, 2002],
  ['Toyota', 'RAV4', 1994],
  ['Volkswagen', 'Toureg', 2002],
  ['Volkswagen', 'GTI', 1974],
  ['Volkswagen', 'Golf', 1974],
  ['Volkswagen', 'GLI', 1979],
  ['Volkswagen', 'Jetta', 1979],
  ['Volkswagen', 'Cabrio', 1974],
  ['Volkswagen', 'Passat', 1972],
  ['Volkswagen', 'Tiguan', 2007],
  ['Volvo', 'S60', 2000],
  ['Volvo', 'V70', 1996, 2016],
  ['Volvo', 'XC90', 2002],
].map(arr => ({
  makeName: arr[0],
  name: arr[1],
  firstYear: arr[2],
  lastYear: arr[3],
})) as INewCarModelBuffer[];

// userFixtures format:
// firstname: string;
// lastname: string;
// username: string;
// password: string;
// email: string;
// avatarUrl?: string;
// role?: string;

const userFixtures = [
  [
    'Charles',
    'Kenney',
    'charles',
    'password',
    'charles@torq.com',
    'https://storage.googleapis.com/torq-f0c17.appspot.com/profile-pictures%2F23623237.jpg_1521355132574?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=mSiHLjczyxNQr29dTk6UoZPCI7QZEV2aXc4kEQVpGqL%2F7Bk0tHkquzWmz%2FUOZRTgBnN%2Br97FRTDQHhJjIOhiFmYa0ZSxtYrehJObre%2FjnOcNui1bfo4glZFQKATueZtL4ihY1E%2F4TESCydYpDjnaDDl1XSk29HplO%2F7v0qId0lUWiOyMq%2FQ5X8Y8duEFwhKV7%2B7ieGO5YFqI%2FNpnnxYBIDrI5BCQIJn1k0A%2FVUljkB4NP1QuWcfThJB0%2Fyih6HttN3LypZp2Dg3dREUg%2FdMRoCJonXIlr%2F8QSbd9wrh4fFdK7f3rX7eYCu7721bOW5LMgjvN4yty4O%2BFLzx5LAESuA%3D%3D',
    'admin'
  ],
  [
    'Paul',
    'Zavattieri',
    'paul',
    'password',
    'paul@torq.com',
    'https://storage.googleapis.com/torq-f0c17.appspot.com/profile-pictures%2Fpaul-z2.jpeg_1521355031726?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=1WCPlacwoT541SSSNCcCgIMJWgJDkFgfzszkim6Mh8zdbNIjd5m7Ftz5mRWamvwRLFulDVX0p6P8%2BwR%2BHDfjtpm5zmHEgTeMdmrHqUcM%2BzWHkEepiGStnX%2Fd2SWp33J%2BdxuQOu4NYJmsep0ms6P4hXXdyp4pgsXBlBf9URhGKRKTtgDi3orPWa%2FI18DPq1N8f2MfJneAVvnILrYNoi9MKWaj7jAq4ME%2FMENrIr38YFxlz1007KocWEQG0WCYL24veoM%2Ft8U%2FXNKIuF58IyPYQj3iyDTi4jjQ5kyCdDcg7KOTzqKALZFNHZx4IsaY2e6pI9uuP80WtUTBXFzvcAXgSA%3D%3D',
    'admin'
  ],
  [
    'Emmanual',
    'Mosqueda',
    'emmanual',
    'password',
    'emmanual@torq.com',
    'https://storage.googleapis.com/torq-f0c17.appspot.com/profile-pictures%2Feman.jpg_1521354710838?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=uHl0AG2dp6qdwRkx3pkz%2F19ZRkZ3PxNTSqPEcPt6DZKGFv7nzZRhnH6AWKgDIPcTjU3CFNHKhQqQVNbJ%2FRq%2FmwvhGHOwhlKJ7lOe4Qfid9ST3w7Ys3WPLbbN5ecMx0iYtaIsjpqryqhSiDv7R6TLZY6OrFDftt%2BQgyoaLp5iMY1QingDz47V9r692i8AygIiSjDxazKkrzlIu0ZS6hMExPO1YPs1f%2B2HySPMPq2bc%2B%2BJaNVGr0%2BSwixwpBhfwB2TBtfS%2BxuJFPEemzdyjotUstAB8hG%2FAWGTT2JtE0sAEp5ekATjHT0tp7gYLYOUEMV4zoBnJfn%2BmxeD3bCWhVl0rA%3D%3D',
    'admin'
  ],
  [
    'Jamal',
    'Patterson',
    'jamal',
    'password',
    'jamal@torq.com',
    undefined, /* jamal send pics pls */
    'admin'
  ],
  [
    'Dirty',
    'Dan',
    'dirtydan',
    'password',
    'dirtydan@gmail.com',
    'https://storage.googleapis.com/torq-f0c17.appspot.com/profile-pictures%2FDan-Nakaso.jpg_1521355311028?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=BfuKba87I8buXd%2FG1lCtNZLSYoJjDVyILoehumDQy6Pt7iqHSz34hyhJIY79eq0RPgJP2YPVJJWDChR9MuZbo4YtFZU6WHRfCF5XvDCkLPB49eWPSqiCSu9KQWqPd9qf4OQ%2FBWLZgp%2BOB%2FuiPESno5ueYj7kx2RKBWDSAnUoLeU0O88z0jKWpoufDDVxZuLVHTIEZjyzClAso1PEoI6ZA5wmbIq9tYO8h3ZzqLtPgInUB%2BdU2eD0iHhxu9gK%2FeA2aE3zs6miG5zPpXOw6Y%2Bxd3Qf22peo%2Byq19BD1XscihWXDBUOpEin6X5dXgt7dWgdrvBs1wxRFNmBGLAr4OkHkQ%3D%3D',
  ],
  [
    'Bjarne',
    'Stroustrup',
    'bjarnepp',
    'password',
    'bjarne@bell-labs.com',
    'https://storage.googleapis.com/torq-f0c17.appspot.com/profile-pictures%2Fdownload-1.jpg_1521355520729?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=FHo19tavM32gBopqYSD4nHL0LEpbynY9G2ZwcD8xXydbd2qo8P%2FD8bfqNS1xy2hpYyV%2Fcj93sz7x6t6jhVahW4crYc3u0hvQXIb5s2rodw9YfxoRjDcM%2BbZHNFQfQpLZDq6LWlYimcPc2D61M8FCJVqGUSBQinfNQgrh0FgtPQdccuY53bdyzNvH4qQrDlnFy01PIYcZ7Vy%2BJ8YS77F2puPs74ISO4RjGc3jb7P2n6XpNzzzyZIgmw%2FRJLbsfsi1gBBpeSZfglCnd%2BA2UCJf9E6ok%2Fh%2BlKUthYOlMhGuiIpyYjDkiT8Yd7uhtgWgtEwiedz6Wzb0xo8kLqHgoF5Wfw%3D%3D',
  ],
  [
    'Chris',
    'Lattner',
    'clattner',
    'password',
    'clattner@llvm.org',
    'https://storage.googleapis.com/torq-f0c17.appspot.com/profile-pictures%2Fdownload-2.jpg_1521355632408?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=SjH%2BheNcw0tZhb7GnApKo6pt55mfKs9D0lpp5K0UxHCnsKV0y27KvV%2ByB2YymR5FxQ%2BGlHNwA0WJbKHBvun%2BLXyLk4llnSkuajtGt%2B9UaEMBqgcV6A%2BjQ5dlJY9roMjLv%2BF6V%2FZzN5z79lOLuyqkA0kw0UudERebj8xtgeWWaNxre5sipbCDuYrc%2FVd5MLY4AkiZ0gxbF5B%2BFrD8m0kX5k5M%2BuLmk1l7rz2pBtIW59z%2BPPstnptFhzA0MyUUNE8Cu04P7TKjK9r2m0tEGf6V2nKb7SuWBDyQ5NbJEp2Tqh2uYHwtsqagFK1ySavb0n%2FlwaAWV3oDrCL7BeFi793Quw%3D%3D'
  ],
  [
    'Elon',
    'Musk',
    'elon',
    'password',
    'god@tesla.com',
    'https://storage.googleapis.com/torq-f0c17.appspot.com/profile-pictures%2F131469-14677815299249575_origin.png_1521355725063?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=UZ4Kzzei%2Fu9y8kO%2BIv13PgfB7FGi8QW4wD80q%2BpwosmYj5q4YxVE%2BaabqYYKqow4zRU%2BmQkr0l%2BGQ%2F4PGXUzFx7CsbcwAbJ4YKeSG3bbAMOVu1NV5%2BEP7bHUn1AciGPgIc%2FMKWpcPVB1VMX1fafFyjuNfA9%2Fpc02AuB6hWObAobht1nKOZ5SM4HxnZt0IfNC%2B0%2BpnYKUCx%2BwoNP8BFiuK80bc4hrtmS5C8CWD81K9BUm3%2BhxVKUcbcAbDoI9w%2Fk00RjL9cQBHqYbJlbVLolpKaUKgtLV3gW5jClSFBIGEp1y%2BRAVzEAC3RT91qpMMA7BddYfJKl6r7jRxS%2BWILCD5w%3D%3D'
  ],
  [
    'Hobert',
    'Bush',
    'hobert',
    'password',
    'hobert@ibm.com',
    'https://storage.googleapis.com/torq-f0c17.appspot.com/profile-pictures%2Fdownload-1.jpg_1521355974464?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=GYl4%2FoKM37C2Pp1S8%2FXgkLLL73bR%2B2KGFyKCwbIwYF1C8ZNHwp5Gkyue4oZPfwhfJS9cEsng1hrZb6QNbrrlsF7kGTG%2FSYgO4KenVds8YniPy8jhpBZO0f%2FC9iihu3z6VZfpHZLogYrH%2BK95l8glWids%2B%2BRWLo9cdzLlhco%2BTZNhE%2BmiDcoJ1K6xgCnO2Dg5O00FeSdThzKXZe2ed2OB81%2Fxy2nAOdGIxN2ATZW2xTpZMdoNkCpAnQVCnAlj%2FHuxwz0iom9U8wH0Dznz%2BHIP1XrRCYrDtKVISByk0A0B2ZKQa1WyaZ85ZyNdlkNqI%2BUoyxurA4B8wlBz26nRZpHYuA%3D%3D'
  ],
  [
    'George',
    'Hotz',
    'geohotz',
    'password',
    'geohotz@comma.ai',
    'https://storage.googleapis.com/torq-f0c17.appspot.com/profile-pictures%2Fgeorge-hotz.jpg_1521356094809?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=z3ScNQ5ioqrRCZX3tn7apEcClrRT8rFj8ekyIWGYk1musO8YbzfZKk4sffjwuVp3mK0CYAX%2Bcf8BAOshQYiEVdFGakWDghk3KlZoSdO7VnOHod%2BnfqQZLnuLObzxFQ8itFBtfGmgwwxrdcx67RoGlPxHiqA15MyTl55HZzaWpbxEH9NsA9ZJI69If5ZnSojj6FZJQmCbFwoD78prutx5DHnmjBjzhJyjg2fpEBowrzAK36ewHKm5BP8yPJF%2BVlPxR%2BtV9acv9Bfgdl0F9xBRygQEEBUS0nkC4A3O1GebHGx87pArDAvzQs7cVUiUwurXOYKnXTA7Wg4LsEyyvVa5YQ%3D%3D'
  ],
  [
    'Kate',
    'Upton',
    'kateupton',
    'password',
    'kate@kateupton.com',
    'https://storage.googleapis.com/torq-f0c17.appspot.com/profile-pictures%2FF7XIdhSg_400x400.jpg_1521356205001?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=C500cFJ%2FoVwBxFhYS3oEkZxO7svwutnIOl%2BJQk%2BoMFxWGLdAAdzN%2BltIH9x%2F6AF29Vjw7Qln5E5RSVSS6uBL5hPUrAb2Mxx2%2BpdK6TQZP24yjDCbBNHhXijMs%2FjpwkcRV38YqWqC7HUCLbwUd88ZgKDYCU1rSq%2B0PqV3MdXkbLDW8B8EBb1wbmYeCXD6Hw00vqpiqiw4s8sE%2FasFUYZw97zBdmGLuMowGLiGpGQYtV92pApeyDo0i8CyB8AN6zYnsBW%2BzwWKR9%2BwMkW%2B9c3Q9%2BJnY4evlLQGH1wy8VwvHwlb9%2FQ07T9mmWWgUJBt5%2FCPMeZ7Q6FTD4Gg3QJJflCIWw%3D%3D'
  ]
].map(arr => ({
  firstname: arr[0],
  lastname: arr[1],
  username: arr[2],
  password: arr[3],
  email: arr[4],
  avatarUrl: arr[5],
  role: arr[6],
})) as INewUserBuffer[];

// carPosts format:
// nickname: string;
// owner: string;
// carModelName: string;
// carMakeName: string;
// body?: string;
// tags?: string[];
// year: number;
// saleStatus: string;
// price?: number;
// pictureUrls?: string[];
// primaryPictureIndex?: number;

const getCarPosts = () =>
  [
    [
      'vanquish',
      userIdMap.get('charles'),
      'Vanquish',
      'Aston Martin',
      'vrooooom vrooom',
      ['quick', 'coupe', 'zoom'],
      2010,
      'notForSale',
      undefined,
      [
        'https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2F1.jpg_1521357762969?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=n%2B%2Fo2A8AXyCcLPxSuIrornvbvVFApTeg3HAog4bdnnnvNXUM1%2Bl2svxrH%2BxQouRV%2BU%2BMR8cWKDmdQRG5%2BJ9gcutPaW%2BzRTYMCUCHtpl2OKjRBiFofDXq%2BsE22Qidd51KX1sldyNi68NjxMBu3lCCL39QCh2%2Fu%2BrZ5IwiCtC0c59b7BrMOuLJVB9jLTljDZgNXgSHvwVjOw1%2BpZ6SPG%2FRUrTtZ0M01xQJZ4fNNnt0B8LHKeQHKnvlEuTC77PaqjjgLbLnN2ph51MUI0BsEv3T47JO%2FJKC8UAtHknWezGyM7ACkj0l2MGdFYJCaJrHqkpw6qQnJDmNVWFlVV0XGx3nIA%3D%3D',
        'https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2F2.jpg_1521357796846?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=iOF6fOHwUSmhAOyJIV1wnM%2F0gBRJ3%2FVJmKsdRYFP%2BWq81pmSvdcUbvAAfAm2jehyEHlXQARf4AFV7qHi%2BwLTJBjJlOuLAoADERg4iLDWHQa7AbsvEpQsXeOmdyrcd3CAbHTbLzOMVCqzAqubLZMm6t6iCMK6ENXQU0lpo9eYPZzM7Aghth5Z1oAiIOTA5YOd4oUVpoId0q8j9I5ALEtuDJv3%2F7XKlUesQX60zGRYISMijjLu8J2jJliCVium6y1sAT3g%2BZ5MIdJ4zIRT6f%2BPGDfHu5vhHYN3bo6Orv2Xa1GPxp3dG9Ce7UTrdMiaQZy6YVXd0V%2BJLvRAdoq%2FSZykXQ%3D%3D'
      ],
      0,
    ]
  ].map(arr => ({
    nickname: arr[0],
    owner: arr[1],
    carModelName: arr[2],
    carMakeName: arr[3],
    body: arr[4],
    tags: arr[5],
    year: arr[6],
    saleStatus: arr[7],
    price: arr[8],
    pictureUrls: arr[9],
    primaryPictureIndex: arr[10],
  })) as INewCarPostBuffer[];

// comments format:
// post: string;
// commenter: string;
// body: string;

// need to implement service for this
const getComments = () =>
  [

  ];

(async () => {
  console.log('[*] connecting to db...');
  await Database.init();

  const { shouldDrop } = await prompt([{
    message: `Do you want to drop all collections for instance ${Environment.config.database.uri}?`,
    type: 'confirm',
    name: 'shouldDrop'
  }]);

  if (shouldDrop) {
    console.log('[*] dropping collecitons...');
    await mongoose.connection.db.dropDatabase();
    console.log('[!] collections dropped');
  }

  for (const make of carMakeFixtures) {
    console.log('[+] adding make =>', make);
    await CarMakeService.create(make);
  }

  for (const model of carModelFixtures) {
    console.log('[+] adding model =>', model);
    await CarModelService.create(model);
  }

  for (const user of userFixtures) {
    console.log('[+] adding user =>', user);
    const { id } = await UserService.create(user);
    userIdMap.set(user.username, id);
  }

  for (const post of getCarPosts()) {
    console.log('[+] adding post =>', post);
    const { id } = await CarPostService.create(post);
    carPostIdMap.set(post.nickname, id);
  }

  process.exit(0);
})()
