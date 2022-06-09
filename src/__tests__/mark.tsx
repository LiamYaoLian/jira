import React from 'react';
import { render, screen } from '@testing-library/react';
import { Mark } from 'components/mark';

test('Mark component highlights keyword correctly', () => {
  const name = 'design system';
  const keyword = 'design';

  render(<Mark name={name} keyword={keyword} />);

  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle('color: #257AFD');
  expect(screen.getByText('system')).not.toHaveStyle('color: #257AFD');
});