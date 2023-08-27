import React from 'react';
import { createRenderer, render } from '~utils/test-utils';
import { SearchBookResultDetailSection } from '../SearchBookResultDetailSection';

describe('SearchBookResultDetailSection', () => {
  it('renders content with string', () => {
    const tree = createRenderer(
      <SearchBookResultDetailSection title="Title" content="Sample Content" />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders content with array', () => {
    const tree = createRenderer(
      <SearchBookResultDetailSection
        title="Title"
        content={['Item 1', 'Item 2', 'Item 3']}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders content as a string', () => {
    const { getByText } = render(
      <SearchBookResultDetailSection title="Title" content="Sample Content" />,
    );

    const title = getByText('Title');
    const content = getByText('Sample Content');

    expect(title).toBeTruthy();
    expect(content).toBeTruthy();
  });

  it('renders content as an array', () => {
    const { getByText } = render(
      <SearchBookResultDetailSection
        title="Title"
        content={['Item 1', 'Item 2', 'Item 3']}
      />,
    );

    const stringArrayText = getByText(
      ['Item 1', 'Item 2', 'Item 3'].join(', '),
    );

    expect(stringArrayText).toBeTruthy();
  });
});
