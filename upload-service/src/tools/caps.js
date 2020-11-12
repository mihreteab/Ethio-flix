class Cap {
  version = null;
  uri = null;
  desc = 'write capability description';
  type = 'INTERNAL';
}

function filter_caps(list){
  let cap;
  let caps = [];

  for(let i=0; i<list.length; i++){
    let cap = new Cap();
    
    /*FIXME: easier way for this*/
    cap.desc = list[i].desc;
    cap.uri = list[i].uri;
    cap.version = list[i].version;
    cap.catagory = list[i].catagory;
    cap.type = list[i].type;

    caps.push(cap);
  }

  return caps;
}

const CAP = {
  filter_caps:	filter_caps,
};

export default CAP
