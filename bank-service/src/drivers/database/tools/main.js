import CONFIG from './config/config'
import RES from '../../tools/res'
import SETUP from '../../tools/setup'

import {
  fs_load,
  fs_unload,
  fs_open,
  fs_mkfs,
  fs_rmfs,
  fs_create_index
} from '../core';

async function mkfs_corner(conf)
{
  let fs = await fs_open(conf);

  let prop = {
    db: 'corner',
    tables: [
      'user',
      'cap',
      'access',
      'stats',
      'log'
    ]
  }

  await fs_mkfs(fs, prop);
}

async function mkidx_corner(conf)
{
  let fs = await fs_open(conf);

  let prop = {
    db: 'corner',
    table: 'user',
    index: "pii.name"
  }

  await fs_create_index(fs, prop);

  prop['index'] = 'sii.name'

  await fs_create_index(fs, prop);

  prop['index'] = 'cii.name'

  await fs_create_index(fs, prop);

  prop = {
    db: 'corner',
    table: 'cap',
    name: 'cap',
    index: "desc"
  }

  await fs_create_index(fs, prop);
}

async function mkfs_rufta(conf)
{
  let fs = await fs_open(conf);

  let prop = {
    db: 'rufta',
    tables: [
      'user', /*rufta users = {admin, cofficer, pract, triage, lab, finance, pharmacy}*/
      'patient',
      'patientRecord',
      'patientAssign',
      'drugDispense',
      'labResult',
      'depositAccount',
      'insuranceScheme',
      'transaction',
      'serviceOrder',
      'bill',
      'stats',
      'notif',
      'opd'
    ]
  }

  await fs_mkfs(fs, prop);
}

async function mkidx_rufta(conf)
{
  let fs = await fs_open(conf);

  let prop = {
    db: 'rufta',
    table: 'patientAssign',
    index: "pii.name"
  }

  await fs_create_index(fs, prop);

  prop['table'] = "user"

  await fs_create_index(fs, prop);
}

async function mkfs_infotics(conf)
{
  let fs = await fs_open(conf);

  let prop = {
    db: 'infotics',
    tables: [
      'user', /*informatics user = {admin, informatic, }*/
      'phyexam',
      'vitalsign',
      'allergy',
      'drug',
      'ncod',
      'marp',
      'tbeval',
      'referal',
      'lab',
      'symptom',
      'stats'
    ]
  }

  await fs_mkfs(fs, prop);
}

async function mkidx_infotics(conf)
{
  let fs = await fs_open(conf);

  let prop = {
    db: 'infotics',
    table: 'user',
    index: "pii.name"
  }

  await fs_create_index(fs, prop);
}

async function rmfs_corner()
{
  
  let fs = await fs_open(CONFIG.fs);

  let prop = {
    db: 'corner'
  }

  await fs_rmfs(fs, prop);
}

async function rmfs_rufta()
{
  let fs = await fs_open(CONFIG.fs);

  let prop = {
    db: 'rufta'
  }

  await fs_rmfs(fs, prop);
}

async function rmfs_infotics()
{
  let fs = await fs_open(CONFIG.fs);

  let prop = {
    db: 'infotics'
  }

  await fs_rmfs(fs, prop);
}

async function config(arg)
{
  let r = await SETUP.write_config(__dirname+"/config/config.json", arg.conf, 'w');

  if(!r){
    return RES.err("config file not found", "config", CONFIG)
  }

  return RES.ok(null, "config", CONFIG);
} 

async function setup(arg)
{
  //await SETUP.write_config(__dirname+"/config/config.json", arg.conf, 'w');

  let fs_conf = arg.conf.fs;

  await fs_load(fs_conf);

  /*await mkfs_corner(fs_conf);
  await mkidx_corner(fs_conf);*/

  await mkfs_rufta(fs_conf);
  await mkidx_rufta(fs_conf);

  await mkfs_infotics(fs_conf);
  await mkidx_infotics(fs_conf);

  await fs_unload(fs_conf)

  return RES.ok({info: "filesystem created"}, "setup", CONFIG);
}

async function state(arg)
{
  /*if(arg == "rmfs"){
    await fs_load();

    await rmfs_corner();
    await rmfs_rufta();
    await rmfs_infotics();

    await fs_unload();

    return {
      status: "ok"
    }
  }

  return _error_info("unknown uservice state", "main");*/

  return RES.ok(null, "state", CONFIG);
}

module.exports = {
  state: state,
  setup: setup,
  config: config
}
