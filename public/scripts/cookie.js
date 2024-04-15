function getCookie(k){
  let s=k+"=";
  let p=document.cookie.indexOf(s); 
  if( p>0 ) {
    p=document.cookie.indexOf(' '+s);  
  }
  if( p>=0 ) {
    if(p>0){
      p++;
    }
    p+=s.length;  
    let q=document.cookie.indexOf(";", p);
    return (q<0)?document.cookie.substring(p): document.cookie.substring(p, q); 
  } 
  return null;
}