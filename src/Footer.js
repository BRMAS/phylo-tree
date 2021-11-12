import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function Footer() {
  return (
    <>
    <Typography variant="subtitle1" fontWeight="bold">研究文獻</Typography>
    <Typography variant="body1">Liu, Y., Tseng, Y.-H., Yang, H.-A., Hu, A.-Q., Xu., W.-B., Lin, C.-W., Kono, Y., Chang, C.-C., Peng, C.-I, & Chung, K.-F. (2020) Six new species of Begonia from Guangxi, China. Botanical Studies 61: e21. <Link href="https://brmas.openmuseum.tw/muse/digi_object/6e75250623b9149f1c18a107e3e51e2d" target="_blank" rel="noreferrer noopener">連結</Link></Typography>
    <Divider />
    <Typography variant="body1">Background Photo by <a href="https://unsplash.com/@olga_o?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Olga Thelavart</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></Typography>
    </>
  )
}
