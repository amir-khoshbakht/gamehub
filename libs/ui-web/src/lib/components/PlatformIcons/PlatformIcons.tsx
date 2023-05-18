import React from 'react';
import { RxDesktop } from 'react-icons/rx';
import { FaGlobe } from 'react-icons/fa';

import {
  SiNintendoswitch,
  SiApple,
  SiAndroid,
  SiPlaystation,
  SiXbox,
  SiLinux,
  SiIos,
  SiAtari,
} from 'react-icons/si';

function PlatformIcons({ platform }: { platform: number }) {
  const logoMap: { [a: number]: React.ReactElement } = {
    1: <RxDesktop />,
    2: <SiPlaystation />,
    3: <SiXbox />,
    4: <SiIos />,
    5: <SiApple />,
    6: <SiLinux />,
    7: <SiNintendoswitch />,
    8: <SiAndroid />,
    9: <SiAtari />,
    14: <FaGlobe />,
  };
  return logoMap[platform];
}

export default PlatformIcons;
