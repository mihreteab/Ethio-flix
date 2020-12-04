//import library dependencies
import moment from 'moment'

//import factory modules
import makeSaveMovieFile from "./save_movie_file";
import makeReadManifest from "./read_manifest";
import makeReadSegment from "./read_segment";
import makeModifyMovie from "./modify_movie";
import makeRemoveMovie from "./remove_movie";

//import code dependencies
import encoder from "../../drivers/encoder/index";
import fs from '../../tools/fs';

//dependency injection
const saveMovieFile = makeSaveMovieFile({ encoder });
const readManifest = makeReadManifest({ fs });
const readSegment = makeReadSegment({ fs });
// const findMovie = makeFindMovie({ movieDB });
// const modifyMovie = makeModifyMovie({ movieDB });
// const removeMovie = makeRemoveMovie({ movieDB });

export default {
  saveMovieFile,
  readManifest,
  readSegment,
};
