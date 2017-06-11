function compare(str1, str2){
  str1 = str1.toUpperCase();
  str2 = str2.toUpperCase();
  n = str1.length < str2.length ? str1.length : str2.length;
  var i = 0;
  while(i < n){
    if(str1.charCodeAt(i) != str2.charCodeAt(i))
      return str1.charCodeAt(i) - str2.charCodeAt(i);
    else
      i++;
  }
  return (str1.length == str2.length) ? (str1.length == n ? 0 : 1) : (str1.length == n ? -1: 1);
}

function mergeSort(arr, id, mode){
    if (arr.length < 2)
        return arr;
    var middle = parseInt(arr.length / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle, arr.length);
    return merge(mergeSort(left, id, mode), mergeSort(right, id, mode), id, mode);
}

function merge(left, right, id, mode){
  var result = [];
  while (left.length && right.length){
    if (compare(left[0][id], right[0][id]) < 0)
      mode == 'asc' ? result.push(left.shift()) : result.push(right.shift());
    else
      mode == 'dsc' ? result.push(left.shift()) : result.push(right.shift());
  }
  while (left.length)
    result.push(left.shift());
  while (right.length)
    result.push(right.shift());
  return result;
}

function sortAsc(arr, id){
  return mergeSort(arr, id, 'asc');
}

function sortDsc(arr, id){
  return mergeSort(arr, id, 'dsc');
}

function search(arr, id, searchItem){
  for(var i = 0; i < arr.length; i++){
    if(compare(arr[i][id].trim(), searchItem.trim()) == 0)
      return i;
  }
  return -1;
}
