import 'dotenv/config';

import * as mongoose from 'mongoose';
import { prompt } from 'inquirer';

import { Database, Environment } from '../core';
import {
  CarModelService,
  CarMakeService,
  UserService,
  CarPostService,
  CarPostCommentService,
  CarPostPinService,
  CarPostFavoriteService,
  INewCarMakeBuffer,
  INewCarModelBuffer,
  INewUserBuffer,
  INewCarPostBuffer,
  INewCarPostCommentBuffer,
  INewCarPostFavoriteBuffer,
  INewCarPostPinBuffer,
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
    ],
    [
      'my baby',
      userIdMap.get('kateupton'),
      'Velar',
      'Range Rover',
      "LOVE MY VELAR!!!",
      ['momcar', 'super comfy', 'luxury', 'lifestyle', 'rollin'],
      2017,
      'notForSale',
      undefined,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Frr1.jpg_1521482020179?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=PTUFTzBm825UXU8Ldm4lG7Opl8q%2F7hgLvengctwA%2B7DnvVLx2mpyJXTyfUnGnN%2BTh7NAM40rO8dEo3idlP5pCXo%2BXR73lkh7OiIIvhqU54QEey7ebnmQLYrx%2FArw3QdNLmlGJ9iaFeJ1op4qt0Pnv18y5VBAgagFVIQpTNdAiweS8iECEIHkZx73ZO9uSsPxM%2B7BUSFtme4k4ow0P7PrHjFT2ua95a%2B3glu7uCV5p2SAzLeQw2p8rLy4s19QqGbBBPT6H3uQqvhNHjt7BKC%2FOOi7GZ3LlaCjzpZeviiyog%2F5DQwBsTgGSDqIEkBWParnwAw5Rvwj5h9f1JGAh2potA%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Frr2.jpg_1521482028575?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=i6Uq4YLqDXp2%2B3749zZtXyZcpxvoZhwj3hEFH1YDwzP%2BZiW91ukXGyA3BT%2BejfP0v3B7u9kKmF7BsDujKkl%2BZJU%2FQJ4p3K4iuFdwjf7UqwLbUW0Cg4KAJTYWhi%2Fv2Y3eC31jLdhcEYdVFQFJDMFI8FdueMxxGj3nSjaQh7xGcLbiRE9of%2BTAuj1IZjMw0TsL090lwBaO14EGemjbxyf24SpYECJKbdNLNkdkyGyKyDO2yyqg7t0ytsPMbNud0OD1SIevIB16apeOkXhfjaQo1yJqyiD07pIi8JKL%2BOuOXJkNJ0t39hhFW%2FGV%2Fxp0ZtXaJAd6MtCOkYwlDvSyF1%2B5AA%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Frr3.jpg_1521482043123?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=0TGKRHqSfg2eOqLvG5MBScHve%2BbW5hIejIWCA%2FhfgY1M2BiUMCqsqpLyE7Wz5%2FGdnwJ3G3qKITrXKdr7cn86Es5ArcxuLuZcXnJ48K0pvYW%2BJtCVE9Mh385eYohxCj%2FrciQjO%2Ba5Eb9vH4OwenUoY5Pj2FqX9u9QmKn2K5tRCKXwTsOYk3lECb95lYDpa6U6yLb%2FNZRC1f4OfxdY%2FJW1qCWqIbTGBZ%2FkjAs4LTb0Upxx0oINP4BrWUEyEDl54mr3yahGwYSSX3UiU6Ptuw7Cs9Re1ecZ2uau7PsEErnswtf7KmWSRc3h%2FWgY%2FV2VJCjdaLma95uw0yifvybzWiZUFA%3D%3D"
      ],
      0
    ],
    [
      'geethirty',
      userIdMap.get('geohotz'),
      'G37',
      'Infiniti',
      'Love my geethrity, bootstrapped it with autopilot from comma ai. Shot with a Nikon D56000.',
      ['infinit', 'quick', 'sleeper'],
      2012,
      'notForSale',
      undefined,
      [
        'https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fg37_1.jpg_1521424683042?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=ZJ7tRseyinSyOzvx%2Fy2nL1dDmiTWVglu7cydlQGn%2Btb%2BwN7cLpIPsoBU7UDacsbf19N%2B0Kow13ZIzGFaWLaVvLH9TJGhQEIQJMJkPzZNuUNk8gfonz9CruAXpp%2BP4RRe7%2FStiBVQ3r13%2FuqvH7qG6qpoSjnHvMNsy7iOvxmA6s3NI08RSdZN1DvTcu%2Fw9EyOScntUe0QbfgsUfdU6Qe6oowvWz0QP2XNuQaSlDXoOm6jW1V0zRQA14fcURj00apRGYhnfeiKCDR1MmCMy0KYjsqZ2CB9o4DbGDeon1TPgqVFbRbSSC5WvxjileuIzkVfVAAOKqBoDauUrYlBQOGAMg%3D%3D',
        'https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fg37_2.jpg_1521424702608?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=jlIutXaFKuZYQU%2BdAG4noxSAwinY%2FaveWHyx6JBIrW6kJiS0eGzW4tk0Im0L9LIy6vlmg7Bloh8v6tSQG6Ftu5Wm5XHWeg1voFaXuOw592qVqMkYzr%2BDRPsV5bVpWlPwj%2F1gru5MkEPiadbPt%2BwxxFh4oUgOqjqvCh3DrhfCXladjLCz0DZ3RqqpaTy8tih7Pmu6DuI1ywzq4ZCs3sgt2xtesQzekBfs3R5JaYIh0mO%2FAhfaj2FVw7ECertY3mG3kEe88CMihQzYpcupSwed70S0bwSTxTJYlG4gL%2F2bywZy4rMQ9WlVebu%2BIVmJN%2FxDC9IWoTv3AVfjJIbaUYa3KA%3D%3D',
        'https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fg37_3.jpg_1521424765544?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=qRRzNvLBrT6SAJBc%2BE%2BPPrgR4wj84k5C9QwuVpag8mimejwBvWaCVTB4wSfdNHwnK2JRCALLpJLdP949nc%2BcUHN6h%2BXTmuNd0UGIt0oWC0CfQdZ21tYqR2z5egyvr2sE659EA2Qdtc%2F33dMJg%2Fb2SjOvUEQ6rSDvdB%2FydVmSsMQcNCl%2BxtcGWdf%2B6JCnN2k8bYOAaq0Koq7I2bPTaj0I6oBFofUPT0UCEhZ%2FamY8nAPDDk3m36tVFMyDwpytkbGbHbc3LK7n2JHEZrZZevg7wUjXWulk0aiSpDM6w5SAV8ZN%2BTtru9b5oF4A4%2F4TUn3DbfsyGyoYf1mb5vK4iS36gw%3D%3D',
      ],
      0,
    ],
    [
      'm3rica',
      userIdMap.get('dirtydan'),
      'M3',
      'BMW',
      'Love riding around the city with this thing, but I\'ve been steady getting 2 speeding tickets each month. Guess I gotta cool it ):',
      ['zoom', 'coupe', 'speed'],
      2016,
      'notForSale',
      undefined,
      [
        'https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fm3_1.jpg_1521424919308?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=aR%2Blj6cLoCwGnKfc1TO1Asec5TNa5fl8OQyEqsD%2F8c9RFAayN59zoyOiDSsV%2FvzXmwzb6SZb3Wy8NM8woSXHXaDe8wfsICnU3yhH%2Fs9VJUf4jdQNQmsz64hbTiXPNxHQTTdqN%2FhqL3Gvofi5IERS5goXJ%2FtaHB2Z%2FbrdJlAsVb2%2FF1avwsyXqRDS%2FX%2F4%2Blzun7SqhH9VNqj5p77Y%2F18WmO34J2srnNJxuoGAkq4CnCTZwpPL9TH2W12xsrtpd5MNBWrTazYLy%2BsRe3%2FrBNit%2BylTaWFPAUgfZXpGS07e5puQH6M5h3pbSJoqpCsc5rodfsRLpxT8N1D9YFwgoNPXDQ%3D%3D',
        'https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fm3_2.jpg_1521425110045?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=j0JT8rzLbLRON5OKKj7eHJ86ramfbe3g3itEzAahNluCx%2BNm3x%2FV9fy965jZ1VL1cJjXjPt1XZm2XV9%2FGMNoqIsu2veTRy%2F3iO6gF372lYRQPQsERQWIW17enazq4LY%2BGb4NhZX7ZLKORl0%2F%2BARwZyvZXDVPF8xIKWWWNix2N%2FlUG1DAp%2BQjdQqNzh%2FXHJgnOYHkRZC96twP2bdOUIYLqCN72Iljwq2YZcKSRdW%2BtshHA6rQ3woleEnBBEZ1tC9Hqr91hZ99CX2I00Wtba3vCZLziKfipyuZrOrNOU8Ag0YWAEFd7ojTR%2F909SQAh6L6%2BLPtYZ3YhcvcvgS0ActHzw%3D%3D'
      ],
      0
    ],
    [
      'priu$',
      userIdMap.get('bjarnepp'),
      'Prius',
      'Toyota',
      'Bought this car to write an autonomous API in C++ for. It\'s pretty nice actually.',
      ['eco', 'efficient', 'green', 'vegan', 'c++'],
      2017,
      'notForSale',
      undefined,
      [
        'https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fprime.jpg_1521425492772?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=BXl7avNaYZXTk86kdSJu8YlZYAaOnBKcMCfrFlP6BFPbIdQ4nxyy681TSsCsxmoLOZ2wqgh%2FNjfVQ8fwgJf44wI1v1L45PliL%2FGCW9Ei4Fky7lCmUrHO5MmwjHQrbz3WspS1bMBfB6mvtKUfHUZSbGDIxU4BHrRvwai6YwLSfts%2Fdt6HZw4QvmdK67HETYCkWj9UHNn1mZhiEaMReuWqSjR2B1SDke0wcKUlfzUOo2H9TMdFUatYnBtu%2BpPG0pn3zfSeQ07%2BNSkh1ZnmtyqFPY5Bv2HoStUcfoYjCI5yhiHmlu7OovwbwqhEoze3rzRBlHqkRdHI6n0gCCFnA8AIQQ%3D%3D',
      ],
      0
    ],
    [
      'accord',
      userIdMap.get('paul'),
      'Accord',
      'Honda',
      "120k miles in 7 years and still runs like a champ. If I can get this to 300k, I'll retire it and get the current year's Accord.",
      ['daily driver', 'efficient', 'comfy', 'sedan', 'hondalicious'],
      2010,
      'notForSale',
      undefined,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fhonda1.jpg_1521480811197?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=1n%2F9hZJQkfHQuQEbAMWJaw8WDETNSbN5lP%2Fn%2BBteHgMZAi8gqtmxDg%2BRwvM9O01VmE5D0Oj%2BxH%2Bg3nf8z1E6PdBARqlsWkq0KgY%2Fh%2FApT9OXetRpdGFD%2BIdGMQq0bAbg9wDg2zFEOzpP%2FlivL9v9hy%2BhyqeTfLxgQnDw5Jk7p8CSPVkph8AN0P%2F7BvrPeO5CK8Vp6yAcm3V0jcCJj770L%2FleRpvYkr7wYg4m3refcNkwchhPIt722QX2h5tqJMx2M0hjvkrxvEKZx0rsmUoE7L5Z440NlBIQyzuh7XZVd9vAZS1s%2BbF8dETIKUpmOnXOwhZXeGjX%2F1aMkSO6x4MDyw%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fhonda2.jpg_1521480818800?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=sQrlQ7w1o0M2fZVe7%2Fz1NWiOFndCr2vAmLBCUFByDES1j80wPnVBEVRX54i82G3m2fzhl3FHCrHi63bK7CqRkC3uHLVzaD3JjFGTUUfY50Ek3dAoXerH%2B2swA%2FOIRfDIXlcD2A9aBzsUtBRtmFIwcRPwhos%2BmKOmER4W1MaF1%2Bpzqvrzblb34kpXeQeefjcG%2BvM87%2BdAgTA%2B1mnZG%2FYrybexgMc1%2BYdOGPr51He66phtYbQmTt2jf4oQXO6qx6utPNTa4afEF2eQWl1Yd8l36cAwUjeJuF3T2z0U9Fwr3YNDZ3%2BnJC57S51R3SIkadkKZLWuLoEvZXBleDNu5kdZNQ%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fhonda3.jpg_1521480835008?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=lEZEOlVJbMF6MZ4e1wM7EXN1xClfdNuGjQkez3C1mc9DuAewd9cdZos4waja2%2F4ILOl%2BWJ4CA5UArtpnsVU0Vk7xb54DWuqxN8JI5qeEjv4231ETxx%2F17CZrGJgZaI3nr11REYYmfmyKjTeOx7gKpD%2FFf5gNO4iehTlRqnqqZ%2Fn5FWu0aoMAZFijK9B500I9TojL3RuO3%2B6EoXH1wswkLTRuq5PPvsDyRxl7Jjs5PwU5a5PC0Lp3Lh%2BIpprRXJ9m0BqWqghqYVFAtbku1XzFXx%2BtX2jCmipyybn9Zb88tHLDNU9Lk5ZZN3s%2BKzoMGMPcBSRTPYM576HtbUy%2FYeMLTw%3D%3D"
      ],
      0
    ],
    [
      'kate approved',
      userIdMap.get('kateupton'),
      'S400',
      'Mercedes-Benz',
      "It's amazing how much I find myself using the onboard GPS system. Always lost!",
      ['turbo', 'fancy', 'lifestyle', 'leather'],
      2017,
      'notForSale',
      undefined,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fmer1.jpg_1521481356156?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=jMkaM%2FIMup0Mt54%2BtSk74SOiB84cF4azTcWNX4hf15j66TnSB1F%2BsM15oVHbLyk6u6FN5DzB29letBHyruGeZ%2FXH9R%2BZt8vmufHIzqeTNogCFrkmO0s0pSfDjYo40wrKO7CbAAJ82lXld5Rl9us6psuLc219sZRQJpBGOUs8y0i8UiYbQIHLh4Ldp6ttaCfYTYWbu964qGrHM9McNZdRL1%2FV2P6GVKKikl%2Fxhmh8ZuG3yk0XuEZXFKb0q6OanRUUflXlts3IaYnmLAPTCEmuj%2FCpNPSPccE%2FJSh86TdUX0OOu6ssQLmyIF77Vtv%2FA4Kvp5jpOTlM8sB%2FiBxrjxGUYA%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fmer2.jpg_1521481364088?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=pk03feN2ugQZJhxsfg18YqJvo7lSvSeG0tJjghxNcEjSSpkCYt1Xn3DW8bt%2BqwFQTYFvG37TKby6xDdyMI43a%2BTlgffIyP3eTbGlTzzENpq4GscMgBiuQ40bcyI4ewFv5d5ITz5ot235jywfLTtIvmp%2FKBuZGw%2BlHMmAaibKtb51MpWFO7hC9tbPL9okFP9h%2F9fNbaTy0XKsE9qWfhKX4G20LfCLpifXtHjHU1fnqKa9OdJ75VMyp1%2BVz7Vye2s5Nn14wdkW9G8yLmx8fSRZ64MaBzt9MCrymcm8PnKJ0F6LM1hT%2BII24pH7ZlMwat3EiVBp3BYXP53%2FmRlc%2FeWNng%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fmer3.jpg_1521481377922?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=DROSx8bGmuvA11xELgIDRcZPpFDBlll32OeomwYSyeqc4NQKJ%2BXhiiL4t7uQh10W%2F5loT7nMlOB0h%2BS2IJTox9Jj3HotTgzt63bfqlYxK8jvqY9riicUZYWEbGlWbpHuFwVs8QHXSkjuJOnwPGRylgc0QQ3IIwQ92uQkf68VyU0eAaZD0hJ28Plx3Cj44f9kDvmwjC%2FDuZAiMoqv0hbzCX0m9FTq%2FbeBUmTC%2FwCK3W3mJ%2FBn69tFYvB5XieQ6GM6OXklD%2FBX3QI16UtfJY1nH5os7C7xEn%2FEdlmImT2dfqIl7o5%2BWCht3JvPtmz8tF61HLcqpRJGl08O%2Fh58REkP1g%3D%3D"
      ],
      0
    ],
    [
      'jag',
      userIdMap.get('dirtydan'),
      'XJ',
      'Jaguar',
      "Doesn't get much better. Premium gas for a premium life.",
      ['sleek', 'pricy', 'fancy', 'sporty', 'quick'],
      2010,
      'forSale',
      2000000,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fjag1.jpg_1521480334007?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=Sn2hofhIkGDUJ107eiQrOer6wjVZsoMGAcAA2q6jIxQ5zlbAdrmYbVk4i73hwFukQDaZ26FRIohz%2BcxZEAt4VmN%2BvscmutZJGsGBsJljqX3pEOPR5gGp1m8TpcjfKki5Q9TQ%2BEcJdr9RyV0YxXzOibz%2FRttDmjZTCv%2FpmmvQisLgZWf6vjzaDPuKvrdc2AwDZgf3oYX68QXntDaY1UkT9Uq7QhYogiarhW1cGenhGQzosIEiPaO6p2RhdLjHby4fNLQVidLYITkZyFCFU%2Bjq3LO2fWLlrhHoxJZPmXslaZmSETZsYjCNSesDtsjvoSoPMAhAPeegFQk2Ja4suIV3Yw%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fjag2.jpg_1521480398871?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=skeJFwHKQxbwHfRq0WmJ4YT0UowOAAJ%2BXknVRUrSMSwj%2FtK1oWIIiXq7%2FPQ0FdztVcaIpabH3oM1X5Xz5OcVoB1ezOFKFvVJeGg6ao%2Bfg4AcGHZ0I0fXXL7xH5fBSUgTgEfUUitYOvj%2Bu26XRfHGoxOfFRkXsL0EIjUYQ3MS4zjXUSaxJz4blKCpolFm8KnaqIhUnBW6LqVqLMbaSbIO7bEY1FIl6LVIUHr5d5LoY1RZhmN9UwKy7vRAGf2Xeod%2FNyH%2FA36ZCIXJgEoOcNaxk%2Bey5BszikIa9K28NdsyuV7L97Ef89cAJ98XI%2FfOiS9AZZ0NvrGWylfA6vpdfDRV6g%3D%3D"
      ],
      0
    ],
    [
      'hot like peppa',
      userIdMap.get('kateupton'),
      'Cayenne',
      'Porsche',
      "Not called Cayenne on accident - this car is HOT.",
      ['fire', 'buy me', 'supercharged', 'v6'],
      2007,
      'forSale',
      2378900,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fpor1.jpg_1521481592934?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=YS2B8c%2B4Uy%2FJ9KtCDatf3koJQ3fFgnoXrjxmVfRWjOW7a5w2AgBl0DGNoWJk%2BIT4gP5YvF2tANjMAzmzn%2FE37tLklkt9syAOCIkHLlExgJdmPuUD9WEoNu%2FtyA0p7Hvxl%2BN1NTBZ9HGgNy3Z6dj51sZKzM9Axxz%2FeTPf1yiIAB6tH2b%2B%2FEUOrD84uf318rWBBAZVt9Zw9jv3KxVnweUy62T0D1bl9mVvk1RXhICKsetyKv3Wvs9WQBqzdBcjqlsQ5UhwcW%2F3MMJXuJ92t%2Foam9Zt4sxwpAifxjkiZ1UFoOfQxY7bgfdAZfaRtiirbyH57%2FXnnFHQEpwIxk4K613%2BYA%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fpor2.jpg_1521481608484?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=VCIUEDEw2uRT0eqsnjccxNDNgLfNMzoQCNYTTt1mhKXgNEAAiPtvOGHCFgNZoi%2Fj5nRNF4h2kO9oYz6ARKwbZb7%2Fs1L%2BuHx1ceXxc%2F6VuMCGHy6TwX18XxNiY2fgLSmsAapbpzchQSbns66dZj1Wj%2BZejPUgbt27IHKtbbWIeW8lRqoQ%2Fw6x8JS5nSn2EYNOoJwfVbVQ2iCWeLCNZ69jImd7CREEYs1X7CqYwD3pi1CBsk3v5hscTud2SzK0mQ4YcuCeoj5xUJ4c%2BVqLAf5JDemba2C42aMqVIEuYt%2FKWuJMTz9RpzMLeEOaeiBWiRUqRNXH8NdL35vzBuFV8fvHJA%3D%3D"
      ],
      0
    ],
    [
      "thats amore",
      userIdMap.get('elon'),
      '4C',
      'Alfa Romeo',
      "If I'm not sending rockets to Mars I'm buying Italian autos. I'm sorry, me.",
      ['italiano', 'not musky', 'not a tesla', 'everyday', 'cruiser'],
      2013,
      'notForSale',
      undefined,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Far1.jpg_1521482654111?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=rcLAYzAkfk2AA2BfJ89u7Zj8FtGLlCnUxTHWfedVFWD6hanjnxaAIz3xXIqtLqA%2BONdbGFNWPocvjCkAlK868c6Y3WRXb3%2F6cGW7%2FwHDGsOyIiyu86IpcCuUqQdmhnsZWIzWFpko4wdSSfkw3UqF3hvFl19awrAOik1oWhhYmI%2BXQurR7ZFKOR%2BiMch4hwF7TWobRv%2B9MdCYyEJg0n7rv9JRRPTo4pp4vYA2JBWlByETm%2BicUR5dqO81hOKdCnnOGGjmHLTzeznFVissq7XSyo7csPx8QF5ihEbaksgyLluTwi2w3y9PW0fS7CmJwN%2FN7Obas9WgVZSeU5%2Bosn6tGw%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Far2.jpg_1521482660642?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=HcLCLSeGSXqCIF9lpRUHa9nOSNYA4XVzT4RLsahov1CVlUGAysGVJJznnBpATJ%2B3Xk3uzGi2tZJZkoEnBWVGySLqSknhChlPA18hqVaBn8nlfBEzbp%2Bp1yGS1tSwaJ4z47%2Bcnh%2BVgn0KRWjfd4vfRs0MlufYfVyj4oFHbFi2eKJRD%2BjQ3dWbLrSvzg7hG3DEgLolN1d3PftXLVWVRuQcgYi2B92yGNyu4FwRC%2FlV0DdEl8WcUjQgKgOJz5JmewwDWXZhdW%2B%2BKqLXgv6LXleTD4pOn2jgzs1eHRTIjc%2BpUHlw0SIrLwtwJFK6sNCu6DxWdcNYSdf6PIgD9FJBGnFXDA%3D%3D"
      ],
      0
    ],
    [
      'run forester run',
      userIdMap.get('paul'),
      'Forester',
      'Subaru',
      'Awesome for weekend camp trips, music fests, or just daily use. Seen more Phish shows in this car than Antelope Greg.',
      ['rugged', 'subarucru', 'vegan', 'camping', '4WD'],
      2006,
      'notForSale',
      undefined,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fsub1.jpg_1521480681757?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=omHyNnIlLRvo4kWZgu%2Bb0s%2BEiNaZz%2Fk9ioZU03W2DDGgJWi11cRcvEUWXfxY8qRuWCY0Ww6DbUqWzPCvt%2BPBY440d%2BzTMHHSteZh5HyN%2FqG%2FhcafwysWh%2Fw4YoqPpc4vxjmb%2FC73uyGJdPymIMpaU7SGeRvxeVolzzPGoEu1DF%2FIw8vD0T1zYj44cfW5wW3KYhsLYWUKcqPVz%2Ba5TB6aZauozM%2BAGs2DkdbkXtha4vAUFe06jlqHXPOn5aQ%2B92y2gFLTOg%2Fkyf0DXJD8hX9mCRCqX%2BP%2F17ZVZETTtrkYcEpR2A5ogEGkbvK6OHfh3TFAe6swI38DLreScv%2BWyT%2Fgyw%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fsub2.jpg_1521480708406?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=OsUUGwAqbWAPuiOy7EXh5l209eEWK8wSTjFVpqf4GIp6RV%2Bucczr2j6Aphpz9EXx8MUVoy8mw9rcrY%2FjDyGMODJCDMEfPDn4EAAqelTmJIbdi6Wl54ShT9DhgeEoeT9MuIFWQl7Iyj3idKs1M6akqu4wNUJKEgutHB%2BOrzfJtVRJfbBFwgoN7lqQwziobnrHpzNUGa9OEKqCzoyXd%2BsD10FB2RhhOGTHO6EJ%2FxWhoRefPSsoK%2BJM7qsBs%2FzR6aG6M%2FXYGWzYT9bIqvzyZTBTq7CHWbKpFVMjKZv4N7ek%2Bd9bRo%2BDMI0vFW7a6kK2gnRRr7g53YaNewIS%2F2zMIFm8OQ%3D%3D"
      ],
      0
    ],
    [
      'designed at spacex',
      userIdMap.get('elon'),
      'TT',
      'Audi',
      "Bought this car after the Falcon Heavy launch, accidentally sent my prior car into orbit.",
      ['roadster', 'quattro', 'obsessed'],
      2018,
      'notForSale',
      undefined,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fau1.jpg_1521482758352?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=RFb1vbtz896r9mpAIuQvVS7LaxZQWfhNYq8VtN7y%2F9UyBiM%2Bm4fy8KTqTNkXBG1Zonzsa37zY7%2BsGd0lxEx8xEImAJzjhjl7ZtN7oDvD3xXUqgf7cHTn940jSbNRQ4MRIiVTNVRf7jXiqyN2iv9s62JbMlxpTPBY0yIkPGc7r8nitQe2PUmHenjzRu%2Bnviblof127cIsbQ94MNVkwQO4xx9kjwXN069Fr86RxBBB73EHLM%2BEVVYy39Bo1%2BYRzIKNoHmCmsjsaDI7JptRjNmgZpGiCZGD5CIny%2FNODc%2BSSncNHi%2BHprLaQmTFDjGXf9uXDXpKyLbVcZ55r5%2B%2FhajIBA%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fau2.jpg_1521482776225?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=kPDzpANgBQlPZ9NUecAcLCn7xoFjwq%2F6algkVd59Hp7LJGWASE6IyQk7xMRoLkF1XD3onzF4%2FwvmBkPuD4KFgxkAZ3nOa%2F4FDvHXd%2F%2BH9GjGnC1Kpiz0lsyRGGU%2BFeq5cfJZ09tVfrCCsLgzpIZfNEYetPEkXcm6dESt337aKGJGzEl8L72I3JoYp7Qv%2BwHy0B8s7EjPAgjIXsa7%2FJoUf5L6Oq217c%2FtU17%2BIN1u4Uykb1qX6aydGIpU6DMlJhSTVFKjkoODkz%2FqaEx6YyYwX3YV8I25wVh4jcjh%2BnlpV3zGaPdqRnNEUrSTBMj3ZuEXHLR11C1fkvy8MxxiYzSz4A%3D%3D"
      ],
      0
    ],
    [
      "my tC",
      userIdMap.get('geohotz'),
      'tC',
      'Scion',
      "This is my Scion tC and I recently just got this car and I’m in love.",
      ['street car', 'tCclub', 'orange'],
      2004,
      'notForSale',
      undefined,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fsc1.jpg_1521484012975?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=fiqppHMhNVpv5cu%2BFFAxf%2FE9v05l562zb3c1hKeYG0hmzaSOQCNQXlYfTpSg9thAJ9Q7K7Xw3iKGSCG7OjJHQA6BjzE8ywhnpGzx6WmVdQMsxXN8mViSGA%2FT8dM5I0gVuEYr9JLynyfV6w6UIdnfJcX4fWVfYOgJz5o%2BCXh1r4WlxN%2FEg%2BTzmSv9zlPQlF1Evy%2BehUqBzTDPiMg2e7MkPUUQEsRhnjWURzZr6KlNHAGVRwOlFhb8Nf9mbPynG5bsVs8RJj6CGuBjJxJbXVzxZrwlM6qi7lekF2Y55mpKAvxMeDmWq8u0IEB1W%2BbXtpVNSPmmY1IibU6sewOnyO9EwA%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fsc2.jpg_1521484021256?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=Axa6qGUq6%2BaP5ERaLku%2FBab4ALIdSUz2sUQQEnnb08BfsmPJiISSyOzPUfCcBu7Q%2Bunb98qK6nWAzitW8H4gcYTEc%2FbShhqwfM3sUzA95cxdwFIw7yxHGvKQAwgVGkwgqGGywI5lAyz4jvpHpRnBDRKkbpOaMiOQv0fTcKFmR7ak820Ovx3Vj46tDNu0ZTzNedeYo1n9V6xJHPxuYgSKNysFJTHMnccPZcRJTR9jKH6glbFtQtu0pC5Yn4CihT%2B81LMPGF8zTRJ64qs%2BNWJH4U9qNIxiUO2hhguWx79SrYTJnAnl4OHw8DSDgPbRRW9zI3AHfBl2LhQ7RO5DpeUMCg%3D%3D"
      ],
      0
    ],
    [
      'be careful',
      userIdMap.get('geohotz'),
      'V70',
      'Volvo',
      "Sometimes the car spontaneously combusts but outside of that, it's a nice ride. Low price tag. Extinguisher included.",
      ['slight fire damage', 'volvo'],
      2016,
      'forSale',
      102000,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fvol1.jpg_1521484362571?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=C8nkswqjdRU5nF5rESvqTF5nrAjxeja5XHC%2FdSteC7fjxjqFRH6NEYEsvdv93WBbZjp2XV9qJ2eiswec6MF14ofsuNkO9Csdmd1l%2BzmW%2F%2FKQ5mUldTdhz6bzGIi%2F6IMzzmXuTlBljRibspf3xWcyQl4L7tNp53Z%2ByNgif8KjNJlDnVsYoKEaA3PsCdsKJ2%2BDlOZ6xdd5j6MgX7OfhcX%2FrnigPEpcksd5GJasyWRVRXMDnPAvC8WRJlgsg4RbRRj6cnCTxIMRtHRbsEN6Ltqv5GK0q2jeUqEWlZ7BEDbbVwMizKHk3q%2FE9olGyL87dlIyQaai4cj1W%2BZujY%2BubBEfwQ%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fvolv2.jpg_1521484379439?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=NYl76pCwIzh%2F06DcnCWxpK4kfUKKgm7zrV%2BYukZ6k%2FquBP3PFup8NAYvNNPJNqCY3Vi1F6vyYyIz9YiPBTMO0KWX0i1J3BSQ5zikQnqWA62clDOc4mOJNGWk3gIp7XolUj%2BK59X5T0fp3VYoariuSMWGiGCIJWbYF0iX%2BGt9YgdccrwNGBNWKo3SGf43AL%2FSGTsaisbdI8u6wdIhgKEOC5%2BC638JfCfYKRW1AjYdGB41VKbrPR%2FiS0z9jWucIxjoCgHYU7rzpq0C8RHFuuwZO02%2Fg84plY5WUSmWM%2F1ZMi8EZKK%2BbXK4RSqHievMrIJIVHCyCD73rS%2FccSDjDihQ6Q%3D%3D"
      ],
      0
    ],
    [
      'fore!!',
      userIdMap.get('elon'),
      'Golf',
      'Volkswagen',
      "Don't be fooled, this car doesn't make you better at golf. Hence the price.",
      ['classic', 'original parts', 'like new', 'german', 'collector'],
      1974,
      'forSale',
      4250000,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fv1.jpg_1521482536804?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=WILbs%2BXnxyTBSKEHCdv2vro3Xx38YpgXRASIpa%2BKejwFnfoVoepMfdBP%2FW9DRxVrXrkZNr0A6YjGyxvmHs4jnmq7BJVeueHcdagkdm5h5KRyPK4BN19ZIRnHXFt88zYwF66JCuCgF2r9aczwmcsIbQN%2ByN7v4ZmrS8jenUcZiuuEzpCGeUAKsl8lMt5sOJFZf%2FnIdMoVty00ZVAwbcns2SSfwBUgjkeI1OCw%2BdBW2%2FBiJfNbVymM46GPxKZAeIrA1FX3H6WXtQA3wkKWmuYnJt67Ls71x3ZA9%2BHP3%2BNI14Txn%2FX4NZVJCcqVrtOIFwlE%2FfG1kYgn6hWzww8TaZ9MWQ%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fv2.jpg_1521482543732?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=nM80C6iFUEdpYvZYdWKS%2FZntd1OMbmmIR2okkyxDHcvdA5WKd4eo3d93XKAy1ebXHjAGOp%2BcH38s%2BAK0yJslsuVu9S1UIJlE5WNGjY2Tlv6aVc1kFGL3PIqTr5zhpnT2SVwv3ZhVmjEpYz4JSaFJiEimq2gylEiKAbgU1zeidTjmIkLV0Q07FN9MhEVJE3%2FT%2BA%2FuvIVdOvBzDhEcPJzEOLJKO6xD%2FTqFnJqQqJhfOwiibKy%2BpfW3WR8vY1yzhM4z5cMlDlNhFwak8hnnxZz83t%2FAYIDPMBlgld4BUsv8wpKcCHykbTw8xR%2FhuDMJ%2FsnPK6Pc1lxRQg%2B8qxLV79BCFw%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fv3.jpg_1521482558926?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=OdoK57b7OOv1TI%2ByQBH7QakrMxqO175xP2ieoPvrhb7J%2Fxndwj0U7lq4JQNfgfEhTYJg3UqwKnSR5s41UCUuYS3050SsPHM6eL6YxfVhqmxasC76Pmie0aQfqKG73hsTXwVr6%2BhJfl%2B6SY%2B40FWZgD5vX3R9I1ARCjsLx2NrUVAj1r%2FESiu%2BhnyNVn5qwtUyrofwzcVWEkfuuIdRnwm3kvx%2BbB2OWKPbzq1FglKdhd0WnYz3G4jZFoDdLw3%2BuljDuRYPCD6m7A1%2FPj0rcm9DT7OxWO60j7iuUXFprionibx8nB6HfTYEsyiZcRVjbqnX%2BiNBcmnGxBadtmzAIMyupg%3D%3D"
      ],
      0
    ],
    [
      'needs a wash',
      userIdMap.get('dirtydan'),
      'Swift',
      'Suzuki',
      "Went for pinks with Pinhead Larry and got the better of him. Thanks for the Swift, Pinhead.",
      ['retro', 'swift'],
      1987,
      'notForSale',
      undefined,
      [
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fsuz1.jpg_1521484569504?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=yYGAZ8TITOUKT2sUR%2Bd%2FKh2YIuSvQymQ3dYf5wuF1IuQ8%2Fi0YDpVneqvqhpjCILdpzawfONQN252xwd8YN2ZcuzfQOM7Zpm3xJTMPaE7Vs0HmhoT4IrSlgUpqyLqpTptX0SR9ZXYNdlhOQVAKDALIiAvucAF5FNokdjVyqahBN9u2YuiZo%2Fcw4kJFochvtnfgNwcE9fCgE4Azy7EmZrOsU0q9Zrbs12tJlaGNIBd8NqDEmGB1AYMG4NILbPxtLkJPzwt02j%2Bn%2FiJSy9RoExub3KThMRTbBCMLbkEl%2B%2FFKVKSgOFTib%2Fyt5oxiDJREYE4lgld4R2LbaNe6ynJoMHV2A%3D%3D",
        "https://storage.googleapis.com/torq-f0c17.appspot.com/post-pictures%2Fsuz2.jpg_1521484585204?GoogleAccessId=firebase-adminsdk-0xtd9@torq-f0c17.iam.gserviceaccount.com&Expires=16447017600&Signature=z1pf9J7VedKCCsjnEGPnbGjsSsz5Rkz8MfDMcWcyHjOnkWUeMp7b%2F%2BPRy4NGo%2BJ8887NNp54nRXRZsCkXn0a9wlc1bK0S09vMPHamMVwEVR%2BrESEISXv5VjgalHSeNsBUY4lCtS%2FMGZtmme07SNGCeQmgTFETUGaGtrumetnkDdJJCYth%2FkWpCVLGsLhX3QUP8J%2BjgXzXvsD2JfuW77GKpOgRzSzOTSuJwyKZAoUjXBXUzyoVoqNfZLk%2FNK7HxBI%2BXGSKBe6s6snOOcXsziGL4FprgPXCeAcFTpqg6sDSB96yHVc9eXqcAuXL5pv96Lc3EkL0myWyw0TWdnj%2F2PimQ%3D%3D"
      ],
      0
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

// favorites format:
// post: string;
// user: string;

const getFavorites = () => 
  [
    [carPostIdMap.get('vanquish'), userIdMap.get('elon')],
    [carPostIdMap.get('vanquish'), userIdMap.get('geohotz')],
    [carPostIdMap.get('vanquish'), userIdMap.get('jamal')],
    [carPostIdMap.get('vanquish'), userIdMap.get('paul')],
    [carPostIdMap.get('vanquish'), userIdMap.get('emmanual')],
  ].map(arr => ({
    post: arr[0],
    user: arr[1],
  })) as INewCarPostFavoriteBuffer[];


// pins format:
// post: string;
// user: string;

const getPins = () => 
  [
    [carPostIdMap.get('vanquish'), userIdMap.get('elon')],
    [carPostIdMap.get('vanquish'), userIdMap.get('geohotz')],
  ].map(arr => ({
    post: arr[0],
    user: arr[1],
  })) as INewCarPostPinBuffer[];

// comments format:
// post: string;
// commenter: string;
// body: string;

const getComments = () =>
  [
    [
      carPostIdMap.get('vanquish'),
      userIdMap.get('elon'),
      'Cool @charles, but you should\'ve bought a Tesla instead. I thought we were tight ):',
    ],
    [
      carPostIdMap.get('vanquish'),
      userIdMap.get('geohotz'),
      'Nah dude, just buy an acura and slap a comma ai pilot on there, it\'s only $300!'
    ]
  ].map(arr => ({
    post: arr[0],
    commenter: arr[1],
    body: arr[2],
  })) as INewCarPostCommentBuffer[];

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

  for (const pin of getPins()) {
    console.log('[+] adding pin =>', pin);
    await CarPostPinService.create(pin);
  }

  for (const favorite of getFavorites()) {
    console.log('[+] adding favorite', favorite);
    await CarPostFavoriteService.create(favorite)
  }

  for (const comment of getComments()) {
    console.log('[+] adding comment =>', comment);
    await CarPostCommentService.create(comment);
  }

  process.exit(0);
})()
