//=====================================================================
// 
//  Filename: index.js
//  Date: October 4, 2020
//
//  Description:
//      BrickLink API: Inventory to CSV download
//
//  Original Author:
//      lynexer (https://github.com/lynexer)
// 
//=====================================================================

const OAuth = require('oauth');
const { Parser } = require('json2csv');
const fs = require('fs');

var oauth = new OAuth.OAuth('', '', 'YOUR CONSUMER KEY', 'YOUR CONSUMER SECRET', '1.0', null, 'HMAC-SHA1');
const fields = [{
    label: 'Item Name',
    value: 'item.name'
}, {
    label: 'Colour',
    value: 'color_name'
}]

oauth.get('https://api.bricklink.com/api/store/v1/inventories', 'YOUR TOKEN VALUE', 'YOUR TOKEN SECRET', function(error, data, res) {
    if (error) console.error(error);

    var obj = JSON.parse(data);

    toCSV(obj.data);
});

function toCSV(data) {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    fs.writeFileSync('inventory.csv', csv);
}

//======== ALL FIELDS FROM BRICKLINK ========\\
// inventory_id
// item
//      item.no
//      item.name
//      item.type
//      item.category
// color_id
// color_name
// quantity
// new_or_used
// unit_price
// bind_id
// description
// remarks
// bulk
// is_retain
// is_stockroom
// date_created
// my_cost
// sale_rate
// tier_quantity1
// tier_price1
// tier_quantity2
// tier_price2
// tier_quantity3
// tier_price3
// my_weight