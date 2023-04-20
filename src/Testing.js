import React, { useState,useEffect } from 'react';
import "./components/admincomponents/componentscss/modal.css"
// import { offRoute } from 'browser-router';

const ButtonWithModal = ({ Data, markedData, addheading }) => {
  


function mergeArrays(A, B) {
    let merged = [...B];
    merged.shift();
    for (let i = 0; i < A.length; i++) {
      let found = false;
      for (let j = 0; j < B.length; j++) {
        if (A[i].head1 === B[j].head1 && A[i].head2 === B[j].head2 && A[i].unit === B[j].unit) {
          found = true;
          break;
        }
      }
      if (!found) {
        merged.push(A[i]);
      }
    }
    return merged;
  }

const mergearrayx=(A,B)=>{
  let merged=[];
  // let merged2=[];
  for(let i=0;i<A.length;i++){
    for(let j=0;j<B.length;j++){
      if(A[i].head1===B[j].head1 && A[i].head2===B[j].head2 && A[i].unit===B[j].unit){
        merged.push(A[i]);
        // merged2.push(i+1);
        break;
      }
    }
   
  }
  return merged;
}

  // console.log('data',Data,"marked",markedData);
  const [data,setdata]=useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [added,setAdded]=useState([]);
  // const [newselected,setnewSelected]=useState([]);
  const [removed,setRemoved]=useState([]);
  const [prevadded,setPrevAdded]=useState([]);
  const [prevremoved,setPrevRemoved]=useState([]);

  const orderSelected = (data, selected) => {
    const orderedSelected = [];
    var i=0;
    data.forEach((item) => {
      // console.log("aaaaaaaaaaa",i,"eeeeeeee",item);
      i=i+1;
      const index = selected.findIndex((selectedItem) =>
      // console.log("uuuuuuuuu",i,"seeeeeeeeee",selectedItem)
        selectedItem.head1 === item.head1 &&
        selectedItem.head2 === item.head2 &&
        selectedItem.unit === item.unit
      );
      // console.log("index",index)
      if (index !== -1) {
        orderedSelected.push(selected[index]);
      }
    });
    return orderedSelected;
  };

  useEffect(() => {
   setdata(mergeArrays(Data,markedData));

   setSelected(orderSelected(Data,markedData));

  }, [Data,markedData])


  // console.log("selected",selected);

const toggleModal = () => {
    // console.log("selected222",selected);
    setShowModal(!showModal);
    if (!showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  };

 
const handleSelect = (index,dat) => {
    const addedObj = dat[index];
    const indexInadded = added.findIndex((obj) => (
      obj.head1 === addedObj.head1 &&
      obj.head2 === addedObj.head2 &&
      obj.unit === addedObj.unit
    ));
  const indexInselecteded = selected.findIndex((obj) => (
    obj.head1 === addedObj.head1 &&
    obj.head2 === addedObj.head2 &&
    obj.unit === addedObj.unit
  ));

    // console.log("index",index);
    // console.log("indexInSelectes",indexInadded);
 if(indexInselecteded===-1){
    if (indexInadded === -1) {
      // setAdded([...added,addedObj]);
      // const indexInselecteded = selected.findIndex((obj) => (
      //   obj.head1 === addedObj.head1 &&
      //   obj.head2 === addedObj.head2 &&
      //   obj.unit === addedObj.unit
      // ));
      // if (indexInselecteded === -1) {
      setAdded([...added, addedObj]);
      // }

    } else {
      const newadded = [...added];
      newadded.splice(indexInadded, 1);
      setAdded(newadded);
    }
  }
  else{
      const indexInRemoved = removed.findIndex((obj) => (
        obj.head1 === addedObj.head1 &&
        obj.head2 === addedObj.head2 &&
        obj.unit === addedObj.unit
     ));

       if(indexInRemoved===-1 ){
       // if (indexInadded === -1){
       setRemoved([...removed,addedObj]);
       // }
       }
       else{
         const newadded = [...removed];
         newadded.splice(indexInRemoved, 1);
         setRemoved(newadded);
      }

  }
};


const setModalOffAndModalOverFlow=()=>{

   setShowModal(!showModal);
  //  console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttt")
    document.body.classList.remove('modal-open');
      setAdded(prevadded);
      setRemoved(prevremoved);
  }

function removeElementsFromArray(A, B) {
    // console.log("removedaaaaaaaaaaaaarrrrrrrrrrrrr",A,B)
    return A.filter(a => {
      // Check if any element in array B has the same "head1", "head2", and "unit" properties
      const found = B.some(b => a.head1 === b.head1 && a.head2 === b.head2 && a.unit === b.unit);
      // If not found, keep this element in array A
      return !found;
    });
  }

const Colouredcards=(selected, added, removed)=>{
    // let array1=[];
    let array1 = removeElementsFromArray(selected,removed);
    return array1.concat(added);
  }

  function compareArrays(prev, curr) {
    // console.log("prev",prev,"curr",curr,dis)
    // Convert the arrays to maps with keys based on head1, head2, and unit
    const prevMap = new Map(prev.map(obj => [obj.head1 + obj.head2 + obj.unit, obj]));
    const currMap = new Map(curr.map(obj => [obj.head1 + obj.head2 + obj.unit, obj]));

    // Check that every object in curr is also in prev with the same head1, head2, and unit
    for (const [key, currObj] of currMap.entries()) {
      const prevObj = prevMap.get(key);
      if (!prevObj || prevObj.head1 !== currObj.head1 || prevObj.head2 !== currObj.head2 || prevObj.unit !== currObj.unit) {
        return false;
      }
    }

    // Check that every object in prev is also in curr with the same head1, head2, and unit
    for (const [key, prevObj] of prevMap.entries()) {
      const currObj = currMap.get(key);
      if (!currObj || currObj.head1 !== prevObj.head1 || currObj.head2 !== prevObj.head2 || currObj.unit !== prevObj.unit) {
        return false;
      }
    }

    // If all checks passed, the arrays are considered equal
    return true;
  }

const toggleModal2 = (dat, selected, added,prevadded, removed,prevremoved) => {
    // console.log("adddddddddddddd", added);
    // console.log("selected222", selected);
  var checkprevadded = compareArrays(prevadded, added); 
  var checkprevremoved = compareArrays(prevremoved,removed);
  if (!checkprevadded){
    // console.log("adedddddddddddddddddddddd",prevadded,added);
    setPrevAdded(added);
  }
  if (!checkprevremoved){
    // console.log("removedddddddddddd",prevremoved,removed);
    setPrevRemoved(removed);
  }
  // offRoute();
    addheading(mergearrayx(dat, Colouredcards(selected, added, removed)));
    setShowModal(!showModal);
    if (!showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
};
  return (
    <div>
      <button className='add-button' onClick={toggleModal}>Add Set Points</button>
      {showModal && (
        <div className="modal-container" onClick={() => setModalOffAndModalOverFlow()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} >
          <h2>Select Set Points</h2>


          <div style={{ display: 'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center' }}>
            {data.map((obj, index) => (

              <div key={index}
                onClick={() => handleSelect(index,data)}
                style={{
                  width: "9%", margin: "15px", padding: "15px", textAlign: "center", border: "solid 1px black", borderRadius: "10px",
                  backgroundColor: (Colouredcards(selected, added, removed)).some((o) => (
                    o.head1 === obj.head1 &&
                    o.head2 === obj.head2 &&
                    o.unit === obj.unit
                  )) ? '#c8f4c8' : 'inherit'
                }}
              >

                <div>{obj.head1}</div>
                <div>{obj.head2}</div>
                <div>{obj.unit}</div>


              </div>))}
          </div>

            <button className='add-button' onClick={() => toggleModal2(data,selected,added,prevadded,removed,prevremoved)}>Save</button>
        </div>
        </div>
      )}
     
    </div>
  );
};

export default ButtonWithModal;




// give a js function in which i will give three array heading, removed(removed is subset of heading) and  added of json whose json structure is
// {
//   activity: "active",
//     attribute: "1",
//       head1: "305.2",
//         head2: "LT-01",
//           inuse: "N",
//             sensorname: "S1",
//               unit: "LTRS"
// }
// a state const [twoDArrayData, settowDArrayData] = useState([]);
// this state have jsons araay each element is like
// {
//   val: { activity: "active", attribute: "1", head1: "305.2", head2: "LT-01", inuse: "N", sensorname: "S1", unit: "LTRS" },
//   , dataofthatjson:an array
// }
// and a 2 - D array itterate the heading array an find the index where the first element json  of removed array is  present in the heading array and and store it in an array temp as json{
//   val:heading's that element ,dataofthatjson:an array of all the index+1 element of each row of 2-D array} and remove index+1 element from each row of 2-D array do this for each element of removed array then itterate the added array and check in the twoDArrayData state that if any one of the element(which is a json of structure {val:{activity:"active",attribute:"1",head1:"305.2",head2:"LT-01",inuse:"N",sensorname:"S1",unit:"LTRS"},
//     , dataofthatjson:an array
// }) of this array val key value i equal to first element of added array if yes then 
// to each row of 2 - D array add values of dataofthatjson array's value that is 0th element to end of 0th row of 2-D array and 1th element to end of 1th row of 2-D array (here dataofthatjson  array's value is the value of the key dataofthatjson of the element whose val key value is equal to first element of added array) else add - to end of each row
// push temp array to twoDArrayDatathat update this state settowDArrayData([...twoDArrayDatathat, ...temp]);


// function updateTwoDArrayData(heading, removed, prevremoved, prevadded, added, twoDArrayData, settowDArrayData) {
//   const temp = [];
//   const headingSet = new Set(heading);

//   // Process removed-prevremoved array
//   const removedSet = new Set(removed);
//   const prevremovedSet = new Set(prevremoved);
//   const filteredRemoved = removed.filter(val => !prevremovedSet.has(val));
//   filteredRemoved.forEach(val => {
//     const index = heading.indexOf(val);
//     if (index !== -1) {
//       const dataofthatjson = twoDArrayData.map(row => row.dataofthatjson[index]);
//       twoDArrayData.forEach((row, rowIndex) => {
//         row.dataofthatjson.splice(index, 1);
//       });
//       temp.push({ val, dataofthatjson });
//     }
//   });

//   // Process prevadded-added array
//   const prevaddedSet = new Set(prevadded);
//   const addedSet = new Set(added);
//   const filteredAdded = added.filter(val => !prevaddedSet.has(val));
//   filteredAdded.forEach(val => {
//     const index = heading.indexOf(val);
//     if (index !== -1) {
//       const matchingElement = twoDArrayData.find(element => element.val.head1 === val.head1 && element.val.head2 === val.head2 && element.val.unit === val.unit);
//       if (matchingElement) {
//         twoDArrayData.forEach(row => {
//           row.dataofthatjson.push(matchingElement.dataofthatjson[row.dataofthatjson.length]);
//         });
//       } else {
//         const newDataOfThatJson = new Array(twoDArrayData.length).fill("-");
//         twoDArrayData.forEach((row, rowIndex) => {
//           row.dataofthatjson.push(newDataOfThatJson[rowIndex]);
//         });
//       }
//     }
//   });

//   // Process prevremoved-removed array
//   const filteredPrevremoved = prevremoved.filter(val => !removedSet.has(val));
//   filteredPrevremoved.forEach(val => {
//     const index = heading.indexOf(val);
//     if (index !== -1) {
//       const newDataOfThatJson = new Array(twoDArrayData.length).fill("-");
//       twoDArrayData.forEach((row, rowIndex) => {
//         row.dataofthatjson.splice(index, 0, newDataOfThatJson[rowIndex]);
//       });
//     }
//   });

//   // Update the state with the new data
//   settowDArrayData([...twoDArrayData, ...temp]);
// }


// give a js function in which i will give five array heading, removed, prevremoveed, prevadded, and  added of json whose json structure is
// {
//   activity: "active",
//     attribute: "1",
//       head1: "305.2", +
//         head2: "LT-01",
//           inuse: "N",
//             sensorname: "S1",
//               unit: "LTRS"
// }
// a state const [twoDArrayData, settowDArrayData] = useState([]);
// this state have jsons araay each element is like
// {
//   val: { activity: "active", attribute: "1", head1: "305.2", head2: "LT-01", inuse: "N", sensorname: "S1", unit: "LTRS" },
//   , dataofthatjson:an array
// }
// and a 2 - D array itterate the heading array an find the index where the first element json  of removed - prevremoved(here removed - prevremoved mean all element of removed that are not present in prevremoved array)is  present in the heading array and and store it in an array temp as json{
//   val:heading's that element ,dataofthatjson:an array of all the index+1 element of each row of 2-D array} and remove index+1 element from each row of 2-D array do this for each element of removed-prevremoved array  simillary do for (prevadded-added) array (here prevadded-added mean all element of prevadded arrau that are not present in added array ) then itterate the added array and check in the twoDArrayData state that if any one of the element(which is a json of structure {val:{activity:"active",attribute:"1",head1:"305.2",head2:"LT-01",inuse:"N",sensorname:"S1",unit:"LTRS"},
//     , dataofthatjson:an array
// }) of this array val key value i equal to first element of added - prevadded array(here added - prevadded mean all element of added array that are not present in prevadded) if yes then 
// to each row of 2 - D array add values of dataofthatjson array's value that is 0th element to end of 0th row of 2-D array and 1th element to end of 1th row of 2-D array (here dataofthatjson  array's value is the value of the key dataofthatjson of the element whose val key value is equal to first element of added array) else add - to end of each row simillarly do for prevremoved - removed array(here prevremoved - removed mean all element of prevremoved array that are not present in removed array) 
// push temp array to twoDArrayDatathat update this state settowDArrayData([...twoDArrayDatathat, ...temp]);