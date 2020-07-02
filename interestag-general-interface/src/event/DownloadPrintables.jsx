import React from 'react';
import { Box, Button } from '@material-ui/core';

import { useProtectedApi } from '../core/useProtectedApi';

const DownloadPrintables = ({ currentUser, attendeeInterests, eventInterests, interestSelectionCount }) => {
  const protectedApi = useProtectedApi();

  const download = (image, name) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(image);
    a.style.display = 'none';
    a.setAttribute('download', `${name}.png`);
    a.click();

    setTimeout(() => { URL.revokeObjectURL(a.href) }, 100);
  };

  const downloadTag = () => {
    const interests = attendeeInterests.sort((a, b) => b.score - a.score).map(interest => {
      return {
        color: interest.colour ? interest.colour : eventInterests.find(i => i.id === interest.interest).colour,
        score: interest.score,
      };
    }).slice(0, interestSelectionCount);

    protectedApi
      .post(`${process.env.REACT_APP_PRINTING}/api/tag/`, {
        interests: interests,
        name: `${currentUser.first_name} ${currentUser.last_name}`,
      }, { responseType: 'blob' })
      .then(res => download(res.data, 'tag'))
      .catch(err => console.log(err));
  };

  const downloadLegend = () => {
    const interests = eventInterests.map(interest => {
      return {
        color: interest.colour,
        name: interest.name,
      }
    });

    protectedApi
      .post(`${process.env.REACT_APP_PRINTING}/api/legend/`, interests, { responseType: 'blob' })
      .then(res => download(res.data, 'legend'))
      .catch(err => console.log(err)); 
  }

  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="outlined"
        onClick={downloadTag}
      >Tag</Button>
      <Button
        variant="outlined"
        onClick={downloadLegend}
      >Legend</Button>
    </Box>
  );
}

export { DownloadPrintables };