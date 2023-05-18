import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

import { useExploreGamesQuery } from '@root/graphql';
import { ClientOnly, SearchBar, PlatformIcons } from '@root/ui-web';
import { GamesQueryParams } from '@root/data-access';

type orderType = GamesQueryParams['ordering'];

export default function Home() {
  return (
    <>
      <SearchBar />
      <Box sx={{ overflow: 'auto' }}>
        <ClientOnly>
          <ExploreGames />
        </ClientOnly>
      </Box>
    </>
  );
}

/* CSS Background */

const backgroundCSS = `
  linear-gradient(45deg, transparent 0%, transparent 55%,rgba(199,199,199, 0.16) 55%, rgba(199,199,199, 0.16) 76%,transparent 76%, transparent 100%),linear-gradient(135deg, transparent 0%,transparent 14%,rgba(199,199,199, 0.16) 14%, rgba(199,199,199, 0.16) 41%,transparent 41%, transparent 100%),linear-gradient(45deg, transparent 0%,transparent 2%,rgba(199,199,199, 0.16) 2%, rgba(199,199,199, 0.16) 18%,transparent 18%, transparent 100%),linear-gradient(135deg, transparent 0%,transparent 61%,rgba(199,199,199, 0.16) 61%, rgba(199,199,199, 0.16) 71%,transparent 71%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))`;

function ExploreGames() {
  const [ordering, setOrdering] = useState<orderType>('popularity');
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    setOrdering(event.target.value as orderType);
  };
  const queryParams = React.useMemo<GamesQueryParams>(() => {
    return {
      ordering: ordering,
    };
  }, [ordering]);

  const { data, loading, error } = useExploreGamesQuery(queryParams);
  const games = data?.getGames?.results;

  const handleGameClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    router.push(`/games/${id}`, `/games/${id}`);
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundImage: backgroundCSS,
        backgroundAttachment: 'fixed',
        height: '100vh',
        position: 'relative',
        right: 'calc((100% - 100vw)/2)',
      }}
    >
      <Box sx={{ paddingLeft: 3, paddingTop: 20, paddingBottom: 10 }}>
        <Typography
          sx={{
            fontSize: 90,
            textTransform: 'uppercase',
          }}
        >
          Explore Games
        </Typography>
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 'light',
            textTransform: 'uppercase',
            fontStyle: 'italic',
          }}
        >
          Based on player counts and release date
        </Typography>
      </Box>

      <Box>
        <FormControl
          variant="standard"
          size="small"
          sx={{ minWidth: 150, mb: 2 }}
        >
          <Select
            value={ordering as string}
            onChange={handleChange}
            // open={open}
          >
            <MenuItem value="popularity">popularity</MenuItem>
            <MenuItem value="released">released</MenuItem>
            <MenuItem value="created">created</MenuItem>
            <MenuItem value="-metacritic">metacritic</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={4}>
          {games?.map((game) => {
            const {
              id,
              name,
              thumbnailImage,
              parentPlatforms,
              genres,
              metacritic,
            } = game;
            return (
              <Grid item key={id} xs={12} sm={4} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 0.9,
                  }}
                >
                  <Box
                    component="a"
                    href={`/games/${id}`}
                    onClick={(e) => handleGameClick(e, id)}
                  >
                    <Image
                      loading="lazy"
                      width="600"
                      height="400"
                      src={thumbnailImage}
                      alt="the image of the game"
                      placeholder="blur"
                      blurDataURL="/"
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        component="a"
                        href={`/games/${id}`}
                        onClick={(e) => handleGameClick(e, id)}
                        gutterBottom
                        fontSize={18}
                      >
                        {name}
                      </Typography>
                      <Tooltip title="Meta score" placement="top">
                        <Typography
                          sx={{
                            border: 1,
                            borderRadius: 0.5,
                            fontWeight: 500,
                            borderColor: 'green',
                            color: 'green',
                            display: 'flex',
                            alignItems: 'center',
                            lineHeight: 1.5,
                            height: '100%',
                            px: 2,
                          }}
                        >
                          {metacritic}%
                        </Typography>
                      </Tooltip>
                    </Box>

                    {/* Platforms */}
                    {parentPlatforms?.map((platform, i) => (
                      <Tooltip
                        key={i}
                        title={platform.platform.name}
                        arrow
                        placement="top"
                      >
                        <Box sx={{ px: 0.5, display: 'inline' }}>
                          <PlatformIcons platform={platform.platform.id} />
                        </Box>
                      </Tooltip>
                    ))}

                    {/* Genre */}
                    <Typography>
                      {genres
                        ?.map((genre) => {
                          return genre.name;
                        })
                        ?.join(', ')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
