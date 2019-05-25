import React from 'react';

import {
  PageWrapper,
  PageImage,
  PageContent,
  VerticalButtonWrapper,
  IamWhatIamWrapper,
  ResponsiveImage,
  PageContentTitle,
  SocialMediaButtonsWrapper,
} from '../components/StyledComponents';
import NavigatorButton from '../components/NavigatorButton';

import a2 from '../assets/images/2.jpg';
import titleLogo1 from '../assets/images/reactlogo.png';
import titleLogo2 from '../assets/images/django.png';

const GITHUB_URL = 'https://github.com/barhantas';
const LINKEDIN_URL = 'https://www.linkedin.com/in/barishantas';
const INSTAGRAM_URL = 'https://www.instagram.com/barishantas';

export default function Home(props) {
  return (
    <PageWrapper>
      <PageImage>
        <ResponsiveImage src={a2} alt="logo" />
      </PageImage>
      <PageContent>
        <img src={titleLogo1} alt="logo" width="100" height="100" />
        <img src={titleLogo2} alt="logo" width="100" height="100" />
        <PageContentTitle>Baris Hantas , Full Stack Developer</PageContentTitle>
        <IamWhatIamWrapper>
          Hi there! I am Baris, fullstack developer specialized in React and
          Django.From Istanbul,TR
        </IamWhatIamWrapper>
        <VerticalButtonWrapper>
          <NavigatorButton value="about" text="About" {...props} />
          <NavigatorButton value="work" text="Work" {...props} />
          <NavigatorButton value="contact" text="Contact" {...props} />
        </VerticalButtonWrapper>
        <SocialMediaButtonsWrapper>
          <a href={INSTAGRAM_URL}>
            <i className="fab fa-instagram" />
          </a>
          <a href={GITHUB_URL}>
            <i className="fab fa-github" />
          </a>
          <a href={LINKEDIN_URL}>
            <i className="fab fa-linkedin-in" />
          </a>
        </SocialMediaButtonsWrapper>
      </PageContent>
    </PageWrapper>
  );
}
