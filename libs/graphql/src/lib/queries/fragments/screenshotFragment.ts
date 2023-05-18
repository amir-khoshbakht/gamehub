import { gql } from '@apollo/client';

export const screenshotFragment = gql`
  fragment ScreenshotFields on Screenshot {
    id
    image
  }
`;
