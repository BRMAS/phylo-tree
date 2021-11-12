import React from 'react';

import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RoomIcon from '@mui/icons-material/Room';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    flex: '0.2',
    minWidth: '100px'
  },
  imgbox: {
    padding: '14px 0px'
  }
}));

export default function DetailInfo({info}) {
  console.log(info);
  const classes = useStyles();

  const nameList = info[0].split(' ');
  const species = nameList.splice(0, 2).join(' '); //`${nameList[0]} ${nameList[1]}`;
  const author = nameList.join(' ');
  const distribution = info[1][5].replaceAll(',', ', ');
  const imgUrl = info[1][3];
  const museUrl = info[1][0];
  const commonName = info[1][1];
  const powoUrl = (info[1][4] !== '') ? `http://powo.science.kew.org/taxon/${info[1][4]}` : '';

  return (
    <>
    <Box sx={{textAlign: 'left', padding: '10px', typography: 'body1'}}>
    <Typography variant="h5" align="left" fontStyle="italic" display="inline">{species}</Typography>
    <Typography variant="h5" display="inline"> {author}</Typography>
    <Typography variant="subtitle1" fontWeight="bold">{commonName}</Typography>
    <Divider style={{ marginBottom: '10px'}}/>
    {(distribution !== '') ? <>
      <Typography fontWeight="bold">分布<RoomIcon /></Typography>
      <Typography>{distribution}</Typography>
      <Typography>[ 資料來源：Royal Botanic Gardens, Kew ]</Typography>
      </> : null }
    {(imgUrl !== '') ? <Box><Link href={museUrl}><img src={imgUrl} width="400" className={classes.imgbox} target="_blank" rel="noreferrer noopener" /></Link></Box> : null}
    {(powoUrl !== '') ? <Box><Link href={powoUrl} target="_blank" rel="noreferrer noopener">看更多 | Royal Botanic Gardens, Kew</Link></Box> : null}
    {(imgUrl !== '') ? <Box><Link href={museUrl}>看更多 | 開放博物館</Link></Box> : null}
    </Box>
    </>
    )
}

