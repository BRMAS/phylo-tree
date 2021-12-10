import React, {useState} from 'react';

import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RoomIcon from '@mui/icons-material/Room';
import SourceIcon from '@mui/icons-material/Source';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

const DEFAULT_IMG_WIDTH = 400;

const useStyles = makeStyles(theme => ({
  root: {
    flex: '0.2',
    minWidth: '100px'
  },
  imgbox: {
    padding: '14px 0px 0px 0px'
  },
  container: {
    padding: '14px 20px',
    textAlign: 'left'
  },
  itemText: {
    color: '#7d7d7d',
    marginTop: '-7px',
    marginBottom: '3px',
  }
}));

export default function DetailInfo({info}) {
  console.log(info);
  const classes = useStyles();

  const nameList = info[0].split(' ');
  const species = nameList.splice(0, 2).join(' '); //`${nameList[0]} ${nameList[1]}`;
  const author = nameList.join(' ');
  const distribution = info[1][6].replaceAll(',', ', ');
  const imgUrl = info[1][4];
  const museUrl = info[1][0];
  const commonName = info[1][1];
  const powoUrl = (info[1][5] !== '') ? `http://powo.science.kew.org/taxon/${info[1][5]}` : '';
  const doiUrl = info[1][2];

  const onImgLoad = ({target}) => {
    const h = target.naturalHeight;
    const w = target.naturalWidth;
    let adjustedWidth = DEFAULT_IMG_WIDTH;
    if (w > h) {
      // landscape
      adjustedWidth = (DEFAULT_IMG_WIDTH / h) * w;
      //console.log('adj');
    } else {
      // portrait
    }
    //console.log(adjustedWidth, w, h);
    const imgEle = document.querySelector('.img');
    imgEle.width = adjustedWidth;
  }

  return (
    <>
    <Box sx={{typography: 'body1'}} className={classes.container}>
    <Typography variant="h5" align="left" fontStyle="italic" display="inline">{species}</Typography>
    <Typography variant="h5" display="inline"> {author}</Typography>
    <Typography variant="subtitle1" fontWeight="bold">{commonName}</Typography>
    <Divider style={{ marginBottom: '10px'}}/>

    {(distribution !== '') ? <>
      <Typography fontWeight="bold" variant="subtitle2">Distribution</Typography>
      <div className={classes.itemText}><Typography variant="subtitle1">{distribution}</Typography></div>
      <Typography fontWeight="bold" variant="subtitle2" >Sources</Typography>
      <div className={classes.itemText}><Typography variant="subtitle1">Royal Botanic Gardens, Kew</Typography></div>
      </> : null }
    {(imgUrl !== '') ? <Box><img src={imgUrl} className={classes.imgbox} target="_blank" rel="noreferrer noopener" onLoad={onImgLoad} className="img" /></Box> : null}
    {(imgUrl !== '') ? <Box><Link href={museUrl}>開放博物館</Link></Box> : null}

    <Paper>
    <ul>
    {(powoUrl !== '') ? <li><Link href={powoUrl} target="_blank" rel="noreferrer noopener">Royal Botanic Gardens, Kew</Link></li> : null}
    {(doiUrl !== '') ? <li><Link href={doiUrl} target="_blank" rel="noreferrer noopener">doi</Link></li> : null}
    </ul>
    </Paper>
    </Box>
    {/*<img src={imgUrl} onLoad={onImgLoad}/>*/}
    </>
    )
}

