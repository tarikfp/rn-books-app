import { captions, getRandomCaption } from '../get-random-caption';

describe('getRandomCaption', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.123456789);

  it('returns a random caption', () => {
    const result = getRandomCaption();
    expect(captions).toContain(result);
  });

  it('returns the first caption when Math.random() is 0', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const result = getRandomCaption();
    expect(result).toBe(captions[0]);
  });

  it('returns the last caption when Math.random() is 0.9999...', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999999999);
    const result = getRandomCaption();
    expect(result).toBe(captions[captions.length - 1]);
  });
});
