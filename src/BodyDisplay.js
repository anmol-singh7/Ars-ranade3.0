import React, { useState, useEffect } from 'react';

function Bodytable({ headi2, bodydata, body, atList, filt, mindateandtime, maxdateandtime, visib, Setfilter2 }){
  console.log(headi2, bodydata, body, atList, filt, mindateandtime, maxdateandtime, visib, Setfilter2);
  // console.log("filtersssssssssssssss",filt);
  const [bodyy,setBody]=useState([]);
  const [filters,setFilters]=useState(filt);
  const [minDateandTime, setMinDateAndTime] = useState(mindateandtime);
  const [maxDateandTime, setMaxDateAndTime] = useState(maxdateandtime);



  useEffect(() => {
    setMinDateAndTime(mindateandtime);
    setMaxDateAndTime(maxdateandtime);
    setBody(body);
  }, [body,filters]);

const bodyindex = (row, attribute, atlist) => {
    const index = atlist.indexOf(attribute);
    if (index === -1) {
       if (attribute === "firstelement") {
          return row[0];
         }
         return "-";
     }
       else {
        return row[index];
       }
  };

const filteredBody = (row, filters, atList,headi2,index) => {
         const tempatlist=atList;
        tempatlist[0]='firstelement';
          var w=false
      for(let j = 0; j < headi2.length; j++) {
        if(j===0){
          const len = String(filters[headi2[j].attribute].maxval).length
          if ((String(filters[headi2[j].attribute].maxval) !== "") && (String(row[tempatlist.indexOf(headi2[j].attribute)]).substring(0, len) > String(filters[headi2[j].attribute].maxval)) ) {
            return false;
          }
          if ((String(filters[headi2[j].attribute].minval) !== "") && (String(row[tempatlist.indexOf(headi2[j].attribute)]) < String(filters[headi2[j].attribute].minval)) ) {
            return false;
          } 
        }
        else{
          if ((String(filters[headi2[j].attribute].maxval) !== "") && (Number(row[tempatlist.indexOf(headi2[j].attribute)]) > Number(filters[headi2[j].attribute].maxval))) {
             return false;
        }  
          if ((String(filters[headi2[j].attribute].minval) !== "") && (Number(row[tempatlist.indexOf(headi2[j].attribute)]) < Number(filters[headi2[j].attribute].minval))) {
             return false;
        } 
      }
   }
  return true;
}

const bodytable = (row, headi2, atlist, filters,index) => {
  // console.log("fffffffffffffffffffffff",filters);
  const w = filteredBody(row, filters, atlist,headi2,index);
  if(w){
      return (<tr className="finalformcreate-tr">
        {headi2.map((head, index) =>
          <td className="finalformcreate-td" >{bodyindex(row, head.attribute, atList)}</td>)}
      </tr>);
  }
  else{
    return <></>
  }
}
  
const showfilvalue = (attri,filters) => {
    return filters.attri;
  }

const handelMaxFiltersChange = (e, filters, attribute) => {
    e.preventDefault();
    const { name, value } = e.target;    
    const minfi=filters[attribute].minval
    setFilters({ ...filters, [name]: {maxval:value,minval:minfi} });
    if(visib==="EDIT"){
      const tempt = { ...filters, [name]: { maxval: value, minval: minfi } };
      Setfilter2(tempt);
    }
  };

  const handelMinFiltersChange = (e, filters, attribute) => {
    e.preventDefault();
    const { name, value } = e.target;
    const maxfi = filters[attribute].maxval;
    setFilters({ ...filters, [name]: { maxval: maxfi, minval: value } });
    if(visib==="EDIT"){
    const tempt = { ...filters, [name]: { maxval: maxfi, minval: value } };
    Setfilter2(tempt);
    }
  };
  
  const minfilters = () => {
    return (
      < tr className="finalformcreate-tr" >
        {headi2.map((header, col) =>
          <td>
            <input
              htmlFor={header.attribute}
              type="text"
              id={header.attribute}
              name={header.attribute}
              value={showfilvalue(header.attribute, filters)}
              onChange={(e) => handelMinFiltersChange(e, filters, header.attribute)}
            />
          </td>

        )}
      </tr>)

  };


  const maxfilters = () => {
    return (
      < tr className="finalformcreate-tr" >
        {headi2.map((header, col) =>
          <td>
            <input
              htmlFor={header.attribute}
              type="text"
              id={header.attribute}
              name={header.attribute}
              value={showfilvalue(header.attribute,filters)}
              onChange={(e) => handelMaxFiltersChange(e, filters, header.attribute)}
            />
          </td>

        )}
      </tr>)

  };


return<>
     <tbody>
      {bodyy.map((row, index) => (
       bodytable(row, headi2, atList, filters,index)
       ))}
      </tbody >
 {visib!=="VIEW" && < tbody className = "finalformcreate-tbody" >
     {minfilters()}
     { maxfilters() }
  </tbody >}
  </>
};

export default Bodytable;



