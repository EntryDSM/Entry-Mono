import { isTruthValues } from './isTruthValues';

describe('falsy값 걸러내는 함수 테스트', () => {
  it('매개 값 1개에 대해서 확인할 때 (false 반환)', () => {
    expect(isTruthValues('')).toBe(false);
    expect(isTruthValues(0)).toBe(false);
    expect(isTruthValues(false)).toBe(false);
  });

  it('매개 값 1개에 대해서 확인할 때 (true 반환)', () => {
    expect(isTruthValues('빈문자열아님')).toBe(true);
    expect(isTruthValues(1)).toBe(true);
    expect(isTruthValues(10)).toBe(true);
    expect(isTruthValues(true)).toBe(true);
  });

  it('매개 값 여러개에 대해서 확인할 때 (false 반환)', () => {
    expect(isTruthValues([''])).toBe(false);
    expect(isTruthValues(['', false])).toBe(false);
    expect(isTruthValues(['', 0])).toBe(false);
    expect(isTruthValues([0, false])).toBe(false);
    expect(isTruthValues([false])).toBe(false);
    expect(isTruthValues([0])).toBe(false);
    expect(isTruthValues(['', 0, false])).toBe(false);

    expect(isTruthValues(['', 1, true])).toBe(false);
    expect(isTruthValues(['', 1, false])).toBe(false);
    expect(isTruthValues(['asdasd', 0, true])).toBe(false);
    expect(isTruthValues(['asdasdasd', 1, false])).toBe(false);
  });

  it('매개 값 여러개에 대해서 확인할 때 (true 반환)', () => {
    expect(isTruthValues([1])).toBe(true);
    expect(isTruthValues(['asdasd'])).toBe(true);
    expect(isTruthValues([true])).toBe(true);
    expect(isTruthValues([1, true])).toBe(true);
    expect(isTruthValues([1, 'asdasd'])).toBe(true);
    expect(isTruthValues([true, 'asdsad'])).toBe(true);
    expect(isTruthValues([2, true, 'asdsda'])).toBe(true);
  });
});
