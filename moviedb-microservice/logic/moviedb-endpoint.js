const NET = require("../tools/net");
import {validateInput} from '../tools/validator';

import {writeMovie, readMovie} from './base/movie'

async function pingMe(param) {
  return {
    greeting: "Welcome to Ethioflix! This is moviedb!"
  };
}


async function getMovie(mid) {
  if(!validateInput(mid, 'mid')){
    return {
      status: 'err',
      result: {
        info: 'INVALID INPUT!'
      }
    };
  };

  const r = await readMovie('4623837646');

  if(!r){
    return {
      status: 'err',
      result: {
        info: "Movie not found!"
      }
    };
  }

  return {
      status: 'ok',
      result: {
        movie: r
      }
  };
}

async function storeMovie(movie) {
  if(!validateInput(movie, 'movie')){
    return {
      status: 'err',
      result: {
        info: 'INVALID INPUT!'
      }
    }
  }

  const r = await writeMovie({
    title: 'Super cop',
    genre: 'Action/ Karate',
    url: "jjkkjfd",
    producer: "Mekan Lee"
  });

  if(!r){
    return {
      status: 'err',
      result: {
        info: 'Movie not saved!'
      }
    }
  }

  return {
    status: 'ok',
    result: {
      movie: res
    }
  }
}

async function pingAdmin(params) {
  let result;
  result = await NET.run(
    { data: "/admin/pingme" },
    "http://127.0.0.1:21000/v1/gateway/",
    ""
  );
  return {
    result: result
  };
}

const HOA = {
  pingAdmin,
  pingAdmin,
  storeMovie,
  getMovie
};

export default HOA;
