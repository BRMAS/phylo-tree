import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

//import { parse } from "newick-js/dist/src/parse";

//import { select, selectAll } from "d3-selection";
//import { hierarchy, tree, cluster} from "d3-hierarchy";

import { readData, parseNewick } from './Utils';
import MainGraph from './MainGraph';
import DetailInfo from './DetailInfo';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const findItem = (key, info) => {
  return Object.entries(info).find((x)=> x[0].indexOf(key) >= 0);
}

export default function PhyloTree() {

  const [data, setData] = useState({
    currentInfo: null,
    treeData: null,
    infoMap: null
  });

  useEffect(() => {
    const sourceFile = './data/Final_phylogeny_newspecies.tre';
    const detailFile = './data/infoDetail.json';
    readData(sourceFile, detailFile).then((dataList) => {
      setData({...data, treeData: dataList[0], infoMap: dataList[1]});
    });
  }, []);

  const showInfo = (key) => {
    const item = findItem(key, data.infoMap);
    setData({...data, currentInfo: item})
  }
  //console.log('data', data);

  return (
    <Grid container spacing={1}>
    <Grid item xs={6} md={6}>
    {data.treeData ? <Item><MainGraph treeData={data.treeData} svgWidth="800" svgHeight="800" showInfo={showInfo} /></Item>
: null}</Grid>
    <Grid item xs={6} md={6}>
    {data.currentInfo? <Item><DetailInfo info={data.currentInfo} /></Item>
: null}
    </Grid>
    </Grid>
  )
}
