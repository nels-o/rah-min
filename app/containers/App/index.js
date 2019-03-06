/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import getTheme from 'rcl/Themes';
import GlobalStyle from 'global-styles';
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const AppWrapper = styled.div`
  min-height: 100%;
  min-width: 100%;
  height: 100%;
`;

export default function App() {
  return (
    <ThemeProvider theme={getTheme(localStorage.theme || 'dark')}>
      <AppWrapper>
        <GlobalStyle />
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </AppWrapper>
    </ThemeProvider>
  );
}
