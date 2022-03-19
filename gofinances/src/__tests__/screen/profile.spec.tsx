import React from 'react';

import { render,fireEvent } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

test('Check if show correctly use input name placeholder', () => {
  const {getByPlaceholderText} = render(<Profile/>);

  getByPlaceholderText('Nome');

});

test('Check if show correctly use input last name placeholder', () => {
  const {getByPlaceholderText} = render(<Profile/>);

  getByPlaceholderText('Sobrenome');

});