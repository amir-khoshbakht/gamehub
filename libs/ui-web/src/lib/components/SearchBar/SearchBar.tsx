import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ClientOnly } from '../ClientOnly/index';
import { useRouter } from 'next/router';
import { Theme, alpha } from '@mui/material';

import Image from 'next/image';
import InputBase from '@mui/material/InputBase';
import { Autocomplete } from '@mui/material';

import { useDebounce } from '../../hooks';
import { useSearchGameQuery } from '@root/graphql';

export const SearchBar = () => {
  const router = useRouter();
  const [searchGames, { data, loading }] = useSearchGameQuery();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const gameResults = data?.getGames?.results;

  const handleLogoClick = () => router.push('/', '/');

  const listData = React.useMemo(() => {
    if (!gameResults || !debouncedSearchValue) return [];

    return gameResults.map((game) => {
      return {
        id: game.id,
        thumbnailImage: game.thumbnailImage,
        name: game.name,
        platforms: game.parentPlatforms,
      };
    });
  }, [gameResults, debouncedSearchValue]);

  useEffect(() => {
    if (!debouncedSearchValue) return;

    const queryParams = {
      variables: {
        page: 1,
        pageSize: 10,
        search: debouncedSearchValue,
      },
    };

    searchGames(queryParams);
  }, [debouncedSearchValue, searchGames]);

  const handleGameClick = (id: number) => {
    router.push(`/games/${id}`, `/games/${id}`);
  };

  return (
    <Box
      sx={{
        zIndex: 1200,
        position: 'fixed',
        top: 32,
        left: 0,
        right: 0,
        marginX: 6,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          borderRadius: 6,
          backgroundColor: (theme: Theme) =>
            alpha(theme.palette.background.paper, 0.05),
          backdropFilter: 'blur(6px)',
          margin: 'auto',
          maxWidth: 1200,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingX: 2,
          }}
        >
          <Typography
            sx={{ margin: 1, whiteSpace: 'nowrap', cursor: 'pointer' }}
            variant="h6"
            component="h1"
            onClick={handleLogoClick}
          >
            GAMEHUB
          </Typography>

          <Box sx={{ marginLeft: 1, display: 'flex', flex: 1 }}>
            <ClientOnly>
              <Box component="form" sx={{ width: '100%' }}>
                <Autocomplete
                  classes={{ noOptions: 'invisible' }}
                  // open={true} // use for dom inspection
                  fullWidth
                  loading={loading}
                  clearOnBlur={false}
                  filterOptions={(x) => x}
                  // TODO : add display none here
                  disablePortal
                  getOptionLabel={(game) => game?.name?.toString() ?? ''}
                  options={listData}
                  ListboxProps={{ sx: { maxHeight: '400px' } }}
                  onInputChange={(event, newInputValue) =>
                    setSearchValue(newInputValue)
                  }
                  renderOption={function (props, game) {
                    const click = (
                      e: React.MouseEvent<HTMLLIElement, MouseEvent>,
                    ) => {
                      handleGameClick(Number(game.id));
                      props?.onClick?.(e);
                    };
                    return (
                      <Box component="li" {...props} onClick={(e) => click(e)}>
                        {/* //TODO : aspect ratio of image */}
                        {game.thumbnailImage && (
                          <Image
                            loading="lazy"
                            width="50"
                            height="50"
                            src={game?.thumbnailImage?.toLowerCase()}
                            alt="the image of the game"
                          />
                        )}
                        {game.name}
                      </Box>
                    );
                  }}
                  renderInput={(params) => {
                    const { InputLabelProps, InputProps, ...rest } = params;
                    return (
                      <InputBase
                        {...params.InputProps}
                        {...rest}
                        placeholder="Search Games"
                      />
                    );
                  }}
                />
              </Box>
            </ClientOnly>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
