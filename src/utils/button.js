const increaseValue=()=> {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
  return(value);
}

const decreaseValue=()=> {
  var value = parseInt(document.getElementById('number').value, 10);
  if(value>0)
  {
      value--;
  }
  else
  {
      value=0;
  }

  document.getElementById('number').value = value;

  return(value)
}
export {increaseValue,decreaseValue};