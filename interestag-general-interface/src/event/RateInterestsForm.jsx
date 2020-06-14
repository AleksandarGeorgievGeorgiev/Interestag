import React, { useState } from 'react';
import { Box, Paper, ButtonGroup, Button, Slider } from '@material-ui/core';
import { InterestField } from './InterestField';

const RateInterestsForm = ({ interests, ratings, confirmRatings, cancelAction, ratingChangeHandler }) => {

  return (
    <Box>
      <Paper elevation={1} style={{ padding:'2px 0' }}>
        <h3>Rate Interests</h3>
      </Paper>
      <Box style={{ maxHeight: '462px', margin: '15px 0 65px 0', padding: '0 25px', overflowY: 'auto' }}>
        {interests &&
          interests.map((interest, index) => (
            <div key={index}>
              <div>
                <InterestField {...interest} disabled={true} />
                <Slider
                  marks={[...Array(11).keys()].map(a => {
                    return {
                      value: a,
                      label: a === 0 || a === 10 ? a : '',
                    }
                  })}
                  step={1}
                  min={0}
                  max={10}
                  valueLabelDisplay={'auto'}
                  value={ratings[interest.id] || 0}
                  onChange={(event, newRating) => ratingChangeHandler(interest.id, newRating)}
                />
              </div>
            </div>
          ))}
      </Box>
      <Paper elevation={2} style={{ position: 'fixed', width: '100%', bottom: '0' }}>
        <ButtonGroup style={{ width: '100%', borderTop: '1px solid #ccc', }} size="large" variant="text">
          <Button
            onClick={cancelAction}
            style={{ flex: 1, padding: '15px 10px' }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmRatings}
            style={{ flex: 1, padding: '15px 10px' }}
          >
            Rate
          </Button>
        </ButtonGroup>
      </Paper>
    </Box>
  );
}

export { RateInterestsForm };