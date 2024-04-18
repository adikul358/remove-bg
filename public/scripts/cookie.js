function getCookie(cookieName){
  let defSubstr = cookieName + "=";
  let defSubstrIdx = document.cookie.indexOf(defSubstr); 
  if (defSubstrIdx > 0) {
    defSubstrIdx = document.cookie.indexOf(' ' + defSubstr);  
  }
  if (defSubstrIdx >= 0) {
    if (defSubstrIdx > 0) {
      defSubstrIdx++;
    }
    defSubstrIdx += defSubstr.length;  
    let valSubStrIdx = document.cookie.indexOf(";", defSubstrIdx);
    return ( valSubStrIdx < 0 ) 
      ? document.cookie.substring(defSubstrIdx) 
      : document.cookie.substring(defSubstrIdx, valSubStrIdx); 
  } 
  return null;
}