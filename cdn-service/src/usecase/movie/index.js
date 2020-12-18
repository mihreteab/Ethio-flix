//import library dependencies
import moment from 'moment'

//import factory modules
import makeReadManifest from "./read_manifest";
import makeReadSegment from "./read_segment";
import makeReadThumb from "./read_thumb";

//import code dependencies
import fs from '../../tools/fs';

//dependency injection
const readManifest = makeReadManifest({ fs });
const readSegment = makeReadSegment({ fs });
const readThumb = makeReadThumb({ fs });
// const findMovie = makeFindMovie({ movieDB });
// const modifyMovie = makeModifyMovie({ movieDB });
// const removeMovie = makeRemoveMovie({ movieDB });

export default {
  readManifest,
  readSegment,
  readThumb
};
