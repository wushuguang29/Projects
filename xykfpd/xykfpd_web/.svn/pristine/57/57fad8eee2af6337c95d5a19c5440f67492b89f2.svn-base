import typeData from './typeData.js'
export default{
    idToName:function(row, column,module,key){
        var string;
        var data = row[column.property];
        let list = typeData[module][key];
        list.forEach(item => {
            if(data==item.id){
                string= item['name'];
            }
        })
        return string;
    },

    
    
}
