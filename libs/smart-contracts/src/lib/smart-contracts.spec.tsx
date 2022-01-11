import { render } from '@testing-library/react';

import SmartContracts from './smart-contracts';

describe('SmartContracts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SmartContracts />);
    expect(baseElement).toBeTruthy();
  });
});
