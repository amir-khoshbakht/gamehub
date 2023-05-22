import React from 'react';

import { useRouter } from 'next/router';

import { Theme, alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { SearchBar } from '@root/ui-web';
import { ClientOnly } from '@root/ui-web';
import { useGameDetailQuery } from '@root/graphql';
import Image from 'next/image';
// TODO : check

function Index() {
  const router = useRouter();
  const id = Number(router.query.id);

  return (
    <Box sx={{ overflow: 'auto' }}>
      <ClientOnly>
        {id && (
          <Box sx={{ position: 'relative' }}>
            <GameDetails id={id} />
          </Box>
        )}
      </ClientOnly>
    </Box>
  );
}

export default Index;

function GameDetails({ id }: { id: number }) {
  const { data } = useGameDetailQuery(id);
  const gameDetails = data?.gameDetails;
  const {
    name,
    description,
    backgroundImage,
    metacritic,
    genres,
    esrbRating,
    screenshots,
  } = gameDetails || {};

  return (
    <>
      <SearchBar />

      <Box
        //TODO : clean

        sx={{
          position: 'absolute',
          height: '100%',
          minHeight: 600,
          width: '100vw',
          top: 0,
        }}
      >
        {/* // TODO : add image placeholder */}
        {backgroundImage && (
          <Image
            fill
            src={backgroundImage}
            alt="the image of the game"
            placeholder="blur"
            blurDataURL="/"
            style={{
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />
        )}
        <Box
          sx={{
            position: 'absolute',
            height: '100%',
            minHeight: 500,

            width: '100%',
            background:
              'linear-gradient(180deg, rgb(255 255 255 / 0%) 0%,rgb(255 255 255) 100%)',
          }}
        ></Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          paddingTop: 38,
          paddingX: 3,
          height: '100vh',
          maxWidth: 1200,
          margin: 'auto',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 6,
            backgroundColor: (theme: Theme) =>
              alpha(theme.palette.common.white, 0.8),
          }}
        >
          <Box sx={{ paddingBottom: 8 }}>
            <Typography
              sx={{
                fontSize: 32,
              }}
            >
              {name}
            </Typography>

            <Grid container alignItems="flex-start">
              <Grid
                item
                sx={{ minWidth: 'max-content', paddingX: 1 }}
                minWidth="max-content"
              >
                <Grid item>
                  <Typography sx={{ textAlign: 'center' }}>ESRB</Typography>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 30,
                    }}
                  >
                    <Typography>{esrbRating?.name}</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{ minWidth: 'max-content', paddingX: 1 }}
                minWidth="max-content"
              >
                <Grid item>
                  <Typography sx={{ textAlign: 'center' }}>
                    METASCORE
                  </Typography>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 30,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        border: 1,
                        borderRadius: 0.5,
                        borderColor: 'green',
                        color: 'green',
                        paddingX: 1,
                      }}
                    >
                      {metacritic}%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid
                item
                sx={{ minWidth: 'max-content', paddingX: 1 }}
                minWidth="max-content"
              >
                <Grid item>
                  <Typography sx={{ textAlign: 'center' }}>GENRES</Typography>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 30,
                    }}
                  >
                    <Typography
                      sx={{
                        borderRadius: 0.5,
                        borderColor: 'green',
                        paddingX: 1,
                      }}
                    >
                      {genres?.map((genre) => genre.name).join(', ')}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
              <Typography
                fontWeight="400"
                sx={{ fontStyle: 'bold' }}
                variant="h6"
              >
                DESCRIPTION :
              </Typography>
              <Typography fontWeight="100" variant="h6">
                {description}
              </Typography>
            </Box>

            <Box
              sx={{
                minWidth: 'calc(100% / 3)',
                paddingTop: 5,
              }}
            >
              <Typography
                fontWeight="400"
                sx={{ fontStyle: 'bold' }}
                variant="h6"
              >
                SCREENSHOTS :
              </Typography>
              {screenshots && (
                <ImageList cols={3} rowHeight={200}>
                  {screenshots.map((screenshot) => (
                    <ImageListItem key={screenshot.id}>
                      {/* TODO : add placeholder */}
                      {/* TODO : add height and width */}
                      <Image
                        src={screenshot.image || ''}
                        alt="screenshot"
                        fill
                        sizes="(max-width: 100px) 100vw"
                        loading="lazy"
                        style={{ objectFit: 'contain' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
