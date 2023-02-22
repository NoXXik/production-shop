const {Product, Category} = require('../models/models');
const sequelize = require("../database/database");
const { sqlReq } = require("./categoryController");

// title: {type: DataTypes.STRING},
// price: {type: DataTypes.FLOAT},
// filters: {type: DataTypes.JSONB}

class ProductController {
    async create2 (req, res, next) {
        try {
            const {title, price, filters, category_name} = req.body
            console.log(filters)
            if (typeof(filters) != 'object') {
                return res.status(400).json({message: 'Фильтры не указаны'})
            }
            await Product.create({title, price, product_filters: filters, category_name})
            return res.json({message: 'Product created'})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    async create (req, res, next) {
        try {
            const data = req.body
            // console.log(filters)
            // if (typeof(filters) != 'object') {
            //     return res.status(400).json({message: 'Фильтры не указаны'})
            // }
            await Product.create(data)
            return res.json({message: 'Product created'})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: e})
        }
    }

    async getProductsSimple (req, res, next) {
        try{
            const response = await Product.findAll()
            const products = response
            return res.json({product: products})
        } catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    async getProducts(req, res, next) {
        try{
            // const queryes = {category: 'kamery-ip-videonablyudeniya', price: [0, 500], limit: '12', offset: '0', sort: ['title', 'desc'], filters: [[{key: 'cvet', value: 'chernyy'}], [{key: 'brend', value: 'optimus'}]]}
            // const queryes = {category: 'kamery-ip-videonablyudeniya'}
            console.log(req.body, req.body.filters[0])
            let {category, price, limit, offset, sort, filters} = req.body
            limit = limit || 12
            offset = offset || '0'
            sort = sort || ['id', 'desc']
            // map((filter, id) => `${id > 0 ? ' OR ' : ''}product_filters->'${filter.key}'='"${filter.value}"'`).join('')})`: ''
            let sqlString = `WITH prods AS
                (select * from products where ${category && `products.category_name = '${category}'`} 
                ${price ? `AND (price > ${price[0]} AND price < ${price[1]})`: ''} 
                ${(filters && filters.length > 0) 
                    ? `AND (
                        ${filters.map((filter, id) => `${id > 0 ? 'AND ': ''}(${filter.map((fil, id) => `${id>0 ? ' OR ': ''}${`product_filters->'${fil.key}'='"${fil.value}"'`}`).join('')})`).join(' ')}
                    )`
                    : ''}),
                filters AS (select key,value, COUNT(*) from prods, jsonb_each_text(prods.product_filters) GROUP BY key, value),
                out_prods AS (select * from prods ${sort && `order by ${sort[0]} ${sort[1]}`} ${limit && `limit ${limit}`} ${offset && `offset ${offset}`})
                select jsonb_build_object('count', (select count(*) from prods), 'products', (select array_to_json(array_agg(row_to_json(out_prods))) from out_prods), 'filters', (select array_to_json(array_agg(row_to_json(filters))) from filters))`
            console.log(sqlString)
            const products = await sequelize.query(sqlString)
            return res.json(products[0][0].jsonb_build_object)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: e.message})
        }
    }


    async searchProduct(req, res, next) {
        try{
            const {request} = req.query
            console.log('request',  request)
            let sqlString = `SELECT *
            FROM products
            WHERE title @@ to_tsquery('${request}:*')`
            const products = await sequelize.query(sqlString)
            return res.json(products[0])

        } catch(err) {
            console.log(e)
            return res.status(500).json({message: e.message})
        }
    }

    async getProducts2(req, res, next) {
        try{
            const {category, limit, offset, sort, filters, lastFilter} = getRequestData(req)
            console.log(category, limit, offset, sort, filters, lastFilter)
            let sqlString = `WITH prods AS
                (select * from products where ${category && `products.category_name = '${category}'`} 
                ${(filters && filters.length > 0) 
                    ? `AND (
                        ${filters.map((filter, id) => `${id > 0 ? 'AND ': ''}(${filter.map((fil, id) => `${id>0 ? ' OR ': ''}${`product_filters->'${fil.key}'='"${fil.value}"'`}`).join('')})`).join(' ')}
                    )`
                    : ''}),
                filtersS AS (select key,value, COUNT(*) from prods, jsonb_each_text(prods.product_filters) GROUP BY key, value),
                out_prods AS (select * from prods ${sort ? `order by ${sort[0]} ${sort[1]}`: ''} ${limit ? `limit ${limit}`: ''} ${offset ? `offset ${offset}`: ''}),
                ft AS (select title, value as values, translit from filters, json_array_elements(filters."values"))
                select jsonb_build_object('count', (select count(*) from prods), 'products', (select array_to_json(array_agg(row_to_json(out_prods))) from out_prods), 'filters', (select array_to_json(array_agg(row_to_json(filtersS))) from filtersS), 'mainFilters', (select array_to_json(array_agg(row_to_json(ft))) from ft))`
            const response = await sequelize.query(sqlString)

            // products = {count, filters, mainFilters, products}
            const products = response[0][0].jsonb_build_object
            if(!products.products){
                return res.json({count: 0, products: [], filters: []})
            }

            const readyFilters = getResFilters(products.filters, products.mainFilters, fixArray(filters), lastFilter)


            console.log(readyFilters)
            return res.json({count: products.count, products: products.products, filters: readyFilters})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: e.message})
        }
    }
}

module.exports = new ProductController()


// params: req.query
function getReqFilters(query) {
    let filterKeys = Object.keys(query).filter((key) => key[0] == "_")
    let dataFilters = []
    if (filterKeys) {
    for (let i = 0; i < filterKeys.length; i++) {
      if (typeof query[filterKeys[i]] === "object") {
        // console.log('array', query[filterKeys[i]])
        let out = []
        const values = query[filterKeys[i]]
        values.map((val) =>
          out.push({ key: filterKeys[i].replace("_", ""), value: val })
        );
        dataFilters.push(out);
        } else {
            dataFilters.push([
            { key: filterKeys[i].replace("_", ""), value: query[filterKeys[i]] },
            ]);
        }
        }
    }
    return dataFilters
}


function getRequestData(req) {
    const category = req.params.category
    const lastFilter = req.body.lastFilter
    if(!lastFilter){
        console.log('lastFilter is null')
    } else {
        console.log(lastFilter)
    }
    let {limit, page, sort} = req.query
    limit = limit | '21'
    page = page | '1'
    offset = (page * limit) - limit | '0'
    if (sort) {
        sort = sort.split("_")

    } else {
        sort = sort = ['id', 'asc']
    }
    const filters = getReqFilters(req.query)
    return {category, limit, offset, sort, filters, lastFilter}
}

function fixArray(reqFilters/*: IReqFilters[][]*/) {
    let merged = []
    merged = merged.concat.apply(merged, reqFilters);
    return merged
}

function getResFilters(productFilters/*: IProductFilters[]*/, mainFilters/*: IMainFilters[]*/, reqFilters/*: IReqFilters[]*/, lastFilter/*: IReadyFilter | null*/)/*: IReadyFilter[]*/ {
    let filterArray = []
    for(let j = 0; j < mainFilters.length; j++) {
        for(let i = 0; i < productFilters.length; i++ ) {
            if(productFilters[i].key === mainFilters[j].translit && productFilters[i].value === mainFilters[j].values.value_translit){
                filterArray.push({title: mainFilters[j].title, translit: mainFilters[j].translit, filter: {title: mainFilters[j].values.value_title, translit: mainFilters[j].values.value_translit, count: productFilters[i].count, checked: false}})
            }
        }
    }
    for(let i = 0; i < filterArray.length; i++) {
        for(let j = 0; j < reqFilters.length; j++) {
            if(filterArray[i].translit === reqFilters[j].key && filterArray[i].filter.translit === reqFilters[j].value) {
                filterArray[i].filter.checked = true
            }
        }
    }
    let readyFilters = []
    let g = 0
    readyFilters.push({title: filterArray[0].title, translit: filterArray[0].translit, filters: [filterArray[0].filter]})
    for(let i = 1; i < filterArray.length; i++) {
        if(filterArray[i].title !== readyFilters[g].title) {
            g++
            readyFilters.push({title: filterArray[i].title, translit: filterArray[i].translit, filters: [filterArray[i].filter]})
        } else if(filterArray[i].title === readyFilters[g].title){
            readyFilters[g].filters.push(filterArray[i].filter)
        }

    }
    if(lastFilter) {
        for(let i = 0; i < readyFilters.length; i++) {
            if(readyFilters[i].translit === lastFilter.translit){
                readyFilters[i] = lastFilter
            }
        }
    }
    return readyFilters
}


// interface IProductFilters {
//     key: string;
//     count: number;
//     value: string;
// }
// interface IMainFilters {
//     title: string;
//     values: {
//         value_title: string;
//         value_translit: string;
//     };
//     translit: string;
// }

// interface IReqFilters {
//     key: string;
//     value: string;
// }

// interface IReadyFilter {
//   title: string;
//   translit: string;
//   filters: Filter[];
// }

// interface Filter {
//   title: string;
//   translit: string;
//   count: number;
//   checked: boolean;
// }


// =============================
// WITH prods AS(
// select * from mock_data where data->'cvet' = '"Indigo"' ),
// filters AS (select key,value, COUNT(*) from prods, jsonb_each_text(prods.data) GROUP BY key, value),
// out_prods AS (select * from prods order by id desc limit 5 offset 10)
// select jsonb_build_object('products', (select array_to_json(array_agg(row_to_json(out_prods))) from out_prods), 'filters', (select array_to_json(array_agg(row_to_json(filters))) from filters))



// для вывода всех индексов
// select *
// from pg_indexes
// where tablename not like 'pg%';


// explain analyse WITH prods AS
//                 (select * from products where products.category_name = 'kamery-ip-videonablyudeniya'
//
//                 ),
//                 filters AS (select key,value, COUNT(*) from prods, jsonb_each_text(prods.product_filters) GROUP BY key, value),
//                 out_prods AS (select * from prods order by id desc limit 12 offset 0)
//                 select jsonb_build_object('count', (select count(*) from prods), 'products', (select array_to_json(array_agg(row_to_json(out_prods))) from out_prods), 'filters', (select array_to_json(array_agg(row_to_json(filters))) from filters))




// Добавление товара

// INSERT into products (id,
//     title,
//   meta_title,
// title_translit,
// vendor_code,
// description,
// meta_description,
// category_name,
// product_filters,
// images,
// currently_price,
// stock_count,
// stock_status,
// characteristics,
// files,
// discount,
// new_label,
// hit_label,
// "createdAt",
// "updatedAt",
// "categoryId")

// VALUES('7c84fb90-12c4-11e1-840d-7b35c4ee775a',
// 'Видеокамера Optimus 2.8',
// 'Купить IP видеокамеру Optimus 2.8 в Казани',
// 'videokamera-optimus-2-8',
// '2345164',
// 'Product description ....',
// 'Meta description',
// 'kamery-ip-videonablyudeniya',
// '{"cvet": "belyy"}',
// '{"image-name-1", "image-2"}',
// 1596.0,
// 10,
// 'В наличии',
// '[{"title": "Cvet", "value": "Belyy"}]',
// '{"file-name-1", "file-name-2"}',
// '{"discount": 12, "expirationDate": "2023-02-05 15:00:01.244+03", "param": "percent"}',
// true,
// false,
// '2022-12-21 15:00:01.244+03',
// '2022-12-21 15:00:01.244+03',
// 2
// )
