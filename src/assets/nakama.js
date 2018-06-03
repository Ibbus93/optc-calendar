/*$(document).ready(function () {
  let optcdb_json = window.drops.Fortnight;

  let jjj = false;

  let elements = $("#fortnight-list");

  console.log(elements);

  for(i=0;i<optcdb_json.length;i++){

    console.log('asdads');

    // if(optcdb_json[i].name === ){
    //   var linkNakama = 'https://www.nakama.network/stages/' + optcdb_json[i].nakama +  '/details/';
    //   $("#" + fn.id).attr('href',  linkNakama);
    //   jjj = true;
    //   break;
    // }
  }

  // if(jjj){
  //   $("#" + fn.id).attr('display', 'block');
  // } else {
  //   $("#" + fn.id).attr('display', 'none');
  // }
});*/

function linkingNakama(title) {
  let optcdb_json = window.drops.Fortnight;
  let jjj = false;
  let linkNakama;

  for(i=0;i<optcdb_json.length;i++){
    if(optcdb_json[i].name === title){
      linkNakama = 'https://www.nakama.network/stages/' + optcdb_json[i].nakama +  '/details/';
      console.log(linkNakama);
      jjj = true;
      break;
    }
  }

  return linkNakama;
}
