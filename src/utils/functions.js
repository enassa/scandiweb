
export const getAsObjectFromLocalStorage = (index) => {
  try{
    const serializedData  = localStorage.getItem(index) 
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
    }catch (err) {
      return err;
    }
}
export const  saveObjectInLocalStorage = (key, value) => {
  try{
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);    
  }catch (err){
      return err;
  }
}

export const checkIfFetched = (categoryName, store) => {
    let producsBag = store.getState();
    if(producsBag.categoryName !== undefined) {
        return true
    }
    else{
        return false
    }
}

export const  readyForMapping = (array) => {
  //If it's not an array, return FALSE.
  if (!Array.isArray(array)) {
      return false;
  }
  //If it is an array, check its length property
  if (array.length === 0) {
      //Return TRUE if the array is empty
      return false;
  }
  //Otherwise, return FALSE.
  return true;
}