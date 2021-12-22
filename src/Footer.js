import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function Footer() {
  return (
    <>
    <Typography variant="subtitle1" fontWeight="bold">Reference</Typography>
    <Typography variant="body1" component="span">Liu, Y., Tseng, Y.-H., Yang, H.-A., Hu, A.-Q., Xu., W.-B., Lin, C.-W., Kono, Y., Chang, C.-C., Peng, C.-I, & Chung, K.-F. (2020) Six new species of </Typography><Typography fontStyle="italic" component="span">Begonia</Typography><Typography component="span" variant="body1"> from Guangxi, China. </Typography><Typography fontStyle="italic" component="span">Botanical Studies</Typography><Typography variant="body1" component="span"> 61: e21. <Link href="https://doi.org/10.1186/s40529-020-00298-y" target="_blank" rel="noreferrer noopener">https://doi.org/10.1186/s40529-020-00298-y</Link></Typography>
    </>
  )
}

/* ref doi: https://brmas.openmuseum.tw/muse/digi_object/6e75250623b9149f1c18a107e3e51e2d */
