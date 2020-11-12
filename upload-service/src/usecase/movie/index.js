//import library dependencies
import moment from 'moment'

//import factory modules
import makeSaveMovieFile from "./save_movie_file";
import makeFindMovie from "./find_movie";
import makeModifyMovie from "./modify_movie";
import makeRemoveMovie from "./remove_movie";

//import code dependencies
import encoder from "../../drivers/encoder/index";

//dependency injection
const saveMovieFile = makeSaveMovieFile({ encoder });
// const findMovie = makeFindMovie({ movieDB });
// const modifyMovie = makeModifyMovie({ movieDB });
// const removeMovie = makeRemoveMovie({ movieDB });

export default {
  saveMovieFile,
};
