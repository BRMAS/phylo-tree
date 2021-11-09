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
}));

export default function DetailInfo({info}) {
  console.log(info);
  /*
  return (<>
    <h2 id="info-title">{info[0]}</h2>
    <h4 id="info-subtitle">{info[1][1]}</h4>
    <Link href={info[1][0][0]}>Link</Link>
    </>)
   */

  const nameList = info[0].split(' ');
  const species = nameList.splice(0, 2).join(' '); //`${nameList[0]} ${nameList[1]}`;
  const author = nameList.join(' ');
  const distribution = info[1][5].replaceAll(',', ', ');
  const imgUrl = info[1][3];
  const museUrl = info[1][1];
  const powoUrl = (info[1][4] !== '') ? `http://powo.science.kew.org/taxon/${info[1][4]}` : '';

  return (
    <>
    <Box sx={{textAlign: 'left', padding: '10px', typography: 'body1'}}>
    <Typography variant='h5' align='left' fontStyle='italic' display='inline'>{species}</Typography>
    <Typography variant='h5' display='inline'> {author}</Typography>
    <Divider style={{ marginBottom: '10px'}}/>
    {(distribution !== '') ? <>
      <Typography fontWeight="bold">分佈<RoomIcon /></Typography>
      <Typography>{distribution}</Typography>
      </> : null }
    {(imgUrl !== '') ? <Box><Link href={museUrl}><img src={imgUrl} width="550"/></Link></Box> : null}
    {(imgUrl !== '') ? <Box><Link href={powoUrl} target="_blank" rel="noreferrer noopener">看更多</Link></Box> : null}
    </Box>
    </>
    )
}

