//import library dependencies
import moment from 'moment'

//import factory modules
import makeCreateMovie from "./create_movie";
import makeFindMovie from "./find_movie";
import makeModifyMovie from "./modify_movie";
import makeRemoveMovie from "./remove_movie";

//import code dependencies
import Movie from "../../entity/movie";
import { movieDB } from "../../datastore/db/index";
import { generateId } from "../../tools/utils";

//dependency injection
const createMovie = makeCreateMovie({ movieDB, Movie, generateId, moment });
const findMovie = makeFindMovie({ movieDB });
const modifyMovie = makeModifyMovie({ movieDB });
const removeMovie = makeRemoveMovie({ movieDB });

export default {
  createMovie,
  findMovie,
  modifyMovie,
  removeMovie,
};
