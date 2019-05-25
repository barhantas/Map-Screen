import React from 'react';

import {
  PageWrapper,
  PageImage,
  PageContent,
  IamWhatIamWrapper,
  ResponsiveImage,
  PageContentTitle,
} from '../components/StyledComponents';
import NavigatorButton from '../components/NavigatorButton';

import a6 from '../assets/images/6.jpg';

export default function Contact(props) {
  return (
    <PageWrapper>
      <PageImage>
        <ResponsiveImage src={a6} alt="logo" />
      </PageImage>
      <PageContent>
        <NavigatorButton value="/" text="< Back to home" {...props} />
        <PageContentTitle>Contact</PageContentTitle>
        <IamWhatIamWrapper>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </IamWhatIamWrapper>
      </PageContent>
    </PageWrapper>
  );
}
